import React, { MouseEvent } from 'react';

import { EpisodeEvent, EventActionSignal } from "@/types"
import { formatCurrency, formatType } from "@/utils/functions"
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";


type EpisodeEvents = {
  events: EpisodeEvent[],
  signal: (signal:EventActionSignal)=>void
}

const EventsTable: React.FC<EpisodeEvents> = ({ events, signal }) => {

    const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.dataset.id as string
      signal({ id, type: 'EDIT' });
    };
    
  
    const handleDelete = (event:MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.dataset.id as string
      signal({id, type: 'DELETE'})
    }

  const isAdmin = localStorage.userRole === 'admin'

  return (
    <>
      {/* Mobile and Tablet View */}
      <div className="block 870px:hidden mt-6">
        <div className="p-4 pt-0 rounded-lg justify-center">
          {events.map((event, index) => (
            <div
              key={index}
              className="flex flex-col p-4 rounded-lg shadow-md border-b border-gray-300 transition-all duration-500"
            >
              {/* Small screen  columns */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h2 className="font-bold text-lg dark:text-neutral-200">Type</h2>
                  <span className={`inline-block flex-none size-2 items-center ml-2 ${event.isCorrect ? 'bg-green-500' : 'bg-red-500'} rounded-full`} />
                  <span className="ml-2 lowercase dark:text-neutral-300">{formatType(event.type)}</span>
                </div>

                {event.type !== 'CODE_MIX' && (
                  <div>
                    <h2 className="font-bold text-lg dark:text-neutral-200">Question</h2>
                    <p className="dark:text-neutral-300">{event.question}</p>
                  </div>
                )}

                <div>
                  <h2 className="font-bold text-lg dark:text-neutral-200">Response</h2>
                  <p className="dark:text-neutral-300">{event.response}</p>
                </div>
                
                {event.type !== 'CODE_MIX' && (
                  <div>
                    <h2 className="font-bold text-lg dark:text-neutral-200">Correct Answer</h2>
                    <p className="dark:text-neutral-300">{event.correctAnswer}</p>
                  </div>
                )}
                <div>
                  <h2 className="font-bold text-lg dark:text-neutral-200">Amount</h2>
                  <p className="dark:text-neutral-300">{formatCurrency(event.amount)}</p>
                </div>
                <div>
                  <h2 className="font-bold text-lg dark:text-neutral-200">Balance</h2>
                  <p className="dark:text-neutral-300">{formatCurrency(event.balance)}</p>
                </div>
              </div>

              {/* Edit and Delete Buttons */}
              {isAdmin && (
                <div className="flex gap-2 justify-end">
                  <button onClick={handleEdit} data-id={event._id} className="bg-blue-500 text-white hover:bg-blue-600 p-1 rounded">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button onClick={handleDelete}  data-id={event._id} className="bg-red-500 text-white hover:bg-red-600 p-1 rounded">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>


      {/* Desktop View */}
      <div className="hidden 870px:block">
        <div className="overflow-auto w-full rounded-lg">
          {/* Render events when present */}
          <div className="grid grid-cols-6 gap-4 bg-gray-300 p-2 font-bold dark:bg-[rgba(255,255,255,0.1)] dark:backdrop-blur-lg dark:bg-opacity-10 rounded-lg shadow-md max-w-full overflow-hidden transition duration-300 dark:text-neutral-200">
            <div className="col-span-1 w-[100px] text-center">Type</div>
            <div className="col-span-1 w-[150px]">Question</div>
            <div className="col-span-1 w-[120px] text-center">Response</div>
            <div className="col-span-1 w-[150px] text-center">Correct Answer</div>
            <div className="col-span-1 w-[100px] text-center">Amount</div>
            <div className="col-span-1 w-[100px] text-center">Balance</div>
          </div>
          {events.map((event, index) => (
            <div key={index} className="grid grid-cols-6 gap-4 py-4 mb-2 dark:text-neutral-300">
              <div className="col-span-1 w-[100px] text-center flex items-center justify-center">
                <span className={`inline-block flex-none size-2 items-center ml-2 ${event.isCorrect ? 'bg-green-500' : 'bg-red-500'} rounded-full`} />
                <span className="ml-2 cap1stL">{formatType(event.type)}</span>
              </div>
              <div className="col-span-1 w-[150px] max-h-36 overflow-y-auto no-scrollbar cap1stL">
                {event.question}
              </div>
              <div className="col-span-1 cap1stL w-[120px] text-center">{event.response}</div>
              <div className="col-span-1 cap1stL w-[150px] text-center">{event.correctAnswer}</div>
              <div className="col-span-1 cap1stL w-[100px] text-center">{formatCurrency(event.amount)}</div>
              <div className="col-span-1 w-[100px] text-center">
                {formatCurrency(event.balance)}
                {/* Edit and Delete Buttons under the balance */}
                {isAdmin && (
                  <div className="flex gap-2 w-[140px] justify-center mt-2">
                    <button onClick={handleEdit} data-id={event._id} className="bg-blue-500 text-white hover:bg-blue-600 p-1 rounded w-[60px] flex items-center justify-center">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={handleDelete} data-id={event._id} className="bg-red-500 text-white hover:bg-red-600 p-1 rounded w-[60px] flex items-center justify-center">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}


export default EventsTable;