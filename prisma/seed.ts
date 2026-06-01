import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Seed Flights
  await prisma.flight.createMany({
    data: [
      {
        airline: "Aero Airlines",
        logo: "A",
        departureTime: "08:00 AM",
        arrivalTime: "11:30 AM",
        duration: "3h 30m",
        from: "DXB",
        to: "LHR",
        price: "$450",
        type: "Direct",
        delay: false
      },
      {
        airline: "Global Airways",
        logo: "G",
        departureTime: "10:15 AM",
        arrivalTime: "02:45 PM",
        duration: "4h 30m",
        from: "DXB",
        to: "LHR",
        price: "$380",
        type: "1 Stop",
        delay: true
      },
      {
        airline: "Sky High",
        logo: "S",
        departureTime: "02:00 PM",
        arrivalTime: "05:15 PM",
        duration: "3h 15m",
        from: "DXB",
        to: "LHR",
        price: "$520",
        type: "Direct",
        delay: false
      },
      {
        airline: "Oceanic Air",
        logo: "O",
        departureTime: "06:30 PM",
        arrivalTime: "10:00 PM",
        duration: "3h 30m",
        from: "DXB",
        to: "LHR",
        price: "$410",
        type: "Direct",
        delay: false
      }
    ]
  });

  // 2. Seed Hotels
  await prisma.hotel.createMany({
    data: [
      {
        name: "Atlantis The Royal",
        location: "Palm Jumeirah, Dubai",
        rating: 5.0,
        reviews: 1284,
        price: "$850",
        image: "/hero_background.png",
        amenities: "Free WiFi,Pool,Spa,Restaurant"
      },
      {
        name: "Burj Al Arab Jumeirah",
        location: "Umm Suqeim, Dubai",
        rating: 4.9,
        reviews: 3420,
        price: "$1,200",
        image: "/airplane_background.jpg",
        amenities: "Free WiFi,Beach Access,Spa,Gym"
      },
      {
        name: "The Ritz-Carlton",
        location: "JBR, Dubai",
        rating: 4.8,
        reviews: 2150,
        price: "$650",
        image: "/hero_background.png",
        amenities: "Free WiFi,Pool,Kids Club,Bar"
      }
    ]
  });

  // 3. Seed Deals
  await prisma.deal.createMany({
    data: [
      {
        title: "Summer Getaway in Maldives",
        description: "Enjoy 5 nights in a water villa including flights and half-board meals.",
        type: "packages",
        image: "/airplane_background.jpg",
        originalPrice: "$3,200",
        discountPrice: "$1,899",
        tag: "40% OFF",
        expiresIn: "2 days left"
      },
      {
        title: "Business Class to London",
        description: "Experience premium luxury. Fly direct on our flagship A380.",
        type: "flights",
        image: "/hero_background.png",
        originalPrice: "$4,500",
        discountPrice: "$2,999",
        tag: "Exclusive",
        expiresIn: "Ends tonight"
      },
      {
        title: "Weekend in Paris",
        description: "Stay at a luxury 5-star hotel near the Eiffel Tower with breakfast included.",
        type: "hotels",
        image: "/airplane_background.jpg",
        originalPrice: "$1,100",
        discountPrice: "$750",
        tag: "Flash Sale",
        expiresIn: "12 hours left"
      },
      {
        title: "Tokyo Adventure Package",
        description: "Round-trip flights + 7 nights stay at central Shinjuku.",
        type: "packages",
        image: "/hero_background.png",
        originalPrice: "$2,800",
        discountPrice: "$2,100",
        tag: "Hot Deal",
        expiresIn: "5 days left"
      }
    ]
  });

  // 4. Seed a User and a Booking for testing Manage Booking
  const user = await prisma.user.create({
    data: {
      name: "Ali Ahmed",
      email: "ali@example.com",
      password: "hashedpassword123" // Just mock hashed for now
    }
  });

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
