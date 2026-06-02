import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.flight.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.deal.deleteMany();

  // 1. Seed Flights
  const flightsData = [
    { airline: "Aero Airlines", logo: "A", departureTime: "08:00 AM", arrivalTime: "11:30 AM", duration: "3h 30m", from: "DXB (Dubai)", to: "LHR (London)", price: "$450", type: "Direct", delay: false },
    { airline: "Global Airways", logo: "G", departureTime: "10:15 AM", arrivalTime: "02:45 PM", duration: "4h 30m", from: "JFK (New York)", to: "CDG (Paris)", price: "$680", type: "1 Stop", delay: true },
    { airline: "Sky High", logo: "S", departureTime: "02:00 PM", arrivalTime: "05:15 PM", duration: "3h 15m", from: "HND (Tokyo)", to: "ICN (Seoul)", price: "$220", type: "Direct", delay: false },
    { airline: "Oceanic Air", logo: "O", departureTime: "06:30 PM", arrivalTime: "10:00 PM", duration: "3h 30m", from: "SYD (Sydney)", to: "AKL (Auckland)", price: "$310", type: "Direct", delay: false },
    { airline: "Aero Airlines", logo: "A", departureTime: "11:00 PM", arrivalTime: "06:30 AM", duration: "7h 30m", from: "LHR (London)", to: "DXB (Dubai)", price: "$510", type: "Direct", delay: false },
    { airline: "Qatar Executive", logo: "Q", departureTime: "01:00 PM", arrivalTime: "08:45 PM", duration: "7h 45m", from: "DOH (Doha)", to: "FRA (Frankfurt)", price: "$890", type: "Business", delay: false },
    { airline: "Emirates", logo: "E", departureTime: "04:20 AM", arrivalTime: "09:50 AM", duration: "5h 30m", from: "DXB (Dubai)", to: "MXP (Milan)", price: "$620", type: "Direct", delay: true },
    { airline: "Lufthansa", logo: "L", departureTime: "09:00 AM", arrivalTime: "11:45 AM", duration: "2h 45m", from: "MUC (Munich)", to: "MAD (Madrid)", price: "$180", type: "Economy", delay: false },
  ];
  await prisma.flight.createMany({ data: flightsData });

  // 2. Seed Hotels
  const hotelsData = [
    { name: "Atlantis The Royal", location: "Palm Jumeirah, Dubai", rating: 5.0, reviews: 1284, price: "$850", image: "/elegant_sky_clouds.png", amenities: "Free WiFi,Pool,Spa,Restaurant" },
    { name: "Burj Al Arab Jumeirah", location: "Umm Suqeim, Dubai", rating: 4.9, reviews: 3420, price: "$1,200", image: "/luxury_aero_hero.png", amenities: "Free WiFi,Beach Access,Spa,Gym" },
    { name: "The Ritz-Carlton", location: "Central Park, New York", rating: 4.8, reviews: 2150, price: "$650", image: "/re.png", amenities: "Free WiFi,Pool,Kids Club,Bar" },
    { name: "Four Seasons Hotel", location: "George V, Paris", rating: 4.9, reviews: 1890, price: "$980", image: "/elegant_sky_clouds.png", amenities: "Eiffel View,Spa,Michelin Dining,Gym" },
    { name: "Aman Tokyo", location: "Otemachi, Tokyo", rating: 4.9, reviews: 920, price: "$1,100", image: "/luxury_aero_hero.png", amenities: "City View,Zen Garden,Onsen,WiFi" },
    { name: "Marina Bay Sands", location: "Bayfront, Singapore", rating: 4.7, reviews: 15400, price: "$520", image: "/re.png", amenities: "Infinity Pool,Casino,Mall,Spa" },
    { name: "The Savoy", location: "Strand, London", rating: 4.8, reviews: 4200, price: "$750", image: "/elegant_sky_clouds.png", amenities: "River View,Afternoon Tea,WiFi,Bar" },
    { name: "Waldorf Astoria", location: "Beverly Hills, LA", rating: 4.8, reviews: 1120, price: "$890", image: "/luxury_aero_hero.png", amenities: "Rooftop Pool,Spa,Valet,Restaurant" },
  ];
  await prisma.hotel.createMany({ data: hotelsData });

  // 3. Seed Deals
  const dealsData = [
    { title: "Summer Getaway in Maldives", description: "Enjoy 5 nights in a water villa including flights and half-board meals.", type: "packages", image: "/re.png", originalPrice: "$3,200", discountPrice: "$1,899", tag: "40% OFF", expiresIn: "2 days left" },
    { title: "Business Class to London", description: "Experience premium luxury. Fly direct on our flagship A380.", type: "flights", image: "/luxury_aero_hero.png", originalPrice: "$4,500", discountPrice: "$2,999", tag: "Exclusive", expiresIn: "Ends tonight" },
    { title: "Weekend in Paris", description: "Stay at a luxury 5-star hotel near the Eiffel Tower with breakfast included.", type: "hotels", image: "/elegant_sky_clouds.png", originalPrice: "$1,100", discountPrice: "$750", tag: "Flash Sale", expiresIn: "12 hours left" },
    { title: "Tokyo Adventure Package", description: "Round-trip flights + 7 nights stay at central Shinjuku.", type: "packages", image: "/re.png", originalPrice: "$2,800", discountPrice: "$2,100", tag: "Hot Deal", expiresIn: "5 days left" }
  ];
  await prisma.deal.createMany({ data: dealsData });

  // 4. Seed a User and a Booking for testing Manage Booking
  const existingUser = await prisma.user.findUnique({ where: { email: "ali@example.com" } });
  let user = existingUser;
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: "Ali Ahmed",
        email: "ali@example.com",
        password: "hashedpassword123"
      }
    });
  }

  const flight = await prisma.flight.findFirst();
  
  if (flight) {
    await prisma.booking.create({
      data: {
        pnr: "A8X9KL",
        userId: user.id,
        flightId: flight.id,
        status: "CONFIRMED"
      }
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
