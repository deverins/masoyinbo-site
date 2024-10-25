import React from "react";

import { Participant } from "@/types";

type EachParticipantProps = {
  participant: Participant;
};
const EachParticipant = ({ participant }: EachParticipantProps) => {
  return (
    <main className="p-4">
      <h1 className="text-lg md:text-xl font-bold text-start mb-2 mt-2 dark:text-neutral-200">
        Participant Details
      </h1>
      <div className="grid gap-8 p-2 dark:text-neutral-200 dark:backdrop-blur-lg dark:bg-opacity-10 max-w-[400px]">
        <div>
          <p className="font-semibold">Name:</p>
          <p>{participant.fullName}</p>
        </div>
        <div>
          <p className="font-semibold">Email:</p>
          <p>{participant.email}</p>
        </div>
        <div>
          <p className="font-semibold">Gender:</p>
          <p>{participant.gender}</p>
        </div>
        <div>
          <p className="font-semibold">State:</p>
          <p>{participant.state}</p>
        </div>
        <div>
          <p className="font-semibold">Social Media:</p>
          <p>{participant.socialMediaHandle}</p>
        </div>
        <div>
          <p className="font-semibold">Mobile Number:</p>
          <p>{participant.mobileNumber}</p>
        </div>
      </div>
    </main>
  );
};

export default EachParticipant;
