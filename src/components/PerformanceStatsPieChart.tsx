import React, { useState, useMemo } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { lossCategoryColors } from '@/constants/api';
import { LossTypeKeys, Stats } from '@/types';
import DoughnutChart from './Doughnut';
import BarChart from './BarChart';
import { formatCurrency, formatType } from '@/utils/functions';
// import { assignColorsToWords } from '@/utils/functions';

const PerformanceStats: React.FC<Stats> = (stats) => {
  const [showStats, setShowStats] = useState(false);

  const lossPieAmountData = useMemo(() => {
    return stats.lossTypeData.map(data => ({
      name: data.type,
      value: Math.abs(data.totalAmountLost),
      color: lossCategoryColors[data.type as LossTypeKeys],
      label: ` ₦${Math.abs(data.totalAmountLost).toLocaleString()}`,
      legendLabel: `${formatType(data.type)} (₦${Math.abs(data.totalAmountLost).toLocaleString()})`,
    }));
  }, [stats]);

  const wonVsLossData = useMemo(() => {
    return {
      amount: [{
        name: "Amount Won",
        value: stats.totalAmountWon,
        color: "#3CBA9F",
        label: ` ₦${Math.abs(stats.totalAmountWon).toLocaleString()}`,
        legendLabel: `Amount Won (₦${Math.abs(stats.totalAmountWon).toLocaleString()})`,

      },
      {
        name: "Amount Lost",
        value: Math.abs(stats.totalAmountLost),
        color: "#c45850",
        label: ` ₦${Math.abs(stats.totalAmountLost).toLocaleString()}`,
        legendLabel: `Amount Loss (₦${Math.abs(stats.totalAmountLost).toLocaleString()})`,
      }],

      answers: [{
        name: "Correct Answers",
        value: stats.totalCorrectAnswers,
        color: "#3CBA9F",
        legendLabel: `Correct Answers (${stats.totalCorrectAnswers})`
      },
      {
        name: "Wrong Answers",
        value: stats.totalWrongAnswers,
        color: "#c45850",
        legendLabel: `Wrong Answers (${stats.totalWrongAnswers})`,
      }
      ]

    }
  }, [stats]);

  const lossPieCountData = useMemo(() => {
    return stats.lossTypeData.map(data => ({
      name: data.type,
      value: data.count,
      color: lossCategoryColors[data.type as LossTypeKeys],
      legendLabel: `${formatType(data.type)} (${data.count})`,
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
            {showStats ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
          </button>
        </div>

        {showStats && (
          <div>
            <div className="grid xl:grid-cols-2 gap-8">
              {/* Won And Loss Amounts Card */}
              <div className="w-full max-w-full dark:bg-inherit bg-white dark:shadow-xl">
                <h2 className="text-xl p-2 mb-2 font-semibold text-[#3CBA9F]">Won And Loss Amounts</h2>
                <div className="bg-white dark:bg-inherit flex flex-col md:flex-row rounded-lg shadow-md p-4">
                  <DoughnutChart data={wonVsLossData.amount} legendType="MANUAL" />
                </div>
              </div>

              {/* Correct And Wrong Answers Card */}
              <div className="w-full max-w-full dark:bg-inherit bg-white dark:shadow-xl">
                <h2 className="text-xl p-2 mb-2 font-semibold text-[#3CBA9F]">Correct And Wrong Answers</h2>
                <div className="bg-white dark:bg-inherit flex flex-col md:flex-row rounded-lg shadow-md p-4">
                  <DoughnutChart data={wonVsLossData.answers} legendType="MANUAL" />
                </div>
              </div>

              {/* Loss Amount by Category Card */}
              <div className="w-full max-w-full bg-white dark:bg-inherit dark:shadow-xl">
                <h2 className="text-xl p-2 mb-2 font-semibold text-[#3CBA9F]">Loss Amount by Category</h2>
                <div className="flex flex-col md:flex-row rounded-lg shadow-md p-4">
                  <BarChart data={lossPieAmountData} />
                  <DoughnutChart data={lossPieAmountData} legendType="MANUAL" />
                </div>
              </div>

              {/* Frequency of Loss by Category Card */}
              <div className="w-full max-w-full bg-white dark:bg-inherit dark:shadow-xl">
                <h2 className="text-xl p-2 mb-2 font-semibold text-[#3CBA9F]">Frequency of Loss by Category</h2>
                <div className="flex flex-col md:flex-row rounded-lg shadow-md p-4">
                  <BarChart data={lossPieCountData} />
                  <DoughnutChart data={lossPieCountData} legendType="MANUAL" />
                </div>
              </div>
            </div>

            {/* Mobile and Tablet View */}
            <div className="block mobile:hidden mt-16">
              <div className='flex justify-center w-full'>
                <h2 className="text-sm p-2 mb-2 font-semibold text-[#3CBA9F]">
                  Loss Amount by Codemix Words
                </h2>
              </div>
              <div className="p-4 rounded-lg justify-center">
                {stats.codemixData.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-4 rounded-lg shadow-md border-b border-gray-300 transition-all duration-500"
                  >
                    {/* Small screen columns */}
                    <div className="grid gap-4">
                      <div>
                        <h2 className="font-bold text-lg dark:text-neutral-200">Count</h2>
                        <p className="dark:text-neutral-300">{item.count}</p>
                      </div>
                      <div>
                        <h2 className="font-bold text-lg dark:text-neutral-200">Word</h2>
                        <span className="dark:text-neutral-300">{item.words}</span>
                      </div>
                      <div>
                        <h2 className="font-bold text-lg dark:text-neutral-200">Total Amount Lost</h2>
                        <p className="dark:text-neutral-300">{formatCurrency(Math.abs(item.totalAmountLost))}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* desktop View */}
            <div className="hidden mobile:block mt-16">
              <div className='flex justify-center w-full'>
                <h2 className="text-lg p-2 mb-2 font-semibold text-[#3CBA9F]">
                  Loss Amount by Codemix Words
                </h2>
              </div>
              <div className="flex justify-center w-full">
                <div className=" rounded-lg flex flex-col justify-between ">
                  {/* Header Row */}
                  <div className="grid grid-cols-4 gap-14 bg-gray-300 p-2 font-bold dark:bg-[rgba(255,255,255,0.1)] dark:bg-opacity-10 rounded-lg shadow-md max-w-full transition duration-300 dark:text-neutral-200">
                    <div className="col-span-1 w-[100px] text-center">Count</div>
                    <div className="col-span-1 w-[150px] text-center">Words</div>
                    <div className="col-span-1 w-[150px] text-center">Total Amount Lost</div>
                  </div>

                  {/* Data Rows */}
                  {stats.codemixData.map((item, index) => (
                    <div key={index} className="grid grid-cols-4 gap-14 py-4 mb-2 dark:text-neutral-300 rounded-lg shadow-md border-b border-gray-300">
                      <div className="col-span-1 w-[100px] text-center">{item.count}</div>
                      <div className="col-span-1 w-[150px] text-center flex items-center justify-center">
                        <span className="inline-block flex-none size-2 items-center" style={{ backgroundColor: item.color }} />
                        <span className="cap1stL">{item.words}</span>
                      </div>
                      <div className="col-span-1 w-[150px] text-center">{formatCurrency(Math.abs(item.totalAmountLost))}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default PerformanceStats;
