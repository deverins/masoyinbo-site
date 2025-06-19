"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";

import { API_URL } from "@/constants/api";
import { episodeSchema } from "@/validationSchema/episodeSchema";
import { useAuth } from "@/hooks/AuthContext";
import Dialogbox from '@/components/DialogBox';
import { Episode, EpisodeFormProps, EpisodeSec, Participant } from "@/types";

export interface Participants {
  _id: string;
  fullName: string;
  status: string;
  hasEpisode: boolean;
}
export const CreateEpisodeForm: React.FC<EpisodeFormProps> = ({ onSaveEpisode, episodeId, editEpisode }) => {
  const [data, setData] = useState<Participant[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useRouter();

  const participantsURL = `${API_URL}/api/get-participants?status=PENDING`;
  const createEpisodeURL = `${API_URL}/api/episodes`;

  useEffect(() => {
    const fetchPendingParticipants = async () => {
      try {
        const { data } = await axios.get(participantsURL);
        setData(data.data);
      } catch (error) {
        toast.error("Failed to load participants");
      }
    };

    fetchPendingParticipants();
  }, [participantsURL]);

  const updateEpisode = async (id: string, payload: Partial<EpisodeSec>) => {
    try {
      const { data } = await axios.put(`${API_URL}/api/episode/${id}`, payload);
      return true; // return true to indicate success
    } catch (error: any) {
      if (error.response?.status === 500) {
        toast.error(`Episode number ${payload.episodeNumber} already exists. Please choose a different episode number.`);
      } else {
        setError(error?.response?.data?.message || "Failed to update episode");
      }
      return false; // return false to indicate an error occurred
    }
  };

  const formik = useFormik({
    initialValues: {
      episodeLink: editEpisode?.episodeLink ?? "",
      participant_id: editEpisode?.participant_id ?? "",
      amountWon: editEpisode?.amountWon ?? 0,
      availableAmountToWin: editEpisode?.availableAmountToWin,
      episodeDate: editEpisode?.episodeDate ?? "",
      episodeNumber: editEpisode?.episodeNumber,
    },
    validationSchema: episodeSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const storedUser = localStorage.getItem("user");
      const userId = storedUser ? JSON.parse(storedUser)._id : null;
      if (!userId) {
        toast.error("User is not logged in.");
        setSubmitting(false);
        navigate.push("/admin/login");
        return;
      }

      try {
        if (editEpisode && episodeId) {
          // Update existing episode
          const isSuccess = await updateEpisode(episodeId, { ...values, createdBy: userId });
          if (isSuccess) {
            toast.success("Episode updated successfully");
          }
        } else {
          // Create new episode
          const response = await axios.post(createEpisodeURL, { ...values, createdBy: userId });
          const newEpisodeId = response.data.episode._id;
          localStorage.setItem("episodeId", newEpisodeId);
          navigate.push(`/episodes/${newEpisodeId}`);
          toast.success("Episode created successfully");
        }
        resetForm();
        onSaveEpisode({
          ...values,
          createdBy: userId,
          availableAmountToWin: values.availableAmountToWin ?? 0,
          episodeNumber: values.episodeNumber ?? 0,
          _id: "",
          createdAt: ""
        });
      } catch (error: any) {
      } finally {
        setSubmitting(false);
      }
    },
  });


  const handleParticipantSelect = (participant: Participant) => {
    setSelectedParticipant(participant.fullName);
    formik.setFieldValue('participant_id', participant._id);
    setDialogOpen(false);
  };

  return (
    <>
      <main className="flex justify-center items-center py-10 px-4">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl transition-all duration-300 shadow p-6 rounded">
          <h1 className="text-2xl font-bold mb-6 dark:text-gray-400 text-center">
            {editEpisode ? "Update Episode" : "Create New Episode"}
          </h1>

          {error && <div className="text-red-500">{error}</div>}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Episode Link Input */}
            <div>
              <label htmlFor="episodeLink" className="block text-base font-medium dark:text-gray-400">
                Episode Link
              </label>
              <input
                type="text"
                name="episodeLink"
                value={formik.values.episodeLink}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="https://example.com"
                className="mt-1 py-4 p-2 block w-full event-form-input"
              />
              {formik.errors.episodeLink && formik.touched.episodeLink ? (
                <div className="text-red-500 text-base">{formik.errors.episodeLink}</div>
              ) : null}
            </div>

            {/* Participant Selection */}
            <div id='participant_id' className='relative'>
              <label className="block text-base font-medium dark:text-gray-400 mb-2 mt-4">Participant</label>
              <input
                value={selectedParticipant}
                type="text"
                readOnly
                className='w-full py-4 p-2 event-form-input'
                placeholder="Select Participant"
                onClick={() => { setDialogOpen(true); }}
              />
              {dialogOpen && (
                <Dialogbox
                  triggerDomId="participant_id"
                  positions={{ ySide: 'bottom' }}
                  closeOnClick
                  className="text-neutral-700 dark:text-neutral-200 dark:bg-slate-900 border dark:border-slate-700 right-1/2 w-full shadow translate-x-1/2"
                >
                  <ul
                    className="max-h-32 overflow-y-auto no-scrollbar dark:text-neutral-200 w-full bg-white rounded-lg shadow-lg dark:bg-slate-900"
                  >
                    {data
                      .filter(participant => !participant.hasEpisode)
                      .map(participant => (
                        <li key={participant._id}>
                          <button
                            type="button"
                            onClick={() => handleParticipantSelect(participant)}
                            className="w-full text-left p-2 hover:bg-gray-200 rounded-lg dark:hover:bg-gray-700"
                          >
                            {participant.fullName}
                          </button>
                        </li>
                      ))}
                  </ul>
                </Dialogbox>

              )}
              {formik.errors.participant_id && formik.touched.participant_id && (
                <div className="text-red-500 text-base">{formik.errors.participant_id}</div>
              )}
            </div>

            {/* Remaining form inputs */}

            <div>
              <label htmlFor="availableAmountToWin" className="block text-base font-medium dark:text-gray-400">
                Amount Available to Win
              </label>
              <input
                type="number"
                name="availableAmountToWin"
                value={formik.values.availableAmountToWin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 py-4 p-2 block w-full event-form-input"
              />
              {formik.errors.availableAmountToWin && formik.touched.availableAmountToWin ? (
                <div className="text-red-500 text-base">{formik.errors.availableAmountToWin}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="amountWon" className="block text-base font-medium dark:text-gray-400">
                Amount Won
              </label>
              <input
                type="number"
                name="amountWon"
                value={formik.values.amountWon}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 py-4 p-2 block w-full outline-none event-form-input"
              />
              {formik.errors.amountWon && formik.touched.amountWon ? (
                <div className="text-red-500 text-base">{formik.errors.amountWon}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="episodeDate" className="block text-base font-medium dark:text-gray-400">
                Episode Date
              </label>
              <input
                name="episodeDate"
                value={formik.values.episodeDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 py-4 p-2 block w-full event-form-input"
              />
              {formik.errors.episodeDate && formik.touched.episodeDate ? (
                <div className="text-red-500 text-base">{formik.errors.episodeDate}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="episodeNumber" className="block text-base font-medium dark:text-gray-400">
                Episode Number
              </label>
              <input
                name="episodeNumber"
                value={formik.values.episodeNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 py-4 p-2 block w-full event-form-input"
              />
              {formik.errors.episodeDate && formik.touched.episodeNumber ? (
                <div className="text-red-500 text-base">{formik.errors.episodeNumber}</div>
              ) : null}
            </div>


            <div>
              <button
                type="submit"
                className="w-full py-4 text-lg font-bold bg-primary-light text-white p-2 rounded-md"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? (editEpisode ? "Updating..." : "Creating...") : (editEpisode ? "Update Episode" : "Create Episode")}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

const ProtectedCreateEpisodeForm = () => {
  const { withAdminAuth } = useAuth();
  const onSaveEpisode = (episode: Episode) => { };
  const episodeId = undefined;
  const editEpisode = undefined;
  const ProtectedForm = withAdminAuth(() => (
    <CreateEpisodeForm onSaveEpisode={onSaveEpisode} episodeId={episodeId} editEpisode={editEpisode} />
  ));

  return <ProtectedForm />;
};

export default ProtectedCreateEpisodeForm;