import * as Yup from 'yup';

export const episodeEventsFormValidator = Yup.object().shape({
  question: Yup.string().required('Question is required'),
  correctAnswer: Yup.string().required('Correct Answer is required'),
  response: Yup.string().required('Response is required'),
  type: Yup.string().required('Type is required'),
  amount: Yup.number()
    .required('Amount is required')
    .min(0, 'Amount must be at least 0'),
  balance: Yup.number()
    .required('Balance is required')
    .min(0, 'Balance must be at least 0'),
});
