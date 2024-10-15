import React, { useEffect, useId, useRef } from "react";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Title
} from "chart.js";
import { ChartData } from "@/types";
import { generateColorVariation } from "@/utils/functions";

interface PieChartProps {
  data: ChartData[];
  title?: string;
  titleClassName?: string;
  legendType: 'MANUAL' | 'DEFAULT'
}

const DoughnutChart: React.FC<PieChartProps> = ({ data, titleClassName, title, legendType = 'DEFAULT' }) => {
  const chartInstanceRef = useRef<Chart<"doughnut"> | null>(null);
  const id = useId()

  useEffect(() => {
    // Register the required components for Doughnut chart
    Chart.register(DoughnutController, ArcElement, Tooltip, Title);

    const canvas = document.getElementById(`chatjsdoughnut-${id}`) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // Example usage with your color codes
    const dynamicColors = generateColorVariation(data.map(d => d.color));

    // Destroy existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    // Create new chart
    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.map(d => d.name),
        datasets: [
          {
            data: data.map(d => d.value),
            borderColor: dynamicColors.map(color => color.borderColor),
            backgroundColor: dynamicColors.map(color => color.backgroundColor),
            borderWidth: 2,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: legendType == 'DEFAULT',
            position: 'right',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const item = data[tooltipItem.dataIndex];
                return item.label ? ' ' + item.label : ' ' + item.value + ''
              }
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
  }, [data, id]);

  return (
    <>
      {title &&
        <h1 className=" mx-auto mt-10 text-xl font-semibold capitalize "> {title}</h1>
      }
      <div className=" mx-auto flex items-center flex-col sm:flex-row gap-8 my-auto">
        <div className="w-48 h-48 mx-auto pb-2">
          <canvas id={`chatjsdoughnut-${id}`}></canvas>
        </div>
        {legendType == 'MANUAL' &&
          <div>
            {data.map((data, index) => (
              <div key={index} className="mb-1 flex-col justify-center items-end">
                <span className="w-4 inline-block h-3 mr-2" style={{ backgroundColor: data.color }}></span>
                <span className="text-sm text-[#000] dark:text-neutral-200">
                  {data.legendLabel}
                </span>
              </div>
            ))}
          </div>
        }
      </div>
    </>
  );
}

export default DoughnutChart;