import React, { useState, useMemo } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { lossCategoryColors } from '@/constants/api';
import { LossTypeKeys, Stats } from '@/types';
import DoughnutChart from './Doughnut';
import BarChart from './BarChart';
import { assignColorsToWords } from '@/utils/functions';

const PerformanceStats: React.FC<Stats> = (stats) => {

  const [showStats, setShowStats] = useState(false);
  // "₦"
  const lossPieAmountData = useMemo(() => {
    return stats.lossTypeData.map(data => {
      return {
        name: data.type,
        value: Math.abs(data.totalAmountLost),
        color: lossCategoryColors[data.type as LossTypeKeys],
        isMonetary: true
      }
    })
  }, [stats])
  const wonVsLossData = useMemo(() => {
    return [
      {
        name: "Amount Won",
        value: stats.totalAmountWon,
        color: "#3CBA9F",
        isMonetary: true
      },
      {
        name: "Amount Lost",
        value: Math.abs(stats.totalAmountLost),
        color: "#c45850",
        isMonetary: true
      },
    ];
  }, [stats]);
  const correctVsWrongAnswersData = useMemo(() => {
    return [
      {
        name: "Correct Answers",
        value: stats.totalCorrectAnswers,
        color: "#3CBA9F",
        isMonetary: false
      },
      {
        name: "Wrong Answers",
        value: stats.totalWrongAnswers,
        color: "#c45850",
        isMonetary: false
      },
    ];
  }, [stats]);

  const lossPieCountData = useMemo(() => {
    return stats.lossTypeData.map(data => {
      return { name: data.type, value: data.count, color: lossCategoryColors[data.type as LossTypeKeys], isMonetary: false }
    })
  }, [stats])
  
  const CodemixWordsData = useMemo(() => {
    const wordsWithColors = assignColorsToWords(stats.codemixData);
    return wordsWithColors.map(data => ({
      name: data.words,
      value: Math.abs(data.totalAmountLost),
      color: data.color,
      isMonetary: true
    }));
  }, [stats]);



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
            {showStats ? <FaChevronDown className="ml-2" /> : <FaChevronUp className="ml-2" />}
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
            {/* Another Card for Pie Chart   Won And Loss Amounts*/}
            <div className="w-full max-w-full dark:bg-inherit bg-white dark:shadow-xl">
              <h2 className="text-xl p-2 mb-2 font-semibold text-[#3CBA9F]">
                Won And Loss Amounts
              </h2>
              <div className=" bg-white dark:bg-inherit flex flex-col-reverse md:flex-row rounded-lg shadow-md p-4">
                <DoughnutChart
                  data={wonVsLossData}
                />
              </div>
            </div>

            {/* Another Card for Pie Chart   Correct And Wrong Answers*/}
            <div className="w-full max-w-full dark:bg-inherit bg-white dark:shadow-xl">
              <h2 className="text-xl p-2 mb-2 font-semibold text-[#3CBA9F]">
                Correct And Wrong Answers
              </h2>
              <div className="bg-white dark:bg-inherit flex flex-col-reverse md:flex-row rounded-lg shadow-md p-4">
                <DoughnutChart
                  data={correctVsWrongAnswersData}
                />
              </div>
            </div>

            {/* Another Card for Codemix Words */}
            <div className="w-full bg-white rounded-lg dark:bg-inherit dark:shadow-xl">
              <h2 className="text-xl p-2 mb-2 font-semibold text-[#3CBA9F]">
                Loss Amount by Codemix words
              </h2>
              <div className="p-4 rounded-lg shadow-md  ">
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
