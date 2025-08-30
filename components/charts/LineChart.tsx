"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { ensureChartSetup } from "./ChartBase";

type ChartProps = {
  data: any;
  options?: any;
};

export function LineChart({ data, options }: ChartProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    ensureChartSetup();
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <div>Loading chart...</div>;
  }

  return (
    <Line
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: "top" },
          tooltip: { enabled: true },
        },
        ...options,
      }}
    />
  );
}

export default LineChart;
