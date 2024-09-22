import { API_URL } from '@/constants/api';
import PieChart from '@/hooks/PieChart';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

const PerformanceStats: React.FC = () => {
  const [lostAmountData, setLostAmountData] = useState<{ name: string; value: number }[]>([]);
  const [countData, setCountData] = useState<{ name: string; value: number }[]>([]);
  const [codemixWordData, setCodemixWordData] = useState<{ name: string; value: number }[]>([]);
  const [wonAmountData, setWonAmountData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/v1/api/participant-performance`);

        const lostAmountByType = response.data.totalAmounLostOnType;
        const totalCodemixResponses = response.data.totalCodemixResponses;
        const wonAmountByType = response.data.totalAmountWonOnType;

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

        setLoading(false);
      } catch (error) {
        console.error('Error fetching performance stats:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };

  return (
    <section className="py-4 mt-16">
      <div className="mx-4 px-4">
        <h2 className="text-center text-xl font-bold mb-10 text-[#FFCE56]">Performance Overview</h2>

        {loading ? (
          <div className="loader mt-20 mx-auto ease-linear rounded-full border-4 border-t-4 h-12 w-12 animate-spin" />
        ) : (
          <div className="flex overflow-x-auto no-scrollbar gap-8" ref={containerRef}>
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
            <div className="flex-shrink-0 bg-red-0 overflow-y-auto w-[350px] h-[350px] no-scrollbar">
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
        )}

        {/* Scroll Indicator */}
        {!loading && (
          <div className="flex justify-center mt-4 cursor-pointer" onClick={handleScrollRight}>
            <span className="text-xl text-secondary">
              <FaChevronRight />
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default PerformanceStats;
