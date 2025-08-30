"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
  Box,
  Typography,
} from "@mui/material";

type Order = "asc" | "desc";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: "left" | "right" | "center";
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (size: number) => void;
  orderBy?: string;
  order?: Order;
  onSort?: (key: string) => void;
  emptyMessage?: string;
}

export function DataTable<T extends object>({
  columns,
  rows,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  orderBy,
  order = "asc",
  onSort,
  emptyMessage = "No data",
}: DataTableProps<T>) {
  return (
    <Paper
      elevation={0}
      sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2 }}
    >
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table size="medium" stickyHeader aria-label="data table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {columns.map(col => {
                const isSortable = !!col.sortable && !!onSort;
                const active = isSortable && orderBy === col.key;
                return (
                  <TableCell key={String(col.key)} align={col.align ?? "left"}>
                    {isSortable ? (
                      <TableSortLabel
                        active={!!active}
                        direction={active ? order : "asc"}
                        onClick={() => onSort?.(String(col.key))}
                      >
                        {col.label}
                      </TableSortLabel>
                    ) : (
                      col.label
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Box py={3} textAlign="center">
                    <Typography variant="body2" color="text.secondary">
                      {emptyMessage}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, idx) => (
                <TableRow
                  hover
                  key={idx}
                  sx={{ "&:hover": { bgcolor: "action.hover" } }}
                >
                  {columns.map(col => (
                    <TableCell
                      key={String(col.key)}
                      align={col.align ?? "left"}
                    >
                      {col.render
                        ? col.render(row)
                        : (row[col.key as keyof T] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(_e, newPage) => onPageChange(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={e =>
          onRowsPerPageChange(parseInt(e.target.value, 10))
        }
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Paper>
  );
}

export default DataTable;
