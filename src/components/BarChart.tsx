import React, { useEffect, useId, useRef } from "react";
import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { ChartData } from "@/types";
import { generateColorVariation } from "@/utils/functions";
import { useTheme } from "@/hooks/themeContext";

interface BarChartProps {
  data: ChartData[];
  title?: string;
  titleClassName?: string;
  legend?: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, titleClassName, legend, title }) => {
  const { theme } = useTheme();
  const chartInstanceRef = useRef<Chart | null>(null);
  const id = useId(); // Generate a unique ID

  useEffect(() => {
    // Register the required components for bar chart
    Chart.register(BarController, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const canvas = document.getElementById(`chartjsbar-${id}`) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // Destroy existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    // Generate dynamic colors based on data
    const dynamicColors = generateColorVariation(data.map(d => d.color));

    // Create new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(d => d.name),
        datasets: [
          {
            data: data.map(d => d.value),
            borderColor: dynamicColors.map(color => color.borderColor),
            backgroundColor: dynamicColors.map(color => color.backgroundColor),
            borderWidth: 2,
            label: legend,
            maxBarThickness: 80,
            categoryPercentage: 1.0, // Tighter packing of bars
            barPercentage: 0.3 // Adjust bar spacing
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Control height dynamically
        plugins: {
          title: {
            display: !!title,
            text: title
          },
          legend: {
            display: !!legend, // Show legend only if legend prop is provided
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const item = data[tooltipItem.dataIndex];
                return item.label ? ' ' + item.label : ' ' + item.value + '';
              },
            },
          },
        },
        // Adjust styling based on the current theme
        scales: {
          x: {
            ticks: {
              color: theme === 'dark' ? 'rgba(229, 231, 235, 1)' : '#000',
            }
          },
          y: {
            ticks: {
              color: theme === 'dark' ? 'rgba(229, 231, 235, 1)' : '#000',
            }
          }
        }
      }
    });

    // Clean up function to destroy chart when component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [data, id, legend, title, theme]); // Add theme as a dependency

  return (
    <>
      {title && (
        <h1 className={`mx-auto mt-10 text-xl font-semibold capitalize ${titleClassName}`}>
          {title}
        </h1>
      )}
      <div className="max-w-full my-auto">
        <canvas id={`chartjsbar-${id}`}></canvas>
      </div>
    </>
  );
};

export default BarChart;