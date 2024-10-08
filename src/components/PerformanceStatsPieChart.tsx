import React, { useState, useMemo } from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { lossCategoryColors } from '@/constants/api';
import { LossTypeKeys, Stats } from '@/types';
import DoughnutChart from './Doughnut';
import BarChart from './BarChart';
import { CodemixWords } from '../types/index';

const PerformanceStats: React.FC <Stats> = (stats) => {

  const [showStats, setShowStats] = useState(false);
// "₦"
  const lossPieAmountData = useMemo(()=>{    
      return stats.lossTypeData.map(data=> {
        return {
          name: data.type,
          value: Math.abs(data.totalAmountLost),
          color:lossCategoryColors[data.type as LossTypeKeys]
        }
      })
  }, [stats])

  const lossPieCountData = useMemo(()=>{
    return stats.lossTypeData.map(data=> {
      return {name: data.type, value: data.count, color:lossCategoryColors[data.type as LossTypeKeys]}
    })
}, [stats])
  const CodemixWordsData = useMemo(()=>{
    return stats.lossTypeData.map(data=> {
      return {
        name: data.words,     
        value: Math.abs(data.totalAmountLost),
        color: lossCategoryColors[data.type as keyof typeof lossCategoryColors]}
    })
}, [stats])


  const handleToggle = () => setShowStats(!showStats);

  return (
    <section className="py-4 mt-16">
      <div className="mx-4 px-4">
        <div className="flex justify-center">
          <button
            onClick={handleToggle}
            className="mb-4 p-2 bg-primary-light dark:bg-opacity-10 shadow-md transition duration-300 pb-2 text-white rounded flex items-center justify-center"
          >
            {showStats ? 'Collapse Statistics' : 'View Statistics Performance'}
            {showStats ? <FaChevronDown className="ml-2" /> : <FaChevronRight className="ml-2" />}
          </button>
        </div>

        {showStats && (
          <div className=" grid xl:grid-cols-2 gap-8">
            {/* Desktop / Tablet Layout */}
              {/* Card for Pie Chart and Bar Chart */}
              <div className="w-full max-w-full bg-white dark:bg-inherit dark:shadow-xl">
                <h2 className="text-xl p-2 mb-2 font-semibold text-[#3CBA9F]">
                  Loss Amount by Category
                </h2>
                <div className=" flex flex-col-reverse md:flex-row rounded-lg shadow-md p-4">

                <BarChart data={lossPieAmountData} />
                <DoughnutChart
                    data={lossPieAmountData}
                  />
                </div>
              </div>

              {/* Another Card for Pie Chart and Bar Chart */}
              <div className="w-full max-w-full bg-white dark:bg-inherit dark:shadow-xl">
                <h2 className="text-xl p-2 mb-2 font-semibold text-[#3CBA9F]">
                  Frequency of Loss by Category
                </h2>
                <div className=" flex flex-col-reverse md:flex-row rounded-lg shadow-md p-4">
                  <BarChart data={lossPieCountData} />
                  <DoughnutChart
                    data={lossPieCountData}
                  />
                </div>
              </div>

              {/* Another Card for Codemix Words */}
              <div className="w-full flex flex-col bg-white rounded-lg dark:bg-inherit dark:shadow-xl">
              <h2 className="text-xl p-2 mb-2 font-semibold text-[#3CBA9F]">
                  Loss Amount by Codemix words
                </h2>
                <div className="p-4 rounded-lg shadow-md">
                  <BarChart data={CodemixWordsData} />
                </div>
              </div>
            </div>
        )}
      </div>
    </section>
  );
};

export default PerformanceStats;
