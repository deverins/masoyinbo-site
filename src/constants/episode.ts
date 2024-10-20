
import axios from 'axios';

import { Episode } from '@/types';
import { API_URL } from './api';

export const getEpisodeById = async (episodeId: string): Promise<Episode> => {
  const endpoint = `${API_URL}/api/episodes/${episodeId}`;
  const { data } = await axios.get(endpoint);
  return data.episode; 
};
