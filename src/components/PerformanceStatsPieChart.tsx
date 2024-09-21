import { API_URL } from '@/constants/api';
import PieChart from '@/hooks/PieChart';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

const PerformanceStats: React.FC = () => {
  const [lostAmountData, setLostAmountData] = useState<{ name: string; value: number }[]>([]);
  const [countData, setCountData] = useState<{ name: string; value: number }[]>([]);
  const [codemixWordData, setCodemixWordData] = useState<{ name: string; value: number }[]>([]);
  const [wonAmountData, setWonAmountData] = useState<{ name: string; value: number }[]>([]); // For totalAmountWonOnType

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/v1/api/participant-performance`);

        const lostAmountByType = response.data.totalAmounLostOnType;
        const totalCodemixResponses = response.data.totalCodemixResponses;
        const wonAmountByType = response.data.totalAmountWonOnType;

        // Formatting data for the pie charts
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

        const formattedWonAmountData = wonAmountByType.map((item: any) => ({
          name: item.type,
          value: item.totalAmountLost,
        }));

        setLostAmountData(formattedLostAmountData);
        setCountData(formattedCountData);
        setCodemixWordData(formattedCodemixWordData);
        setWonAmountData(formattedWonAmountData);

      } catch (error) {
        console.error('Error fetching performance stats:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-4 mt-16">
      <div className="mx-8 px-4">
        <h2 className='text-center text-xl font-bold mb-10 text-[#FFCE56]'>Performance Overview</h2>
        <div className="flex overflow-x-auto no-scrollbar gap-8">
          {/* First Pie Chart - Amount Lost by Type */}
          <div className="flex-shrink-0">
            <PieChart
              data={lostAmountData}
              title="Amount Lost by Type"
              currencySymbol="₦"
              titleClassName="text-center text-sm font-semibold mb-2 text-[#3CBA9F]"
            />
          </div>
          {/* Second Pie Chart - Amount Won by Type */}
          <div className="flex-shrink-0">
            <PieChart
              data={wonAmountData}
              title="Amount Won by Type"
              currencySymbol="₦"
              titleClassName="text-center text-sm font-semibold mb-2 text-[#8E5EA2]"
            />
          </div>

          {/* Third Pie Chart - Amount Lost by Codemix Words */}
          <div className="flex-shrink-0">
            <PieChart
              data={codemixWordData}
              title="Amount Lost by Codemix Words"
              currencySymbol="₦"
              titleClassName="text-center text-sm font-semibold mb-2 text-[#FFCE56]"
            />
          </div>

          {/* Fourth Pie Chart - Count by Type */}
          <div className="flex-shrink-0">
            <PieChart
              data={countData}
              title="Count by Type"
              currencySymbol=""
              titleClassName="text-center text-sm font-semibold mb-2 text-[#36A2EB]"
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-4">
          <span className="text-xl text-secondary">
            <FaChevronRight />
          </span>
        </div>
      </div>
    </section>
  );
};

export default PerformanceStats;
