// import React, { useState, useEffect } from 'react';
// import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell, Rectangle } from 'recharts';
// import { scaleLinear } from 'd3-scale';
// import axios from 'axios';
// import { API_URL } from '@/constants/api';

// interface CodemixWordLossData {
//   _id: string;
//   totalAmountLost: number;
// }

// export const CodemixWordLossBarChart: React.FC = () => {
//   const [codemixWordLossData, setCodemixWordLossData] = useState<CodemixWordLossData[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/v1/api/participant-performance`);
//         setCodemixWordLossData(response.data.codemixWordLoss);
//       } catch (error) {
//         setError('Error fetching data');
//       }
//     };

//     fetchData();
//   }, []);

//   if (!codemixWordLossData.every((item) => typeof item.totalAmountLost === 'number')) {
//     return <div>Error: Data format invalid</div>;
//   }

//   const colorScale = scaleLinear<string>()
//     .domain([0, Math.max(...codemixWordLossData.map((d) => d.totalAmountLost))])
//     .range(['#ff6666', '#00b4d8']);
//   const CustomActiveBar = (props: any) => {
//     const { x, y, width, height } = props;
//     return <Rectangle fill="#ff6666" stroke="blue" x={x} y={y} width={width} height={height} />;
//   };

//   return (
//     <div className="w-full max-w-sm mx-auto bg-red-700">
//       <ResponsiveContainer className='bg-red-600'>
//         <BarChart
//           data={codemixWordLossData}
//           className='mx-20 bg-red-600'
//           margin={{
//             top: 5,
//             right: 20,
//             left: 20,
//             bottom: 5,
//           }}
//           barSize={25}
//           barCategoryGap={0}
//         >
//           <XAxis dataKey="_id" tickFormatter={(value) => `${value}`} className='bg-red-500'/>
//           <YAxis tickFormatter={(value) => `${value}`} className='bg-red-600'/>
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="totalAmountLost" fill="#8884d8" activeBar={<CustomActiveBar />} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };
