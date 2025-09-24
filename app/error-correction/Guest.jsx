"use client";
import { Button } from "@/components/ui/button";
import { useRevertGuestArrival } from "@/components/useGuest";
import { useViewport } from "@/components/useView";
import { Undo2 } from "lucide-react";
import React from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

function Guest({ guest }) {
  const { mutate, isPending } = useRevertGuestArrival();

  const { width, sm } = useViewport();
  return (
    <div
      key={guest.id}
      className="p-6 flex items-center justify-between hover:bg-gray-50"
    >
      <div className="flex-1">
        <div className="flex items-center gap-1 md:gap-3 mb-2">
          <h3 className="font-semibold text-lg text-gray-800">{guest.name}</h3>
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
          {guest.plus_ones > 0 && <span>+{guest.plus_ones} guest(s)</span>}
          <span className="text-green-600">
            Checked in at {new Date(guest.updated_at).toLocaleTimeString()}
          </span>
        </div>
      </div>

      <Button
        onClick={() =>
          mutate(guest.id, {
            onSuccess: () => {
              toast.success("Reverted Successfuly");
            },
          })
        }
        disabled={isPending}
        variant="outline"
        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
      >
        {isPending ? (
          <ClipLoader />
        ) : (
          <>
            <Undo2 className="h-4 w-4 mr-2" />

           {sm && <span>Revert Check-in</span>}
          </>
        )}
      </Button>
    </div>
  );
}

export default Guest;
