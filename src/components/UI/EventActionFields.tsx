import React, { useCallback } from 'react';
import { EpisodeEvent } from '@/types';
import { useFormik } from 'formik';

interface EventInputFieldsProps {
  event: EpisodeEvent;
  onSubmit: (values: EpisodeEvent) => Promise<void>;
}

const EventInputFields: React.FC<EventInputFieldsProps> = ({ event, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      ...event,
      isCorrect: event.isCorrect ? 'true' : 'false',
    },
    onSubmit: async (values) => {
      const submittedValues = {
        ...values,
        isCorrect: values.isCorrect === 'true',
      };
      await onSubmit(submittedValues);
    },
  });

  const updateEvent = useCallback(async () => {
    const updatedValues = {
      ...formik.values,
      isCorrect: formik.values.isCorrect === 'true',
    };
    await onSubmit(updatedValues);
  }, [formik.values, onSubmit]);

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Question */}
      <div>
        <label className="block text-base font-medium dark:text-gray-400 mb-2 mt-4">Question</label>
        <input
          type="text"
          name="question"
          value={formik.values.question}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full py-4 p-2 outline-none rounded-lg focus:ring focus:ring-primary-light"
          disabled={formik.values.type === 'CODE_MIX'}
        />
        {formik.errors.question && formik.touched.question && (
          <div className="text-red-500">{formik.errors.question}</div>
        )}
      </div>

      {/* Correct Answer */}
      <div>
        <label className="block text-base font-medium dark:text-gray-400 mb-2 mt-4">Correct Answer</label>
        <input
          type="text"
          name="correctAnswer"
          value={formik.values.correctAnswer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full py-4 p-2 outline-none rounded-lg focus:ring focus:ring-primary-light"
          disabled={formik.values.type === 'CODE_MIX'}
        />
        {formik.errors.correctAnswer && formik.touched.correctAnswer && (
          <div className="text-red-500">{formik.errors.correctAnswer}</div>
        )}
      </div>

      {/* Response */}
      <div>
        <label className="block text-base font-medium dark:text-gray-400 mb-2 mt-4">Response</label>
        <input
          type="text"
          name="response"
          value={formik.values.response}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full py-4 p-2 outline-none rounded-lg focus:ring focus:ring-primary-light"
        />
        {formik.errors.response && formik.touched.response && (
          <div className="text-red-500">{formik.errors.response}</div>
        )}
      </div>

      {/* Type */}
      <div>
        <label className="block text-base font-medium dark:text-gray-400 mb-2 mt-4">Type</label>
        <select
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full py-4 p-2 outline-none rounded-lg focus:ring focus:ring-primary-light"
        >
          {formik.values.type === '' && (
            <option value="" disabled>Select Type</option>
          )}
          <option value="QUESTION_NUMBER">Question Number</option>
          <option value="QUESTION">Question</option>
          <option value="CODE_MIX">Code Mix</option>
        </select>
        {formik.errors.type && formik.touched.type && (
          <div className="text-red-500">{formik.errors.type}</div>
        )}
      </div>

      {/* Deducted Amount */}
      <div>
        <label className="block text-base font-medium dark:text-gray-400 mb-2 mt-4">Deducted Amount</label>
        <input
          type="number"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full py-4 p-2 outline-none rounded-lg focus:ring focus:ring-primary-light"
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
          className="w-full py-4 p-2 outline-none rounded-lg focus:ring focus:ring-primary-light"
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
              className="mr-2"
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
              className="mr-2"
            />
            False
          </label>
        </div>
        {formik.errors.isCorrect && formik.touched.isCorrect && (
          <div className="text-red-500">{formik.errors.isCorrect}</div>
        )}
      </div>

      <button type="submit" className="mt-4 w-full bg-primary text-white py-2 rounded">Save edit</button>
    </form>
  );
};

export default EventInputFields;
