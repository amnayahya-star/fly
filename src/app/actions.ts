"use server";

import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

export async function getFlights() {
  return await prisma.flight.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function getHotels() {
  return await prisma.hotel.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function getDeals() {
  return await prisma.deal.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function lookupBooking(pnr: string, lastName: string) {
  // In a real app we'd check lastName too, but for simplicity we mock check PNR
  const booking = await prisma.booking.findUnique({
    where: { pnr: pnr.toUpperCase() },
    include: {
      flight: true,
      user: true
    }
  });

  return booking;
}

export async function signup(name: string, email: string, password: string) {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password // In a real app we would hash this using bcrypt
      }
    });
    await createSession({ id: user.id, email: user.email, role: user.role });
    return { success: true, user };
  } catch (error) {
    return { success: false, error: 'Email already exists or invalid data' };
  }
}

export async function login(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
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
    const flight = await prisma.flight.create({
      data: {
        airline: data.airline,
        logo: data.logo,
        departureTime: data.departureTime,
        arrivalTime: data.arrivalTime,
        duration: data.duration,
        from: data.from,
        to: data.to,
        price: data.price,
        type: data.type,
      }
    });
    return { success: true, flight };
  } catch (error) {
    return { success: false, error: 'Failed to add flight' };
  }
}

export async function getDashboardStats() {
  const users = await prisma.user.count();
  const flights = await prisma.flight.count();
  const hotels = await prisma.hotel.count();
  const deals = await prisma.deal.count();

  return { users, flights, hotels, deals };
}
