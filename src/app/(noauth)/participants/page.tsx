"use client";
import React, { Suspense } from 'react'
import ParticipationUsers from '@/components/Participants'
import Loading from '@/components/UI/Loading'

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
    <ParticipationUsers />
  </Suspense>
  )
}

export default page