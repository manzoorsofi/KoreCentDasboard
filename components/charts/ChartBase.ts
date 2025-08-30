import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

let registered = false;

export function ensureChartSetup() {
  if (registered) return;

  try {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      BarElement,
      ArcElement,
      Title,
      Tooltip,
      Legend
    );
    registered = true;
  } catch (error) {
    console.error("Failed to register Chart.js components:", error);
  }
}

// Ensure registration happens immediately when this module is imported
if (typeof window !== "undefined") {
  ensureChartSetup();
}
