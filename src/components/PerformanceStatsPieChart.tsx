import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import PieChart from '@/hooks/PieChart';
import { API_URL } from '@/constants/api';
import CodemixWordLossBarChart from '@/hooks/CodemixWordLossBarChart';

const PerformanceStats: React.FC = () => {
  const [lostAmountData, setLostAmountData] = useState<{ name: string; value: number }[]>([]);
  const [countData, setCountData] = useState<{ name: string; value: number }[]>([]);
  const [codemixWordData, setCodemixWordData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/v1/api/get-performance-stats`);
        console.log("API Response:", data);
  
        const lostAmountByType = data.stats.lossTypeData;
        const totalCodemixResponses = data.stats.codemixData;
  
        const formattedLostAmountData = lostAmountByType.map((item: any) => ({
          name: item.type,
          value: item.totalAmountLost,
        }));
  
        const formattedCountData = lostAmountByType.map((item: any) => ({
          name: item.type,
          value: item.count,
        }));
  
        const formattedCodemixWordData = totalCodemixResponses.map((item: any) => ({
          name: item.words,
          value: item.totalAmountLost,
        }));
  
        setLostAmountData(formattedLostAmountData);
        setCountData(formattedCountData);
        setCodemixWordData(formattedCodemixWordData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching performance stats:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const handleToggle = () => setShowStats(!showStats);

  return (
    <section className="py-4 mt-16">
      <div className="mx-4 px-4">
        <div className=' flex justify-center'>
          <button
            onClick={handleToggle}
            className="mb-4 p-2 bg-primary-light dark:bg-[rgba(255,255,255,0.1)] dark:backdrop-blur-lg dark:bg-opacity-10 shadow-md max-w-full overflow-hidden transition duration-300 pb-2 text-white rounded flex items-center justify-center"
          >
            {showStats ? 'Collapse Statistics' : 'View Statistics Performance'}
            {showStats ? <FaChevronDown className="ml-2" /> : <FaChevronRight className="ml-2" />}
          </button>
        </div>

        {showStats && (
          <div className="flex flex-col lg:flex-wrap gap-8">
            {/* Desktop / Tablet Layout */}
            <div className="flex flex-wrap lg:w-full gap-8">
              {/* First Pie Chart - Amount Lost by Type */}
              <div className="w-full sm:w-1/2 lg:w-1/2">
                <PieChart
                  data={lostAmountData}
                  title="Amount Lost by Type"
                  currencySymbol="₦"
                  titleClassName="text-center text-sm font-semibold mb-2 text-[#3CBA9F]"
                />
              </div>

              {/* Bar Chart - Amount Lost by Type */}
              <div className="w-full sm:w-1/2 lg:w-1/2">
                <CodemixWordLossBarChart />
              </div>
            </div>

            <div className="flex flex-wrap lg:w-full gap-8">
              {/* Second Pie Chart - Count by Type */}
              <div className="w-full sm:w-1/2 lg:w-1/2">
                <PieChart
                  data={countData}
                  title="Count by Type"
                  currencySymbol=""
                  titleClassName="text-center text-sm font-semibold mb-2 text-[#36A2EB]"
                />
              </div>
            </div>

            {/* Third Pie Chart and Bar Chart for Codemix Words */}
            <div className="flex flex-wrap lg:w-full gap-8">
              <div className="w-full sm:w-1/2 lg:w-1/2">
                <PieChart
                  data={codemixWordData}
                  title="Amount Lost by Codemix Words"
                  currencySymbol="₦"
                  titleClassName="text-center text-sm font-semibold mb-2 text-[#FFCE56]"
                />
              </div>

              {/* Bar Chart - Codemix Words */}
              <div className="w-full sm:w-1/2 lg:w-1/2">
                <CodemixWordLossBarChart />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PerformanceStats;
