"use client";

import { useMemo } from "react";
import { useState } from "react";
import GuestItem from "./GuestItem";
import { useAddMultipleGuests, useGuests } from "./useGuest";
import Loading from "./Loader";
import { Button } from "./ui/button";
import { EyeClosed, Home, SearchX } from "lucide-react";
import { CheckDialog } from "./CheckDialog";
import { generateFakeUsers, guestss } from "@/helper/data";
import Link from "next/link";
import ScrollToTop from "./ScrollToTop";

export default function GuestList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'arrived', 'notArrived'

  const { data: guests = [], isLoading, error } = useGuests();
  const {mutate,isPending} = useAddMultipleGuests();
  

  // Derived counts
  const arrivedCount = guests?.filter((g) => g.arrived).length;
  const counts = {
    all: guests.length,
    arrived: arrivedCount,
    notArrived: guests.length - arrivedCount,
  };

  // Filtered guest list

const filteredGuests = useMemo(() => {
  return guests
    .filter((guest) => {
      const matchesSearch =
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.access_code.toLowerCase().includes(searchTerm.toLowerCase());

      if (filter === "arrived") return matchesSearch && guest.arrived;
      if (filter === "notArrived") return matchesSearch && !guest.arrived;
      return matchesSearch;
    })
    .sort((a, b) => {
      if (filter === "arrived") {
        return (
          new Date(b.updated_at).getTime() -
          new Date(a.updated_at).getTime()
        );
      }

       if (filter === "notArrived" || filter === "all") {
        // 🔹 Sort alphabetically by name
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
}, [guests, searchTerm, filter]); // only recompute if any of these change


  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">
          Error loading guests: {error.message}
        </div>
      </div>
    );
  }

  const filters = [
    { key: "all", label: "All Guests", color: "blue" },
    { key: "arrived", label: "Arrived", color: "green" },
    { key: "notArrived", label: "Not Arrived", color: "orange" },
  ];

  return (
    <>
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          🎉 Birthday Party Guest List
        </h1>
        <p className="text-gray-600">
          Manage guest arrivals for the special celebration
        </p>

        {/* Stats cards */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {filters.map((f) => (
            <div key={f.key} className={`p-4 rounded-lg bg-${f.color}-100`}>
              <p className={`font-bold text-2xl text-${f.color}-800`}>
                {counts[f.key]}
              </p>
              <p className={`text-${f.color}-500`}>{f.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6">
        <div className="flex md:flex-row flex-col gap-2 items-center">
          <input
            type="text"
            placeholder="Search by name or access code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center gap-2">

          <Button
            onClick={() => setSearchTerm("")}
            variant="outline"
            disabled={!searchTerm}
            className="cursor-pointer"
          >
            <SearchX />
          </Button>
          {/* <Button
            disabled={isPending}
            onClick={()=>mutate(generateFakeUsers(500))}
            >
            add - temp
          </Button> */}
          <CheckDialog />
            </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-gray-200 mt-5">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-6 py-1 font-medium border-b-2 cursor-pointer transition-colors ${
                filter === f.key
                  ? `border-${f.color}-500 text-${f.color}-600`
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Guest List */}
      <div className="space-y-4">
        {filteredGuests.map((guest) => (
          <GuestItem
            key={guest.id}
            guest={guest}
           
          />
        ))}

        {filteredGuests.length === 0 && (
          <div className="text-center p-8 text-gray-500 bg-white rounded-lg">
            {searchTerm
              ? "No guests found matching your search."
              : `No guests in the ${filter} category.`}
          </div>
        )}
      </div>
    </div>

    <Button className="fixed top-5 left-5">
      <Link href="/">
      <Home/>
      </Link>
    </Button>

    <ScrollToTop/>
    </>

  );
}
