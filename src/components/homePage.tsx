"use client"
import React from 'react'
import HeroSection from './HeroSection'
import StatsCard from './StatsCard'
import RecentEpisodes from './RecentEpisodes'
import AboutSection from './AboutSection'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsCard />
      <RecentEpisodes />
    </>
  )
}

export default HomePage