"use client";

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { ensureChartSetup } from "./ChartBase";
import type { ChartData, ChartOptions } from "chart.js";

type PieChartData = ChartData<"pie">;
type PieChartOptions = ChartOptions<"pie">;

export function PieChart({
  data,
  options,
}: {
  data: PieChartData;
  options?: PieChartOptions;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    ensureChartSetup();
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <div>Loading chart...</div>;
  }

  return <Pie data={data} options={options} />;
}

export default PieChart;
