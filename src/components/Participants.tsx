import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from '@/constants/api';
import { Participant } from "@/types";
import { useSearchParams } from "next/navigation";
import Loading from "./UI/Loading";

const ParticipationUsers = () => {
  const [data, setData] = useState<Participant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  const participantsURL = `${API_URL}/api/get-participants?status=${status}`;

  useEffect(() => {
    const fetchRequestPool = async () => {
      try {
        const { data } = await axios.get(participantsURL);
        if (data.data) {
          setData(data.data);
        } else {
          setError("No participants found.");
        }
      } catch (err) {
        setError('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchRequestPool();
  }, [status]);

  if (loading) return <div className='min-h-screen flex justify-center'><Loading /></div>;
  
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold text-center mb-8 mt-8 dark:text-neutral-200">
        All Participant(s)
      </h1>

      {/* Mobile and Tablet View (870px and below) */}
      <div className="block max-[870px]:block custom:hidden">
        <div className="grid gap-6">
          {data.length ? (
            data.map((participant) => (
              <div
                key={participant._id}
                className="grid gap-4 p-4 bg-gray-100 rounded-lg shadow-md transition-all duration-500 hover:bg-gray-200 dark:bg-[rgba(255,255,255,0.1)] dark:text-neutral-200 dark:backdrop-blur-lg dark:bg-opacity-10"
              >
                {/* Grid layout for mobile */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="font-semibold">Name</h2>
                    <p className="break-words">{participant.fullName}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold">MobileNum</h2>
                    <p className="break-words">{participant.mobileNumber}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-gray-100 border border-gray-300 shadow-md hover:bg-gray-200 dark:bg-primary-light dark:text-neutral-200 dark:bg-opacity-10 p-3 rounded-lg mt-4">
                  <div>
                    <h2 className="font-semibold">Email</h2>
                    <p className="break-words">{participant.email}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold">Gender</h2>
                    <p className="break-words">{participant.gender}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold">State</h2>
                    <p className="break-words">{participant.state}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold">Social Media Handle</h2>
                    <p className="break-words">{participant.socialMediaHandle}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-secondary-dark">No Participant(s) Found.</p>
          )}
        </div>
      </div>

      {/* Desktop View (Above 870px) */}
      <div className="hidden custom:block">
        <div className="grid gap-6">
          {/* Header Row */}
          <div className="grid grid-cols-9 gap-8 bg-gray-300 p-4 font-bold dark:bg-[rgba(255,255,255,0.1)] dark:bg-opacity-10 rounded-lg shadow-md max-w-full transition duration-300 dark:text-neutral-200">
            <div className="col-span-2 text-center">Name</div>
            <div className="col-span-2 text-center">Email</div>
            <div className="text-center">Gender</div>
            <div className="text-center">State</div>
            <div className="col-span-2 text-center">Social Media</div>
            <div className="text-center">Mobile Number</div>
          </div>

          {/* Participant Data Rows */}
          {data.length ? (
            data.map((participant) => (
              <div
                key={participant._id}
                className="grid grid-cols-9 gap-8 p-4 bg-gray-100 border dark:bg-[rgba(255,255,255,0.1)] dark:text-neutral-200 dark:backdrop-blur-lg dark:bg-opacity-10 rounded-lg border-gray-300 shadow-md hover:bg-gray-200"
              >
                <div className="col-span-2">
                  <p className="break-words">{participant.fullName}</p>
                </div>
                <div className="col-span-2">
                  <p className="break-words">{participant.email}</p>
                </div>
                <div className="text-center">
                  <p className="break-words">{participant.gender}</p>
                </div>
                <div className="text-center">
                  <p className="break-words">{participant.state}</p>
                </div>
                <div className="col-span-2">
                  <p className="break-words text-center">{participant.socialMediaHandle}</p>
                </div>
                <div className="text-center">
                  <p className="break-words">{participant.mobileNumber}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-secondary-dark">No Participant(s) Found.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ParticipationUsers;
