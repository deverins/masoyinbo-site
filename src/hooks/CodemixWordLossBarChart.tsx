import React, { useState, useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell, Rectangle } from 'recharts';
import { scaleLinear } from 'd3-scale';
import axios from 'axios';
import { API_URL } from '@/constants/api';

interface CodemixWordLossData {
  _id: string;
  totalAmountLost: number;
}

export const CodemixWordLossBarChart: React.FC = () => {
  const [codemixWordLossData, setCodemixWordLossData] = useState<CodemixWordLossData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/v1/api/participant-performance`);
        console.log('responseData', response.data.codemixWordLoss);
        setCodemixWordLossData(response.data.codemixWordLoss);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!codemixWordLossData.every((item) => typeof item.totalAmountLost === 'number')) {
    return <div>Error: Data format invalid</div>;
  }

  const colorScale = scaleLinear<string>()
    .domain([0, Math.max(...codemixWordLossData.map((d) => d.totalAmountLost))])
    .range(['#ff6666', '#00b4d8']);
  const CustomActiveBar = (props: any) => {
    const { fill, x, y, width, height } = props;
    return <Rectangle fill="pink" stroke="blue" x={x} y={y} width={width} height={height} />;
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={codemixWordLossData}
          className='mx-20'
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
          barSize={25}
          barCategoryGap={0}
        >
          <XAxis dataKey="_id" tickFormatter={(value) => `${value}`} />
          <YAxis tickFormatter={(value) => `${value}`} />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalAmountLost" fill="#8884d8" activeBar={<CustomActiveBar />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
