import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { episodeEventsFormValidator } from '@/validationSchema/episodeEventsFormValidator';
import EpisodeEventsTable from './EpisodeEventsTable';
interface EpisodeEventsFormProps {
  onEdit?: any;
  episodeId: string;
}

const EpisodeEventsForm: React.FC<EpisodeEventsFormProps> = ({ onEdit, episodeId }) => {
  const [error, setError] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const formik = useFormik({
    initialValues: {
      question: '',
      correctAnswer: '',
      response: '',
      type: '',
      isCorrect: '',
      amount: 0,
      balance: '',
    },
    validationSchema: episodeEventsFormValidator,
    onSubmit: (values, { resetForm }) => {
      setError(null);

      const { question, correctAnswer, isCorrect, ...rest } = values;
      const parsedIsCorrect = formik.values.isCorrect === 'true';
      let payload;
      if (values.type === 'CODE_MIX') {
        payload = { ...rest, isCorrect: parsedIsCorrect };
      } else {
        payload = { question, correctAnswer, ...rest, isCorrect: parsedIsCorrect };
      }

      const storedEvents = JSON.parse(localStorage.getItem('episodeEvents') || '[]');
      if (editIndex !== null) {
        storedEvents[editIndex] = payload;
        setEditIndex(null);
      } else {
        storedEvents.push(payload);
      }
      localStorage.setItem('episodeEvents', JSON.stringify(storedEvents));
      resetForm();
      if (onEdit) onEdit();
    }
  });

  useEffect(() => {
    if (onEdit && editIndex !== onEdit.index) {
      const { question, correctAnswer, response, type, amount, balance, isCorrect, index } = onEdit;
      formik.setValues({ question, correctAnswer, isCorrect, response, type, amount, balance });
      setEditIndex(index);
    }
  }, [onEdit, editIndex]);

  return (
    <>
      <EpisodeEventsTable
        onEdit={(editedEvent: any) => {
          formik.setValues(editedEvent);
          setEditIndex(editedEvent.index);
        }}
        episodeId={episodeId}
      />
      <main className="flex justify-center items-center py-10 px-4">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl transition-all duration-300 shadow-lg p-6 rounded">
          <h1 className="text-2xl font-bold mb-6 dark:text-gray-400 text-center">Add Episode Event</h1>
          {error && <div className="text-red-500 mb-2 mt-4">{error}</div>}

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
            {/* Submit button */}
            <button
              type="submit"
              className="mt-6 w-full py-4 text-lg font-bold bg-primary-light text-white p-2 rounded-md px-4"
            >
              {editIndex !== null ? 'Update Event' : 'Submit Event'}
            </button>

          </form>
        </div>
      </main>
    </>
  );
};

export default EpisodeEventsForm;
