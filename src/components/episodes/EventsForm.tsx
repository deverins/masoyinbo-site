import React, { MouseEvent, useRef } from 'react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { episodeEventsFormValidator } from '@/validationSchema/episodeEventsFormValidator';
import { EpisodeEvent } from '@/types';
import axios from 'axios';
import { API_URL } from '@/constants/api';
import Dialogbox from '../DialogBox';
interface EpisodeEventsFormProps {
  onSave: (episode: EpisodeEvent) => void;
  episodeId?: string;
  event?: EpisodeEvent
}

const EventsForm: React.FC<EpisodeEventsFormProps> = ({ onSave, episodeId, event }) => {
  const [error, setError] = useState<string | null>(null);
  const [submiting, setSubmiting] = useState(false);
  const typeInputRef = useRef<HTMLInputElement>(null)

  const formik = useFormik({
    initialValues: {
      question: event?.question ?? '',
      correctAnswer: event?.correctAnswer ?? '',
      response: event?.response ?? '',
      type: event?.type ?? 'Select Type',
      isCorrect: event?.isCorrect ?? '',
      amount: event?.amount ?? 0,
      balance: event?.balance ?? '',
    },
    validationSchema: episodeEventsFormValidator,
    onSubmit: async (values, { resetForm }) => {
      if (submiting) return
      setSubmiting(true)
      setError(null);

      const { question, correctAnswer, isCorrect, ...rest } = values;
      const parsedIsCorrect = formik.values.isCorrect === 'true';
      let payload;
      if (values.type === 'CODE_MIX') {
        payload = { ...rest, isCorrect: parsedIsCorrect };
      } else {
        payload = { question, correctAnswer, ...rest, isCorrect: parsedIsCorrect };
      }

      if (!event) {
         console.log(payload);
        
        // const episodeEvent = await createEvent(episodeId as string, payload as EpisodeEvent)
        // if (episodeEvent) {
        //   onSave(episodeEvent)
        // }
        // resetForm()
        setSubmiting(false)
        return
      }

      const episodeEvent = await updateEvent(event._id, payload as EpisodeEvent)
      if (episodeEvent) {
        onSave(episodeEvent)
      }
      setSubmiting(false)
    }
  });

  const createEvent = async (episodeId: string, payload: EpisodeEvent) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/episode-events`, { episodeId, event: payload })
      const event = data.event as EpisodeEvent
      return event
    } catch (error: any) {
      setError(error?.response?.data?.message as string)
    }
  }
  const updateEvent = async (id: string, payload: EpisodeEvent) => {
    try {
      const { data } = await axios.put(`${API_URL}/api/episode-events/${id}`, { event: payload })
      const event = data.event as EpisodeEvent
      return event
    } catch (error: any) {
      setError(error?.response?.data?.message as string)
    }
  }

  const setTypeValue=(event: MouseEvent<HTMLLIElement>)=>{
    const value = event.currentTarget.dataset.value as string;
    if(!typeInputRef.current) return
    typeInputRef.current.value = value 
    formik.values.type = value
  }


  return (
    <>
      <main className=" py-10 px-4 w-full">
        <div className="w-full transition-all duration-300 shadow-lg p-6 rounded">
          <h1 className="text-2xl font-bold mb-6 dark:text-gray-400 text-center">Add Episode Event</h1>
          {error && <div className="text-red-500 mb-2 mt-4">{error}</div>}

          <form onSubmit={formik.handleSubmit}>
            {/* Question */}
            <div>
              <label className="block text-base font-medium dark:text-gray-400 mb-2 mt-4">Question</label>
              <textarea
                name="question"
                value={formik.values.question}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full py-4 p-2 rounded-lg event-form-input "
                disabled={formik.values.type === 'CODE_MIX'}
              />
              {formik.errors.question && formik.touched.question && (
                <div className="text-red-500">{formik.errors.question}</div>
              )}
            </div>

            {/* Given Answer */}
            <div>
              <label className="block text-base font-medium dark:text-gray-400 mb-2 mt-4">Expected Answer</label>
              <textarea
                name="correctAnswer"
                value={formik.values.correctAnswer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full py-4 p-2 event-form-input"
                disabled={formik.values.type === 'CODE_MIX'}
              />
              {formik.errors.correctAnswer && formik.touched.correctAnswer && (
                <div className="text-red-500">{formik.errors.correctAnswer}</div>
              )}
            </div>

            {/* Expected Answer */}
            <div>
              <label className="block text-base font-medium dark:text-gray-400 mb-2 mt-4"> Given Answer</label>
              <textarea
                name="response"
                value={formik.values.response}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full py-4 p-2 event-form-input"
              />
              {formik.errors.response && formik.touched.response && (
                <div className="text-red-500">{formik.errors.response}</div>
              )}
            </div>
            {/* Type */}
            <div id='typeField' className='relative'>

              <label className="block text-base font-medium dark:text-gray-400 mb-2 mt-4">Type</label>
              <input ref={typeInputRef} type="text" readOnly className='w-full py-4 p-2 event-form-input'
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
                {formik.values.type === '' && (
                  <option value="" disabled>Select Type</option>
                )} 
                <Dialogbox triggerDomId='typeField' positions={{ySide:'bottom'}}  closeOnClick
                  className='text-neutral-700 dark:text-neutral-200 dark:bg-slate-900
                    border dark:border-slate-700 right-1/2 w-full shadow translate-x-1/2
                  ' 
                >
                  <ul className='dark:text-neutral-200'>
                    <li onClick={setTypeValue}  data-value="QUESTION_NUMBER" 
                      className="p-2 dark:hover:bg-slate-700 cursor-pointer  rounded-lg"
                    >
                      Question Number
                    </li>
                    <li onClick={setTypeValue} data-value="QUESTION" 
                      className="p-2 dark:hover:bg-slate-700 cursor-pointer rounded-lg"
                    >
                      Question
                    </li>
                    <li onClick={setTypeValue} data-value="CODE_MIX" 
                      className="p-2 dark:hover:bg-slate-700 cursor-pointer rounded-lg"
                    >
                      Code Mix
                    </li>
                  </ul>
                </Dialogbox> 
              {formik.errors.type && formik.touched.type && (
                <div className="text-red-500">{formik.errors.type}</div>
              )}
            </div>

            {/* Deducted Amount */}
            <div>
              <label className="block text-base font-medium dark:text-gray-400 mb-2 mt-4">Amount</label>
              <input
                type="number"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full py-4 p-2 event-form-input"
              />
              {formik.errors.amount && formik.touched.amount && (
                <div className="text-red-500">{formik.errors.amount}</div>
              )}
            </div>

            {/* Balance */}
            <div>
              <label className="block text-base font-medium dark:text-gray-400 mb-2 mt-4">Balance</label>
              <input
                type="number"
                name="balance"
                value={formik.values.balance}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full py-4 p-2 event-form-input"
              />
              {formik.errors.balance && formik.touched.balance && (
                <div className="text-red-500">{formik.errors.balance}</div>
              )}
            </div>
            {/* Is Correct */}
            <div>
              <label className="block text-base font-medium dark:text-gray-400 mb-2 mt-4">Is Correct</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center dark:text-gray-200">
                  <input
                    type="radio"
                    name="isCorrect"
                    value="true"
                    checked={formik.values.isCorrect === 'true'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mr-2 p-2"
                  />
                  True
                </label>
                <label className="flex items-center dark:text-gray-200">
                  <input
                    type="radio"
                    name="isCorrect"
                    value="false"
                    checked={formik.values.isCorrect === 'false'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mr-2 p-2"
                  />
                  False
                </label>
              </div>
              {formik.errors.isCorrect && formik.touched.isCorrect && (
                <div className="text-red-500">{formik.errors.isCorrect}</div>
              )}
            </div>
            {/* Submit button */}
            <button
              type="submit"
              className="mt-6 w-full py-4 text-lg dark:border dark:border-slate-400 font-bold bg-primary-light text-white p-2 rounded-md px-4"
            >
              {submiting && 'Processing...'}
              {!submiting && (<span>{event ? 'Update Event' : 'Add Event'} </span>)}
            </button>

          </form>
        </div>
      </main>
    </>
  );
};

export default EventsForm;