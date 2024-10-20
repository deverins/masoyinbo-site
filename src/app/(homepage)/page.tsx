import MainPage from '@/components/MainPage';
import { API_URL } from '@/constants/api';
import axios from 'axios';
import React, { Suspense } from 'react';
import Loading from '@/components/UI/Loading';
import Custom500 from './error-page/Error';
import { Stats } from '../../types/index';

const page = async () => {
  try {
    const {data} = await axios.get(`${API_URL}/api/get-performance-stats`);
    const stats = (data?.stats || {}) as Stats; 

    return (
      <Suspense fallback={<Loading />}>
        <MainPage stats={stats} />
      </Suspense>
    );
  } catch (error:any) {
    console.error('Error fetching stats:', error.response?.data || error.message);

    return ( <Custom500 /> );
  }
};

export default page;
