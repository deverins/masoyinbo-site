"use client"
import React, { useEffect, useState } from 'react'
import HeroSection from './HeroSection'
import StatsCard from './StatsCard'
import AboutSection from './AboutSection'
import PerformanceStatsPieChart from './PerformanceStatsPieChart'
import axios from 'axios'
import { API_URL } from '@/constants/api'
import Loading from './UI/Loading'
import { Stats } from '@/types'
import EpisodeCollection from './episodes/EpisodeCollection'

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { stats } } = await axios.get(`${API_URL}/api/get-performance-stats`);
        console.log("stats", stats)
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
        </div> :
        <>
          {stats ?
            <div>
              <StatsCard {...stats} />
              <PerformanceStatsPieChart {...stats} />
              {/* Recent episodes */}
              <div className="mt-10 pb-5 mx-2 ">
                <h2 className="text-2xl font-bold mb-9 dark:text-neutral-400 text-center">Recent Episodes</h2>
                <EpisodeCollection episodes={stats.recentEpisodes} />
              </div>
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