"use client"
import EpisodeEventsForm from '@/components/EpisodeEventForm'
import { useAuth } from '@/hooks/AuthContext'
import React from 'react'

const page = () => {
  return (
    <div>
      <EpisodeEventsForm />
    </div>
  )
}

export default () => {
  const { withAdminAuth } = useAuth();
  const ProtectedEpisodeEventsForm = withAdminAuth(page);
  return <ProtectedEpisodeEventsForm />;
};