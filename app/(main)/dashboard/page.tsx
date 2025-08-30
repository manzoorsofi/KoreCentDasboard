"use client";

import React from "react";
import { Box } from "@mui/material";
import { PageHeader, PageContainer, SectionCard } from "@/components/ui";
import StatsCard from "@/components/dashboard/StatsCard";
import { People, PersonOutline, ShoppingCart } from "@mui/icons-material";
import { SWRProvider } from "@/components/providers";
import { useUsers } from "@/hooks";
import SearchInput from "@/components/table/SearchInput";
import DataTable, { type Column } from "@/components/table/DataTable";
import { type User } from "@/types";

function DashboardContent() {
  const { users, isLoading } = useUsers();
  const totalUsers = users.length || 0;
  const activeUsers = Math.round(totalUsers * 0.6);
  const totalOrders = totalUsers * 3;

  const [query, setQuery] = React.useState("");
  const [orderBy, setOrderBy] = React.useState<string>("name");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let data = users;
    if (q) {
      data = users.filter(u =>
        [u.name, u.email, u.phone, u.company?.name].some(v =>
          String(v ?? "")
            .toLowerCase()
            .includes(q)
        )
      );
    }
    data = [...data].sort((a: User, b: User) => {
      const aValue = (a as unknown as Record<string, unknown>)[orderBy];
      const bValue = (b as unknown as Record<string, unknown>)[orderBy];
      const av = String(aValue ?? "").toLowerCase();
      const bv = String(bValue ?? "").toLowerCase();
      if (av < bv) return order === "asc" ? -1 : 1;
      if (av > bv) return order === "asc" ? 1 : -1;
      return 0;
    });
    return data;
  }, [users, query, orderBy, order]);

  const paged = React.useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  const columns: Column<User>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "phone", label: "Phone" },
    {
      key: "company",
      label: "Company",
      sortable: true,
      render: u => u.company?.name,
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your product metrics"
      />
      <Box
        sx={{
          display: "grid",
          gap: { xs: 2, sm: 3 },
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
        }}
      >
        <Box>
          <StatsCard
            title="Total Users"
            value={totalUsers}
            loading={isLoading}
            icon={<People fontSize="large" />}
          />
        </Box>
        <Box>
          <StatsCard
            title="Active Users"
            value={activeUsers}
            loading={isLoading}
            icon={<PersonOutline fontSize="large" />}
          />
        </Box>
        <Box>
          <StatsCard
            title="Total Orders"
            value={totalOrders}
            loading={isLoading}
            icon={<ShoppingCart fontSize="large" />}
          />
        </Box>
                <Box>
          <StatsCard
            title="Total Items"
            value={activeUsers}
            loading={isLoading}
            icon={<ShoppingCart fontSize="large" />}
          />
        </Box>
      </Box>

      <Box mt={4}>
        <SectionCard title="Users">
          <Box mb={2}>
            <SearchInput placeholder="Search users..." onSearch={setQuery} />
          </Box>
          <DataTable<User>
            columns={columns}
            rows={paged}
            total={filtered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={size => {
              setRowsPerPage(size);
              setPage(0);
            }}
            orderBy={orderBy}
            order={order}
            onSort={key => {
              if (orderBy === key) {
                setOrder(prev => (prev === "asc" ? "desc" : "asc"));
              } else {
                setOrder("asc");
                setOrderBy(key);
              }
            }}
            emptyMessage={isLoading ? "Loading users..." : "No users found"}
          />
        </SectionCard>
      </Box>
    </PageContainer>
  );
}

export default function DashboardPage() {
  return (
    <SWRProvider>
      <DashboardContent />
    </SWRProvider>
  );
}
