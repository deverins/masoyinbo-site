import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { API_URL } from '@/constants/api';
import { useTheme } from './themeContext';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface CodemixResponse {
  words: string;
  totalAmountLost: number;
}

const CodemixWordLossBarChart: React.FC = () => {
  const [codemixData, setCodemixData] = useState<CodemixResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/v1/api/get-performance-stats`);
        const totalCodemixResponses = data.stats.codemixData;
        setCodemixData(totalCodemixResponses);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Extract labels and data values
  const labels = codemixData.map((item) => item.words);
  const dataValues = codemixData.map((item) => item.totalAmountLost);

  const colorPalette = [
    '#884EA0', '#36A2EB', '#3CBA9F', '#c45850', '#FF9F40', '#4BC0C0', '#CB4335', '#1F618D', '#F1C40F', '#27AE60', '#A030F1', '#D35400',
  ];

  const backgroundColors = labels.map((_, index) => colorPalette[index % colorPalette.length]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Amount Lost',
        data: dataValues,
        backgroundColor: backgroundColors,
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
    <div className="w-full">
      {loading ? (
        <div className="flex justify-center items-center h-80"></div>
      ) : (
        <div
          ref={scrollRef}
          className="mt-16 mx-auto relative overflow-x-auto no-scrollbar"
          style={{ height: '400px', maxWidth: '100%', width: '80%' }}
        >
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default CodemixWordLossBarChart;
