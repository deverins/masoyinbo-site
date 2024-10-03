import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '../hooks/themeContext';
import { ChartData } from '@/types';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DataProps {
 barchatData: ChartData[];
}

const BarChart: React.FC<DataProps> = ({barchatData}) => {
  const { theme } = useTheme();

  const scrollRef = useRef<HTMLDivElement>(null);


  const propData = useMemo(()=>{
    return {
      colors: barchatData.map(data=>data.color),
      labels: barchatData.map(data=>data.name),
      dataValues:  barchatData.map(data=>data.value),
    }
  }, [barchatData])
  const colorPalette = [
    '#884EA0', '#36A2EB', '#3CBA9F', '#c45850', '#FF9F40', '#4BC0C0', '#CB4335', '#1F618D', '#F1C40F', '#27AE60', '#A030F1', '#D35400',
  ];

  const data = {
    labels: propData.labels,
    datasets: [
      {
        label: 'Amount Lost',
        data: propData.dataValues,
        backgroundColor: propData.colors,
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme === 'dark' ? '#FFFFFF' : '#000000',
        },
        barPercentage: 0.9,
        categoryPercentage: 0.6,
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          color: theme === 'dark' ? '#FFFFFF' : '#000000',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `₦${tooltipItem.raw}`,
        },
        titleColor: theme === 'dark' ? '#FFFFFF' : '#000000',
        bodyColor: theme === 'dark' ? '#FFFFFF' : '#000000',
        backgroundColor: theme === 'dark' ? '#333333' : '#FFFFFF',
      },
    },
    animation: {
      duration: 500,
    },
  };

  // Function to auto-scroll back to the beginning
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollWidth, scrollLeft, clientWidth } = scrollRef.current;
      // Check if the user has reached the end of the scrollable area
      if (scrollLeft + clientWidth >= scrollWidth - 5) {
        // Scroll back to the start
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
        <div
          ref={scrollRef}
          className="mx-auto relative overflow-x-auto no-scrollbar"
          style={{ height: '300px', maxWidth: '100%' }}
        >
          <Bar data={data} options={options} />
        </div>
  );
};

export default BarChart;