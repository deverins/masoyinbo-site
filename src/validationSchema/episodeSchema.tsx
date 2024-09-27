import * as Yup from 'yup';

export const episodeSchema = Yup.object().shape({
  episodeLink: Yup.string().url('Invalid URL').required('Episode link is required'),
  participant_id: Yup.string().required('Participant is required'),
  episodeDate: Yup.string().required('Episode date is required').matches(/^\d{4}-\d{2}-\d{2}$/, 'Episode date must be in the format YYYY-MM-DD'),
  amountWon: Yup.number().min(0, 'Amount won must be at least 0').required('Amount won is required'),
  episodeNumber: Yup.number().required('Episode Number is required'),
  availableAmountToWin: Yup.number().required('Available Amount To Win is required'),
});