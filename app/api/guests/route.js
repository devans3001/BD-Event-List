import { guests } from "@/helper/data";



export async function GET() {
  return Response.json(guests);
}

export async function POST(request) {
  try {
    const { id, arrived } = await request.json();
    const updatedGuest = updateGuestArrival(parseInt(id), arrived);
    
    if (updatedGuest) {
      return Response.json(updatedGuest);
    }
    return Response.json({ error: 'Guest not found' }, { status: 404 });
  } catch (error) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}