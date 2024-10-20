import React from 'react';
import ProtectedCreateEpisodeForm from './Create';

export const metadata = {
  title: 'Create Episode',
  description: 'This is the create episode page.',
};

const Page = () => {
  return <ProtectedCreateEpisodeForm />;
};

export default Page;
