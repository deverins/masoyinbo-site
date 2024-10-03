import { ChartData } from '@/types';
import React from 'react';
import { PieChart as RechartsPieChart, Pie, Tooltip, Cell } from 'recharts'; // Example icons

interface PieChartProps {
  data: ChartData[];
  title?: string;
  titleClassName?: string;
  currencySymbol?: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title, currencySymbol = '', titleClassName = '' }) => {
  const totalValue = data.reduce((sum, item) => sum + item.value, 0); 

  return (
    <>
     {title && (
        <h2 className={`text-xl font-bold mb-2 ${titleClassName}`}>
          {title}
        </h2>
      )}
      <div className=" grid sm:flex gap-1 items-center mx-auto">

        <div className="flex items-center justify-center">
          <RechartsPieChart width={200} height={200}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </RechartsPieChart>
        </div>

        <div className="flex text-sm sm:text-base flex-col dark:text-neutral-200 justify-center items-start pr-4">
          {data.map((entry, index) => (
            <div key={`label-${index}`} className="flex gap-2 items-center mb-2 ">
             <span className='inline-block flex-none w-5 h-3' style={{background: entry.color}}></span>
              <span className=" cap1stL ">{entry.name}</span>
              <span className="">{currencySymbol}{entry.value.toLocaleString()}</span>
              <span>({((entry.value / totalValue) * 100).toFixed(2)}%)</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PieChart;
