import React from 'react';
import { PieChart as RechartsPieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import CustomLegend from '@/components/UI/CustomLegend';

interface PieChartProps {
  data: { name: string; value: number }[];
  title?: string;
  titleClassName?: string;
  currencySymbol?: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title, currencySymbol = '', titleClassName = '' }) => {
  const COLORS = ['#CB4335', '#1F618D', '#F1C40F', '#27AE60', '#884EA0', '#D35400'];
  const formatTooltip = (value: number, name: string) => {
    const formattedName = name.replace(/_/g, ' ').toLowerCase();
    return [`${formattedName}: ${currencySymbol}${value.toLocaleString()}`];
  };

  return (
    <div className="px-4">
      {title && (
        <h2 className={`text-xl font-bold mb-2 ${titleClassName}`}>
          {title}
        </h2>
      )}
      <RechartsPieChart width={350} height={350}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={({ value }) => `${currencySymbol}${value.toLocaleString()}`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={formatTooltip} />
        <Legend content={<CustomLegend />} wrapperStyle={{ paddingLeft: '10px' }} />
      </RechartsPieChart>
    </div>
  );
};

export default PieChart;