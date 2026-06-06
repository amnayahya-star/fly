"use server";

import { db } from "@/lib/db";
import { createSession, getSession } from "@/lib/auth";

export async function getFlights() {
  return await db.getFlights();
}

export async function getFlightById(id: string) {
  return await db.getFlightById(id);
}

export async function createBooking(flightId: string) {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      return { success: false, error: 'Unauthorized' };
    }

    const pnr = 'AERO-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    await db.createBooking({
      pnr,
      userId: session.user.id,
      flightId
    });
    
    return { success: true, pnr };
  } catch (error) {
    return { success: false, error: 'Failed to create booking' };
  }
}

export async function getHotels() {
  return await db.getHotels();
}

export async function getDeals() {
  return await db.getDeals();
}

export async function lookupBooking(pnr: string, lastName: string) {
  // In a real app we'd check lastName too, but for simplicity we mock check PNR
  const booking = await db.lookupBooking(pnr);
  return booking;
}

export async function signup(name: string, email: string, password: string) {
  try {
    const existing = await db.getUserByEmail(email);
    if (existing) {
      return { success: false, error: 'Email already exists or invalid data' };
    }

    const user = await db.createUser({
      name,
      email,
      password // In a real app we would hash this using bcrypt
    });
    await createSession({ id: user.id, email: user.email, role: user.role });
    return { success: true, user };
  } catch (error) {
    return { success: false, error: 'Email already exists or invalid data' };
  }
}

export async function login(email: string, password: string) {
  try {
    const user = await db.getUserByEmail(email);
    if (!user || user.password !== password) {
      return { success: false, error: 'Invalid email or password' };
    }
    await createSession({ id: user.id, email: user.email, role: user.role });
    return { success: true, user };
  } catch (error) {
    return { success: false, error: 'Login failed' };
  }
}

export async function addFlight(data: any) {
  try {
    const flight = await db.addFlight({
      airline: data.airline,
      logo: data.logo,
      departureTime: data.departureTime,
      arrivalTime: data.arrivalTime,
      duration: data.duration,
      from: data.from,
      to: data.to,
      price: data.price,
      type: data.type,
    });
    return { success: true, flight };
  } catch (error) {
    return { success: false, error: 'Failed to add flight' };
  }
}

export async function getDashboardStats() {
  const users = await db.getUserCount();
  const flights = await db.getFlightCount();
  const hotels = await db.getHotelCount();
  const deals = await db.getDealCount();

  return { users, flights, hotels, deals };
}

export async function getRecentBookings() {
  return await db.getRecentBookings(5);
}

export async function getAllBookings() {
  return await db.getAllBookings();
}

export async function deleteFlight(id: string) {
  try {
    await db.deleteFlight(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete flight' };
  }
}

export async function deleteHotel(id: string) {
  try {
    await db.deleteHotel(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete hotel' };
  }
}

export async function deleteDeal(id: string) {
  try {
    await db.deleteDeal(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete deal' };
  }
}

export async function deleteBooking(id: string) {
  try {
    await db.deleteBooking(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete booking' };
  }
}

export async function addHotel(data: any) {
  try {
    const hotel = await db.addHotel({
      name: data.name,
      location: data.location,
      image: data.image,
      price: data.price,
      rating: parseFloat(data.rating),
      reviews: parseInt(data.reviews),
      amenities: data.amenities
    });
    return { success: true, hotel };
  } catch (error) {
    return { success: false, error: 'Failed to add hotel' };
  }
}

export async function addDeal(data: any) {
  try {
    const deal = await db.addDeal({
      title: data.title,
      description: data.description,
      image: data.image,
      originalPrice: data.originalPrice,
      discountPrice: data.discountPrice,
      tag: data.tag,
      expiresIn: data.expiresIn,
      type: data.type
    });
    return { success: true, deal };
  } catch (error) {
    return { success: false, error: 'Failed to add deal' };
  }
}
