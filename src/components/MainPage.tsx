"use client"
import React, { useEffect, useState } from 'react'
import HeroSection from './HeroSec'
import StatsCard from './StatsCard'
import AboutSection from './AboutSection'
import PerformanceStatsPieChart from './PerformanceStatsPieChart'
import Loading from './UI/Loading'
import { Stats } from '@/types'
import EpisodeCollection from './episodes/EpisodeCollection'
import LogoSection from './LogoSection'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa'
import Custom500 from '@/app/(homepage)/error-page/Error'

type SSRProps = {
  stats: Stats
}
const MainPage = ({ stats }: SSRProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <HeroSection />
      <div className='w-full px-2 max-w-7xl mx-auto'>
        <AboutSection />
        <LogoSection />
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
                  <div className='text-sm  hover:underline md:text-lg font-semibold dark:text-neutral-200 flex justify-end mb-2'>
                    <Link href={'/episodes'} className='flex' passHref>
                      View more<span className='flex items-center'><FaChevronRight size={16} /> </span>
                    </Link>
                  </div>
                  <EpisodeCollection episodes={stats.recentEpisodes} />
                </div>
              </div> :
              <div>
                <Custom500 />
              </div>

            }
          </>
        }
      </div>
    </>
  )
}

export default MainPage