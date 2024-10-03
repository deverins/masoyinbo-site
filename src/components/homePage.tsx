"use client"
import React, { useEffect, useState } from 'react'
import HeroSection from './HeroSection'
import StatsCard from './StatsCard'
import RecentEpisodes from './RecentEpisodes'
import AboutSection from './AboutSection'
import PerformanceStatsPieChart from './PerformanceStatsPieChart'
import axios from 'axios'
import { API_URL } from '@/constants/api'
import Loading from './UI/Loading'
import { Stats } from '@/types'

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data:{stats} } = await axios.get(`${API_URL}/v1/api/get-performance-stats`);
        
        setStats(stats as Stats)

        setLoading(false);
      } catch (error) {
        console.error('Error fetching performance stats:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <HeroSection />
      <AboutSection />

      {loading ?
        <div>
          <Loading />
        </div>:
        <>
          {stats?
          <div>
            <StatsCard {...stats} />
            <PerformanceStatsPieChart {...stats} />
            <RecentEpisodes episodes={stats.recentEpisodes} />
          </div> :
          <div>
              Display error message now
          </div>

          }
        </>
      }
    </>
  )
}

export default HomePage