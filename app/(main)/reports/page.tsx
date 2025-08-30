"use client";

import React from "react";
import { Box, Tabs, Tab, TextField } from "@mui/material";
import { PageContainer, PageHeader, SectionCard } from "@/components/ui";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";

function generateSeries(length: number, factor = 1) {
  return Array.from({ length }, (_, i) =>
    Math.round((Math.sin(i / 2) + 1) * 50 * factor + Math.random() * 20)
  );
}

export default function ReportsPage() {
  const [tab, setTab] = React.useState<number>(0);
  const [from, setFrom] = React.useState<string>("");
  const [to, setTo] = React.useState<string>("");

  const labels = React.useMemo(() => {
    if (tab === 0) return Array.from({ length: 7 }, (_, i) => `D${i + 1}`);
    if (tab === 1) return Array.from({ length: 4 }, (_, i) => `W${i + 1}`);
    return Array.from({ length: 12 }, (_, i) => `M${i + 1}`);
  }, [tab]);

  const lineData = React.useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Users",
          data: generateSeries(
            labels.length,
            tab === 0 ? 0.8 : tab === 1 ? 1.5 : 2
          ),
          borderColor: "#1976d2",
          backgroundColor: "rgba(25,118,210,0.2)",
          tension: 0.4,
          fill: true,
        },
      ],
    }),
    [labels, tab, from, to]
  );

  const barData = React.useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Orders",
          data: generateSeries(
            labels.length,
            tab === 0 ? 1 : tab === 1 ? 1.2 : 1.5
          ),
          backgroundColor: "rgba(220,0,78,0.7)",
        },
      ],
    }),
    [labels, tab, from, to]
  );

  const handleTabChange = (_event: unknown, newValue: number) => {
    setTab(newValue);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Reports"
        subtitle="Explore your trends and analytics"
      />

      <SectionCard title="Filters">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            type="date"
            label="From"
            value={from}
            onChange={e => setFrom(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="small"
            sx={{ flex: "1 1 200px", minWidth: 150 }}
          />
          <TextField
            type="date"
            label="To"
            value={to}
            onChange={e => setTo(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="small"
            sx={{ flex: "1 1 200px", minWidth: 150 }}
          />
          <Box sx={{ flex: "2 1 300px", minWidth: 200 }}>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              aria-label="Report view tabs"
              textColor="primary"
              indicatorColor="primary"
              variant="fullWidth"
            >
              <Tab label="Daily" />
              <Tab label="Weekly" />
              <Tab label="Monthly" />
            </Tabs>
          </Box>
        </Box>
      </SectionCard>

      <SectionCard title="Order Trends (Bar)" sx={{ mt: 3 }}>
        <Box sx={{ height: 400 }}>
          <BarChart data={barData as any} />
        </Box>
      </SectionCard>
      <SectionCard title="User Trends (Line)" sx={{ mt: 3 }}>
        <Box sx={{ height: 400 }}>
          <LineChart data={lineData as any} />
        </Box>
      </SectionCard>
    </PageContainer>
  );
}
