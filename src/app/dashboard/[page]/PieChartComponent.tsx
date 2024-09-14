"use client";

import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

interface PieChartComponentProps {
  carbs: number;
  fats: number;
  proteins: number;
  setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function PieChartComponent({
  carbs,
  fats,
  proteins,
  setSelectedValue,
}: PieChartComponentProps) {
  const data = {
    labels: ["Carbs", "Fats", "Proteins"],
    datasets: [
      {
        data: [carbs, fats, proteins],
        backgroundColor: ["#FFA500", "#800080", "#1E90FF"],
        hoverBackgroundColor: ["#FFA500", "#800080", "#1E90FF"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const label = data.labels[tooltipItem.dataIndex];
            const value = data.datasets[0].data[tooltipItem.dataIndex];
            return `${label} ${value}%`;
          },
        },
      },
    },
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const chartElementIndex = elements[0].index;
        const label = data.labels[chartElementIndex];
        const value = data.datasets[0].data[chartElementIndex];
        setSelectedValue(`${label} ${value}%`);
      }
    },
  };

  return (
    <div
      className="relative"
      style={{
        width: "266.34px",
        height: "174.62px",
        marginTop: "20px",
        marginLeft: "57px",
      }}
    >
      <Pie data={data} options={options} />
    </div>
  );
}
