import { addMultipleGuests, checkInGuest, getGuests, updateGuestArrival } from "@/service/apiGuest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Query key factory
export const guestKeys = {
  all: ['guests'],
  lists: () => [...guestKeys.all, 'list'],
  details: (id) => [...guestKeys.all, 'detail', id],
};

// Get all guests
export function useGuests() {
  return useQuery({
    queryKey: guestKeys.lists(),
    queryFn: getGuests,
  });
}


// Update guest arrival status
export function useUpdateGuestArrival() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, arrived }) => updateGuestArrival(id, arrived),
    onSuccess: (updatedGuest) => {
      // Update the specific guest in the cache
      queryClient.setQueryData(guestKeys.details(updatedGuest.id), updatedGuest);
      toast.success("Guest status updated");
      // Invalidate and refetch the list to ensure consistency
      queryClient.invalidateQueries({ queryKey: guestKeys.lists() });
    },
  });
}

// Quick check-in mutation
export function useQuickCheckIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ identifier, method }) => checkInGuest(identifier, method),
    onSuccess: () => {
      // Invalidate the guests list to reflect the change
      queryClient.invalidateQueries({ queryKey: guestKeys.lists() });
    },
  });
}

export function useAddMultipleGuests() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (guestsArray) => addMultipleGuests(guestsArray),
    onSuccess: () => {
      // Invalidate and refetch the guests list
      queryClient.invalidateQueries({ queryKey: guestKeys.lists() });
    },
  });
}

