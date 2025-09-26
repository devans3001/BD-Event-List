"use client";

import Loading from "@/components/Loader";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { useGuests } from "@/components/useGuest";
import { calculateTableStats } from "@/helper/data";
import {
  Users,
  UserCheck,
  UserX,
  Table,
  Percent,
  Calendar,
  Home,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TableOverview() {
  const [sortBy, setSortBy] = useState("tableNum"); // "tableNum", "totalGuests", "arrivedGuests", "completion"
  const [sortOrder, setSortOrder] = useState("asc");
  const { data: guests = [], isLoading } = useGuests();
  const tableStats = calculateTableStats(guests);
  //   console.log(tableStats)

  if (isLoading) return <Loading />;

  // Sort table stats
  const sortedTableStats = [...tableStats].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case "tableNum":
        aValue = a.tableNum === "No Table" ? Infinity : a.tableNum;
        bValue = b.tableNum === "No Table" ? Infinity : b.tableNum;
        break;
      case "totalGuests":
        aValue = a.totalGuests;
        bValue = b.totalGuests;
        break;
      case "arrivedGuests":
        aValue = a.arrivedGuests;
        bValue = b.arrivedGuests;
        break;
      case "completion":
        aValue = (a.arrivedGuests / a.totalGuests) * 100;
        bValue = (b.arrivedGuests / b.totalGuests) * 100;
        break;
      default:
        aValue = a.tableNum;
        bValue = b.tableNum;
    }

    if (sortOrder === "desc") {
      return bValue - aValue;
    }
    return aValue - bValue;
  });

  // Overall statistics
  const overallStats = {
    totalTables: tableStats.filter((t) => t.tableNum !== "No Table").length,
    totalGuests: tableStats.reduce((sum, table) => sum + table.totalGuests, 0),
    arrivedGuests: tableStats.reduce(
      (sum, table) => sum + table.arrivedGuests,
      0
    ),
    completionRate:
      (tableStats.reduce((sum, table) => sum + table.arrivedGuests, 0) /
        tableStats.reduce((sum, table) => sum + table.totalGuests, 0)) *
        100 || 0,
  };

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return "text-green-600 bg-green-100";
    if (percentage >= 50) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getStatusColor = (table) => {
    if (table.arrivedGuests === table.totalGuests)
      return "border-green-200 bg-green-50";
    if (table.arrivedGuests > 0) return "border-yellow-200 bg-yellow-50";
    return "border-gray-200 bg-white";
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Table className="h-10 w-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-indigo-600">
              Table Overview
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Monitor guest arrivals and seating arrangements
          </p>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
            <div className="flex items-center gap-3">
              <Table className="h-8 w-8 text-indigo-500" />
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {overallStats.totalTables + 1}
                </p>
                <p className="text-gray-600">Total Tables</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {overallStats.totalGuests}
                </p>
                <p className="text-gray-600">Total Guests</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <UserCheck className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {overallStats.arrivedGuests}
                </p>
                <p className="text-gray-600">Arrived Guests</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
            <div className="flex items-center gap-3">
              <Percent className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {overallStats.completionRate.toFixed(1)}%
                </p>
                <p className="text-gray-600">Completion Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sorting Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="tableNum">Table Number</option>
            <option value="totalGuests">Total Guests</option>
            <option value="arrivedGuests">Arrived Guests</option>
            <option value="completion">Completion %</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
          </button>

          <div className="text-sm text-gray-600 ml-auto">
            Showing {sortedTableStats.length} tables
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedTableStats.map((table) => {
            const completionPercentage =
              (table.arrivedGuests / table.totalGuests) * 100;

            return (
              <div
                key={table.tableNum}
                className={`p-6 rounded-xl shadow-md border-2 transition-all duration-200 hover:shadow-lg ${getStatusColor(
                  table
                )}`}
              >
                {/* Table Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Table className="h-5 w-5" />
                    Table {table.tableNum}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCompletionColor(
                      completionPercentage
                    )}`}
                  >
                    {completionPercentage.toFixed(0)}%
                  </span>
                </div>

                {/* Guest Statistics */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Seats:</span>
                    <span className="font-semibold">{table.totalGuests}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Arrived:</span>
                    <span className="font-semibold text-green-600">
                      {table.arrivedGuests}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Waiting:</span>
                    <span className="font-semibold text-orange-600">
                      {table.totalGuests - table.arrivedGuests}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="pt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Individual Guest Status */}
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      {table.arrivedCount} of {table.guestCount} parties arrived
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Tables Assigned Section */}
        {tableStats.find((t) => t.tableNum === "No Table") && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              <UserX className="h-5 w-5" />
              Guests Without Table Assignment
            </h3>
            <p className="text-yellow-700">
              {tableStats.find((t) => t.tableNum === "No Table")?.guestCount}{" "}
              guests (
              {tableStats.find((t) => t.tableNum === "No Table")?.totalGuests}{" "}
              people) haven't been assigned to a table yet.
            </p>
          </div>
        )}

        {/* Empty State */}
        {tableStats.length === 0 && (
          <div className="text-center py-12">
            <Table className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Table Assignments
            </h3>
            <p className="text-gray-500">
              Guests haven't been assigned to tables yet.
            </p>
          </div>
        )}
      </div>
      <Link href="/">
        <Button className="fixed top-5 left-5">
          <Home />
        </Button>
      </Link>

      <ScrollToTop />
    </>
  );
}
