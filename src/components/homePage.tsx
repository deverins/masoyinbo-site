"use client"
import React from 'react'
import HeroSection from './HeroSection'
import StatsCard from './StatsCard'
import RecentEpisodes from './RecentEpisodes'
import AboutSection from './AboutSection'
import PerformanceStatsPieChart from './PerformanceStatsPieChart'
import CodemixWordLossBarChart from '@/hooks/CodemixWordLossBarChart'

const HomePage = () => {

  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsCard />
      <PerformanceStatsPieChart />
      <CodemixWordLossBarChart />
      <RecentEpisodes />
    </>
  )
}

export default HomePage