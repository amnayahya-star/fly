import fs from 'fs';
import path from 'path';

// Define TS Interfaces matching Prisma Models
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Flight {
  id: string;
  airline: string;
  logo: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  from: string;
  to: string;
  price: string;
  type: string;
  delay: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  amenities: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  type: string;
  image: string;
  originalPrice: string;
  discountPrice: string;
  tag: string;
  expiresIn: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  pnr: string;
  userId: string;
  flightId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  flight?: Flight;
}

interface DatabaseSchema {
  users: User[];
  flights: Flight[];
  hotels: Hotel[];
  deals: Deal[];
  bookings: Booking[];
}

const dbFilePath = path.join(process.cwd(), 'db.json');

// Helper to read database
function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(dbFilePath)) {
      // In case db.json is missing, initialize with basic structure
      const initialDb: DatabaseSchema = {
        users: [
          {
            id: "user-1",
            name: "Ali Ahmed",
            email: "ali@example.com",
            password: "hashedpassword123",
            role: "USER",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: "user-admin",
            name: "Super Admin",
            email: "admin@aero.com",
            password: "password123",
            role: "ADMIN",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ],
        flights: [],
        hotels: [],
        deals: [],
        bookings: []
      };
      fs.writeFileSync(dbFilePath, JSON.stringify(initialDb, null, 2), 'utf-8');
      return initialDb;
    }

    const data = fs.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to read JSON database:", error);
    return { users: [], flights: [], hotels: [], deals: [], bookings: [] };
  }
}

// Helper to write database
function writeDb(data: DatabaseSchema): void {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Failed to write JSON database:", error);
  }
}

// Database helper export object
export const db = {
  // Flights
  getFlights: async () => {
    const data = readDb();
    return [...data.flights].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getFlightById: async (id: string) => {
    const data = readDb();
    return data.flights.find(f => f.id === id) || null;
  },

  addFlight: async (flightData: Omit<Flight, 'id' | 'createdAt' | 'updatedAt' | 'delay'> & { delay?: boolean }) => {
    const data = readDb();
    const newFlight: Flight = {
      ...flightData,
      id: 'flight-' + Math.random().toString(36).substring(2, 9),
      delay: flightData.delay ?? false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.flights.push(newFlight);
    writeDb(data);
    return newFlight;
  },

  deleteFlight: async (id: string) => {
    const data = readDb();
    data.flights = data.flights.filter(f => f.id !== id);
    // Delete associated bookings
    data.bookings = data.bookings.filter(b => b.flightId !== id);
    writeDb(data);
    return true;
  },

  // Hotels
  getHotels: async () => {
    const data = readDb();
    return [...data.hotels].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  addHotel: async (hotelData: Omit<Hotel, 'id' | 'createdAt' | 'updatedAt'>) => {
    const data = readDb();
    const newHotel: Hotel = {
      ...hotelData,
      id: 'hotel-' + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.hotels.push(newHotel);
    writeDb(data);
    return newHotel;
  },

  deleteHotel: async (id: string) => {
    const data = readDb();
    data.hotels = data.hotels.filter(h => h.id !== id);
    writeDb(data);
    return true;
  },

  // Deals
  getDeals: async () => {
    const data = readDb();
    return [...data.deals].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  addDeal: async (dealData: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const data = readDb();
    const newDeal: Deal = {
      ...dealData,
      id: 'deal-' + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.deals.push(newDeal);
    writeDb(data);
    return newDeal;
  },

  deleteDeal: async (id: string) => {
    const data = readDb();
    data.deals = data.deals.filter(d => d.id !== id);
    writeDb(data);
    return true;
  },

  // Users
  getUserByEmail: async (email: string) => {
    const data = readDb();
    return data.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  getUserById: async (id: string) => {
    const data = readDb();
    return data.users.find(u => u.id === id) || null;
  },

  createUser: async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'role'> & { role?: string }) => {
    const data = readDb();
    const newUser: User = {
      ...userData,
      id: 'user-' + Math.random().toString(36).substring(2, 9),
      role: userData.role ?? 'USER',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.users.push(newUser);
    writeDb(data);
    return newUser;
  },

  getUserCount: async () => {
    return readDb().users.length;
  },
  
  getFlightCount: async () => {
    return readDb().flights.length;
  },
  
  getHotelCount: async () => {
    return readDb().hotels.length;
  },
  
  getDealCount: async () => {
    return readDb().deals.length;
  },

  // Bookings
  createBooking: async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'status'> & { status?: string }) => {
    const data = readDb();
    const newBooking: Booking = {
      ...bookingData,
      id: 'booking-' + Math.random().toString(36).substring(2, 9),
      status: bookingData.status ?? 'CONFIRMED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.bookings.push(newBooking);
    writeDb(data);
    return newBooking;
  },

  lookupBooking: async (pnr: string) => {
    const data = readDb();
    const booking = data.bookings.find(b => b.pnr.toUpperCase() === pnr.toUpperCase());
    if (!booking) return null;
    
    // Resolve relation objects
    const user = data.users.find(u => u.id === booking.userId);
    const flight = data.flights.find(f => f.id === booking.flightId);
    
    // Create copy with resolved relationships (excluding password)
    const sanitizedUser = user ? { ...user } : undefined;
    if (sanitizedUser) delete sanitizedUser.password;

    return {
      ...booking,
      user: sanitizedUser,
      flight: flight || undefined
    };
  },

  getRecentBookings: async (limit: number = 5) => {
    const data = readDb();
    const sortedBookings = [...data.bookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const slice = sortedBookings.slice(0, limit);
    
    // Resolve relations for the sliced bookings
    return slice.map(booking => {
      const user = data.users.find(u => u.id === booking.userId);
      const flight = data.flights.find(f => f.id === booking.flightId);
      
      const sanitizedUser = user ? { ...user } : undefined;
      if (sanitizedUser) delete sanitizedUser.password;

      return {
        ...booking,
        user: sanitizedUser,
        flight: flight || undefined
      };
    });
  },

  getAllBookings: async () => {
    const data = readDb();
    const sortedBookings = [...data.bookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    // Resolve relations for all bookings
    return sortedBookings.map(booking => {
      const user = data.users.find(u => u.id === booking.userId);
      const flight = data.flights.find(f => f.id === booking.flightId);
      
      const sanitizedUser = user ? { ...user } : undefined;
      if (sanitizedUser) delete sanitizedUser.password;

      return {
        ...booking,
        user: sanitizedUser,
        flight: flight || undefined
      };
    });
  },

  deleteBooking: async (id: string) => {
    const data = readDb();
    data.bookings = data.bookings.filter(b => b.id !== id);
    writeDb(data);
    return true;
  }
};
