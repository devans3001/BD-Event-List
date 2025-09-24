import { toast } from "sonner";
import {supabase} from "./supabase";


export async function getGuests() {
  const { data, error } = await supabase.from("guests").select("*");
  if (error) throw new Error("Failed to fetch data");

  return data;
}

// Update guest arrival status
export async function updateGuestArrival(id, arrived) {
  const { data, error } = await supabase
    .from('guests')
    .update({ arrived, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Check in guest by name or access code
export async function checkInGuest(identifier, method) {

    console.log(identifier,"api")
    console.log(method,"method")
  let query = supabase.from('guests').select('*');
  
  if (method === 'name') {
    query = query.ilike('name', identifier);
  } else {
    query = query.eq('access_code', identifier);
  }

  const { data: guests, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  if (!guests || guests.length === 0) {
    throw new Error('Guest not found');
  }

  if (guests.length > 1) {
    throw new Error('Multiple guests found. Please use access code for precise check-in.');
  }

  const guest = guests[0];
  
  if (guest.arrived) {
    toast('Guest already checked in');
  }

  // Update the guest
  const { data: updatedGuest, error: updateError } = await supabase
    .from('guests')
    .update({ arrived: true, updated_at: new Date().toISOString() })
    .eq('id', guest.id)
    .select()
    .single();

  if (updateError) {
    throw new Error(updateError.message);
  }

  return updatedGuest;
}


// add guest - temp
export async function addMultipleGuests(guestsArray) {
  const { data, error } = await supabase
    .from('guests')
    .insert(guestsArray)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}