import * as Yup from 'yup';

export const episodeSchema = Yup.object().shape({
  episodeLink: Yup.string().url('Invalid URL').required('Episode link is required'),
  participant_id: Yup.string().required('Participant is required'),
  amountWon: Yup.number().required('Amount won is required'),
});