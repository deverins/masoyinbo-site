import React, { useEffect, useId, useRef } from "react";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { ChartData } from "@/types";
import { generateColorVariation } from "@/utils/functions";

interface PieChartProps {
  data: ChartData[];
  title?: string;
  titleClassName?: string;
}

const DoughnutChart: React.FC<PieChartProps> = ({ data, titleClassName, title }) => {
  const chartInstanceRef = useRef<Chart<"doughnut"> | null>(null);
  const id = useId()

  useEffect(() => {
    // Register the required components for Doughnut chart
    Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

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
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
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
  }, [data]);

  return (
    <>
      {/* {title &&
        <h1 className=" mx-auto mt-10 text-xl font-semibold capitalize "> {title}</h1>
      } */}
      <div className=" mx-auto my-auto">
        <div className="w-full h-fit my-auto pb-2">
          <canvas id={`chatjsdoughnut-${id}`}></canvas>
        </div>
      </div>
    </>
  );
}

export default DoughnutChart;
