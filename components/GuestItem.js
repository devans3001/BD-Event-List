'use client';

import { ClipLoader } from "react-spinners";
import { useUpdateGuestArrival } from "./useGuest";
import { TicketCheck, TicketX } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function GuestItem({ guest }) {


  const { mutate, isPending } = useUpdateGuestArrival();
  const handleStatusChange = (guestId, arrived) => {
    mutate({ id: guestId, arrived });
  };

  return (
    <div className={`p-3 md:p-6 rounded-lg border-2 transition-all duration-200 shadow-sm ${guest.arrived
        ? 'bg-green-50 border-green-200'
        : 'bg-white border-gray-200 hover:border-gray-300'
      }`}>
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <div className="flex items-center gap-1 md:gap-3 mb-2">
            <h3 className="font-semibold text-lg">{guest.name}</h3>
            {guest.arrived && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                CHECKED IN
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <span className="font-medium">Access Code:</span>
              <code className="bg-gray-100 px-2 py-1 rounded">{guest.access_code}</code>
            </span>
            {guest.plus_ones > 0 && (
              <span className="flex items-center gap-1">
                <span className="font-medium">Guests:</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">+{guest.plus_ones}</span>
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => handleStatusChange(guest.id, true)}
          disabled={isPending || guest.arrived}
          className={`px-3 md:px-6 py-1.5 rounded-lg font-medium transition-colors  ${guest.arrived
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isPending ? <ClipLoader size={16} /> : guest.arrived ? <TicketCheck /> : <TicketX />}
        </button>
      </div>

      {guest.arrived && (
        <div className="mt-3 pt-3 border-t border-green-200">
          <div className="text-green-600 text-sm font-medium flex items-center gap-2">
            ✅ Arrived{" "}
            {formatDistanceToNow(new Date(guest.updated_at), { addSuffix: true })}
          </div>
        </div>
      )}
    </div>
  );
}