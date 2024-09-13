import { useFormik } from 'formik';
import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '@/constants/api';

interface QuestionFormValues {
  question: string;
  correctAnswer: string;
  response: string;
}

const EpisodeEventsForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik<QuestionFormValues>({
    initialValues: {
      question: '',
      correctAnswer: '',
      response: '',
    },
    onSubmit: async (values, { resetForm }) => {
      setError(null);

      const episodeId = localStorage.getItem("episodeId");
      if (!episodeId) {
        setError("No episode ID found. Please create an episode first.");
        return;
      }

      try {
        await axios.post(`${API_URL}/v1/api/episode-events`, {
          episodeId,
          questions: [
            {
              question: values.question,
              response: values.response,
              correctAnswer: values.correctAnswer,
            }
          ]
        });
        resetForm();
      } catch (error) {
        setError('Failed to handle episode event.');
      }
    }
  });

  return (
    <main className="flex justify-center items-center py-10 px-4">
        <div className=" w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl transition-all duration-300 shadow-lg p-6 rounded">
      <h1 className="text-2xl font-bold mb-4 text-gray-400 text-center mt-10">Add episode events Question</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label className="block text-base font-medium text-gray-400 mb-2">Question</label>
          <input
            type="text"
            name="question"
            value={formik.values.question}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full py-4 p-2 outline-none border border-yellow-300 rounded-lg focus:ring focus:ring-yellow-200"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-gray-400 mb-2">Correct Answer</label>
          <input
            type="text"
            name="correctAnswer"
            value={formik.values.correctAnswer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full py-4 p-2 outline-none border border-yellow-300 rounded-lg focus:ring focus:ring-yellow-200"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-gray-400 mb-2">Response</label>
          <input
            type="text"
            name="response"
            value={formik.values.response}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full py-4 p-2 outline-none border border-yellow-300 rounded-lg focus:ring focus:ring-yellow-200"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-4 text-lg font-bold bg-secondary-saffron text-white rounded-md px-4 "
        >
          Add
        </button>
      </form>
    </div>
    </ main>
  );
};

export default EpisodeEventsForm;