import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from '@/constants/api';
import { Participant } from "@/types";
import { useSearchParams } from "next/navigation";

const ParticipationUsers = () => {
  const [data, setData] = useState<Participant[]>([]);
  const [error, setError] = useState<string | null>(null);
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
      } catch (error) {
        setError("Error fetching participants.");
        console.error("Error fetching request pool", error);
      }
    };

    fetchRequestPool();
  }, [status]);


  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold text-center mb-8 mt-8 dark:text-neutral-200">All  {status} Participant(s)</h1>

      {/* Mobile and Tablet View (870px and below) */}
      <div className="block max-[870px]:block custom:hidden">
        <div className="flex flex-col gap-6">
          {data.length ? (
            data.map((participant) => (
              <div
                key={participant._id}
                className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md transition-all duration-500 hover:bg-gray-200 dark:bg-[rgba(255,255,255,0.1)] dark:text-neutral-200 dark:backdrop-blur-lg dark:bg-opacity-10"
              >
                {/* Name and Status in one row for mobile */}
                <div className="flex justify-between items-center w-full">
                  <div>
                    <h2 className="font-semibold">Name</h2>
                    <p>{participant.fullName}</p>
                  </div>
                  {/* Status */}
                  <div className="text-right">
                    <h2 className="font-semibold">Status</h2>
                    <p
                      className={`font-bold ${participant.status === 'COMPLETED'
                          ? 'text-green-500'
                          : participant.status === 'PENDING'
                            ? 'text-red-500'
                            : 'text-gray-500'
                        }`}
                    >
                      {participant.status}
                    </p>
                  </div>

                </div>

                {/* Other details below for mobile */}
                <div className="flex flex-col gap-4 bg-gray-100 border border-gray-300 shadow-md  hover:bg-gray-200 dark:bg-[rgba(255,255,255,0.1)] dark:text-neutral-200 dark:backdrop-blur-lg dark:bg-opacity-10 p-3 rounded-lg w-full mt-4 pl-10">
                  <div className="flex gap-1">
                    <h2 className="font-semibold">Email:</h2>
                    <p>{participant.email}</p>
                  </div>
                  <div className="flex gap-1">
                    <h2 className="font-semibold">Gender:</h2>
                    <p>{participant.gender}</p>
                  </div>
                  <div className="flex gap-1">
                    <h2 className="font-semibold">State:</h2>
                    <p>{participant.state}</p>
                  </div>
                  <div className="flex gap-1">
                    <h2 className="font-semibold">Social Media Handle:</h2>
                    <p>{participant.socialMediaHandle}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-secondary-dark">No Participant(s) Found.</p>
          )}
        </div>
      </div>

      {/* Desktop View (Above 934.44px) */}
      <div className="hidden custom:block">
        <div className="flex flex-col gap-6">
          {data.length ? (
            data.map((participant) => (
              <div
                key={participant._id}
                className="flex flex-col md:flex-row lg:justify-around md:justify-between md:items-center p-4 bg-gray-100 border dark:bg-[rgba(255,255,255,0.1)] dark:text-neutral-200 dark:backdrop-blur-lg dark:bg-opacity-10 rounded-lg border-gray-300 shadow-md  hover:bg-gray-200"
              >
                {/* Name and Email */}
                <div className="flex flex-col md:flex-row gap-20">
                  <div>
                    <h2 className="font-semibold">Name</h2>
                    <p>{participant.fullName}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold">Email</h2>
                    <p>{participant.email}</p>
                  </div>
                </div>

                {/* Gender, State, Social Media Handle */}
                <div className="flex flex-col md:flex-row gap-8">
                  <div>
                    <h2 className="font-semibold">Gender</h2>
                    <p>{participant.gender}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold">State</h2>
                    <p>{participant.state}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold">Social Media Handle</h2>
                    <p>{participant.socialMediaHandle}</p>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h2 className="font-semibold">Status</h2>
                  <p
                    className={`font-bold ${participant.status === 'COMPLETED'
                        ? 'text-green-500'
                        : participant.status === 'PENDING'
                          ? 'text-red-500'
                          : 'text-gray-500'
                      }`}
                  >
                    {participant.status}
                  </p>
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