"use client";
import React from "react";
import {
  Undo2,
  AlertTriangle,
  Users,
  Clock,
  UserCheck,
  UserX,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGuests, useRevertGuestArrival } from "@/components/useGuest";
import { toast } from "sonner";
import Loading from "@/components/Loader";
import Guest from "./Guest";
import Link from "next/link";

function Error() {
  const { data: guests = [], isLoading, error } = useGuests();

  // Get recently arrived guests (last 30 minutes)
  const getRecentlyArrivedGuests = () => {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    return guests
      .filter((guest) => guest.arrived)
      .filter((guest) => new Date(guest.updated_at) > thirtyMinutesAgo)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  };

  const recentlyArrived = getRecentlyArrivedGuests();

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-8">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />
              <h1 className="text-4xl font-bold text-red-600">
                Check-in Correction Center
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Revert accidental guest check-ins and manage attendance
              corrections
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {guests.length}
                  </p>
                  <p className="text-gray-600">Total Guests</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <div className="flex items-center gap-3">
                <UserCheck className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {guests.filter((g) => g.arrived).length}
                  </p>
                  <p className="text-gray-600">Checked In</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
              <div className="flex items-center gap-3">
                <UserX className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {guests.filter((g) => !g.arrived).length}
                  </p>
                  <p className="text-gray-600">Not Checked In</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {recentlyArrived.length}
                  </p>
                  <p className="text-gray-600">Recent (30min)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Check-ins Section */}
          <div className="bg-white rounded-lg shadow-lg mb-8">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Clock className="h-6 w-6 text-orange-500" />
                Recent Check-ins (Last 30 Minutes)
              </h2>
              <p className="text-gray-600 mt-1">
                Quickly revert accidental check-ins from the recent period
              </p>
            </div>

            {recentlyArrived.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <UserCheck className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p>No recent check-ins in the last 30 minutes</p>
              </div>
            ) : (
              <div className="divide-y">
                {recentlyArrived.map((guest) => (
                  <div
                    key={guest.id}
                    className="p-6 flex items-center justify-between hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {guest.name}
                        </h3>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Checked In
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>
                          Access Code:{" "}
                          <code className="bg-gray-100 px-2 py-1 rounded">
                            {guest.access_code}
                          </code>
                        </span>
                        {guest.plus_ones > 0 && (
                          <span>+{guest.plus_ones} guest(s)</span>
                        )}
                        <span className="text-green-600">
                          Checked in at{" "}
                          {new Date(guest.updated_at).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => mutate(guest.id)}
                      disabled={isPending}
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      <Undo2 className="h-4 w-4 mr-2" />
                      {isPending ? "Reverting..." : "Revert Check-in"}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* All Checked-in Guests Section */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-500" />
                All Checked-in Guests
              </h2>
              <p className="text-gray-600 mt-1">
                Revert check-ins for any guest throughout the event
              </p>
            </div>

            {guests.filter((g) => g.arrived).length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <UserX className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p>No guests have checked in yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {guests
                  .filter((g) => g.arrived)
                  .sort(
                    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
                  )
                  .map((guest) => (
                    <Guest key={guest.id} guest={guest} />
                  ))}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">
              How to use this correction center:
            </h3>
            <ul className="text-blue-700 list-disc list-inside space-y-1">
              <li>
                Use the "Recent Check-ins" section for quick corrections of
                recent mistakes
              </li>
              <li>
                The "All Checked-in Guests" section shows everyone who has
                checked in
              </li>
              <li>Reverting a check-in will mark the guest as not arrived</li>
              <li>
                You can always check the guest back in using the main guest list
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Button className="absolute top-5 left-5">
        <Link href="/">
          <Home />
        </Link>
      </Button>
    </>
  );
}

export default Error;
