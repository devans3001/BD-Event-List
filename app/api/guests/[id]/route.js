import { getGuestById, updateGuestArrival } from "@/helper/data";

export async function GET(request, { params }) {
  const guest = getGuestById(parseInt(params.id));
  if (guest) {
    return Response.json(guest);
  }
  return Response.json({ error: 'Guest not found' }, { status: 404 });
}

export async function PUT(request, { params }) {
  try {
    const { arrived } = await request.json();
    const updatedGuest = updateGuestArrival(parseInt(params.id), arrived);
    
    if (updatedGuest) {
      return Response.json(updatedGuest);
    }
    return Response.json({ error: 'Guest not found' }, { status: 404 });
  } catch (error) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}