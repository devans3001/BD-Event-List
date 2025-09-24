import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { AppWindowMac, ClipboardCheck } from "lucide-react"
import { useState } from "react"
import { useQuickCheckIn } from "./useGuest"
import { toast } from "sonner"

export function CheckDialog() {
  const quickCheckInMutation = useQuickCheckIn()
  const [checkInMethod, setCheckInMethod] = useState("name")
  const [quickCheckIn, setQuickCheckIn] = useState("")
   const [isOpen, setIsOpen] = useState(false)

const handleQuickCheckIn = () => {
  if (!quickCheckIn.trim()) return;

  quickCheckInMutation.mutate(
    { identifier: quickCheckIn, method: checkInMethod },
    {
      onSuccess: () => {
   
        toast.success("Guest checked in successfully!");
        setIsOpen(false)
        setQuickCheckIn(""); // optional: reset input
      },
      onError: (error) => {
        // ❌ Show toast error
        toast.error(error.message || "Something went wrong, try again.");
      },
    }
  );
};

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button >
          <AppWindowMac className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Quick Check-in</DialogTitle>
          <DialogDescription>
            Select method and enter details to check in a guest.
          </DialogDescription>
        </DialogHeader>

        {/* Toggle buttons */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={checkInMethod === "name" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setCheckInMethod("name")}
          >
            By Name
          </Button>
          <Button
            variant={checkInMethod === "code" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setCheckInMethod("code")}
          >
            By Access Code
          </Button>
        </div>

        {/* Input + submit */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={
              checkInMethod === "name"
                ? "Enter guest name..."
                : "Enter access code..."
            }
            value={quickCheckIn}
            onChange={(e) => setQuickCheckIn(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleQuickCheckIn()}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleQuickCheckIn}
            disabled={!quickCheckIn.trim() || quickCheckInMutation.isPending}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            {quickCheckInMutation.isPending ? "Checking..." : "Check In"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
