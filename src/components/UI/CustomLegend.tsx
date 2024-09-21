import React from 'react';
import { LegendProps } from 'recharts';

const CustomLegend: React.FC<LegendProps> = ({ payload }) => {
  if (!payload) {
    return null;
  }

  return (
    <div className="flex flex-col text-sm font-medium">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center mb-1">
          {/* Use the color from the payload */}
          <span
            className="w-4 h-4 inline-block mr-2"
            style={{ backgroundColor: entry.color }}
          ></span>
          {/* Apply lowercase and remove underscores */}
          <span style={{ color: entry.color }}>
            {entry.value.replace(/_/g, ' ').toLowerCase()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
