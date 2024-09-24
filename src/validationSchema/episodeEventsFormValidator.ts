import * as Yup from 'yup';

export const episodeEventsFormValidator = Yup.object().shape({
  type: Yup.string().required('Type is required'),
  question: Yup.lazy((value, context) => {
    return context.parent.type !== 'CODE_MIX'
      ? Yup.string().required('Question is required')
      : Yup.string().notRequired();
  }),
  correctAnswer: Yup.lazy((value, context) => {
    return context.parent.type !== 'CODE_MIX'
      ? Yup.string().required('Correct Answer is required')
      : Yup.string().notRequired();
  }),
  response: Yup.string().required('Response is required'),
  isCorrect: Yup.boolean().required('Is Correct is required'),
  amount: Yup.number().required('Amount is required'),
  balance: Yup.number()
    .required('Balance is required')
    .min(0, 'Balance must be at least 0'),
});

