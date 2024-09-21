import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { API_URL } from '@/constants/api';

interface ApiResponse {
  totalAmountWon: {
    QUESTION: { totalAmountWon: number; totalCorrectQuestions: number };
    QUESTION_NUMBER: { totalAmountWon: number; totalCorrectQuestions: number };
  };
  totalAmountLost: {
    QUESTION: { totalAmountLost: number; totalIncorrectQuestions: number };
    QUESTION_NUMBER: { totalAmountLost: number; totalIncorrectQuestions: number };
  };
  codemixWordLoss: { _id: string; totalAmountLost: number }[];
}

const PerformanceStatsPieChart: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/v1/api/participant-performance`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const correctAnswerData = [
    { name: 'Q', value: data?.totalAmountWon?.QUESTION?.totalAmountWon || 0 },
    { name: 'QN', value: data?.totalAmountWon?.QUESTION_NUMBER?.totalAmountWon || 0 },
  ];

  const incorrectAnswerData = [
    { name: 'Q', value: data?.totalAmountLost?.QUESTION?.totalAmountLost || 0 },
    { name: 'QN', value: data?.totalAmountLost?.QUESTION_NUMBER?.totalAmountLost || 0 },
  ];

  const codemixData = data?.codemixWordLoss?.map((word) => ({
    name: word._id,
    value: word.totalAmountLost,
  })) || [];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex flex-wrap">
      {/* Correct Answer Pie Chart */}
      <div className="w-full md:w-1/3 p-4">
        <h2 className="text-center mb-2">Correct Answers - Total Amount Won</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={correctAnswerData}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={renderLabel}
            labelLine={false}
          >
            {/* Apply background color to each segment using Cell */}
            {correctAnswerData.map((entry, index) => (
              <Cell key={`cell-correct-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Incorrect Answer Pie Chart */}
      <div className="w-full md:w-1/3 p-4">
        <h2 className="text-center mb-2">Incorrect Answers - Total Amount Lost</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={incorrectAnswerData}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={renderLabel}
            labelLine={false}
          >
            {/* Apply background color to each segment using Cell */}
            {incorrectAnswerData.map((entry, index) => (
              <Cell key={`cell-incorrect-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Codemix Loss Pie Chart */}
      <div className="w-full md:w-1/3 p-4">
        <h2 className="text-center mb-2">Codemix Losses</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={codemixData}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={renderLabel}
          >
            {/* Apply background color to each segment using Cell */}
            {codemixData.map((entry, index) => (
              <Cell key={`cell-codemix-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default PerformanceStatsPieChart;
