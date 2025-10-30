import dotenv from "dotenv";
import Experience from "../models/Experience.js";
import Promo from "../models/Promo.js";
import connectDB from "../config/db.js";

dotenv.config();

const experiences = [
  {
    title: "Desert Safari",
    description:
      "Ride across the golden sand dunes of the Thar Desert in the late afternoon, witness the sunset and enjoy a night under the stars.",
    location: "Jaisalmer, Rajasthan",
    price: 1499,
    image:
      "https://plus.unsplash.com/premium_photo-1664303582996-95c220d4f3d3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
    category: "Adventure",
    about:
      "Embark on a thrilling desert safari in Jaisalmer where you'll traverse rolling sand dunes at sunset, meet local camel herders and enjoy a traditional folk-music bonfire under a vast starry sky.",
    slots: [
      {
        date: "Nov 10",
        timeSlots: [
          { time: "3:30 pm - 6:00 pm", available: 12, booked: 0 },
          { time: "5:00 pm - 7:30 pm", available: 12, booked: 0 },
        ],
      },
      {
        date: "Nov 11",
        timeSlots: [
          { time: "3:30 pm - 6:00 pm", available: 12, booked: 0 },
          { time: "4:30 pm - 7:00 pm", available: 12, booked: 0 },
        ],
      },
    ],
  },
  {
    title: "Wildlife Safari",
    description:
      "Explore the dense forests and grasslands of Kaziranga National Park, spot one-horned rhinos, elephants and rich birdlife.",
    location: "Kaziranga, Assam",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1759144204797-cbbb4372ca77?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    category: "Nature",
    about:
      "Join early morning jeep safaris through the UNESCO-listed Kaziranga National Park. With experienced guides you'll seek out Bengal tigers, one-horned rhinos and swamp deer amidst lush greenery and vibrant birdlife.",
    slots: [
      {
        date: "Nov 12",
        timeSlots: [
          { time: "5:30 am - 8:30 am", available: 10, booked: 0 },
          { time: "6:00 am - 9:00 am", available: 10, booked: 0 },
        ],
      },
      {
        date: "Nov 13",
        timeSlots: [
          { time: "5:30 am - 8:30 am", available: 10, booked: 0 },
          { time: "6:30 am - 9:30 am", available: 10, booked: 0 },
        ],
      },
    ],
  },
  {
    title: "Heritage Walk",
    description:
      "Walk through the narrow lanes of Old Delhi, explore markets, mosques and historic gems with a local historian.",
    location: "Old Delhi, Delhi",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1642578696922-2aebf2bda791?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
    category: "Cultural",
    about:
      "Discover the rich tapestry of Old Delhi on foot. From fragrant spice markets to majestic mosques and Mughal architecture, this guided walk with local historian brings the past to life.",
    slots: [
      {
        date: "Nov 14",
        timeSlots: [
          { time: "8:30 am - 10:30 am", available: 20, booked: 0 },
          { time: "11:00 am - 1:00 pm", available: 20, booked: 0 },
        ],
      },
      {
        date: "Nov 15",
        timeSlots: [
          { time: "8:30 am - 10:30 am", available: 20, booked: 0 },
          { time: "11:30 am - 1:30 pm", available: 20, booked: 0 },
        ],
      },
    ],
  },
  {
    title: "Scuba Diving",
    description:
      "Dive into crystal-clear waters of the Andaman Sea, explore coral reefs and marine life with certified instructors.",
    location: "Havelock Island, Andaman & Nicobar Islands",
    price: 2499,
    image:
      "https://plus.unsplash.com/premium_photo-1661894232140-73d96a67731b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    category: "Adventure",
    about:
      "Experience the underwater world of the Andaman Sea. Our certified instructors guide you through coral reefs, ship-wrecks and vibrant marine life in a fully equipped SCUBA diving session tailored for all levels.",
    slots: [
      {
        date: "Nov 16",
        timeSlots: [
          { time: "9:00 am - 11:00 am", available: 8, booked: 0 },
          { time: "1:00 pm - 3:00 pm", available: 8, booked: 0 },
        ],
      },
      {
        date: "Nov 17",
        timeSlots: [
          { time: "9:00 am - 11:00 am", available: 8, booked: 0 },
          { time: "2:00 pm - 4:00 pm", available: 8, booked: 0 },
        ],
      },
    ],
  },
  {
    title: "Tea Plantation Trek",
    description:
      "Trek through misty tea estates, meet local workers and taste freshly brewed leaf-to-cup tea in the hills of Munnar.",
    location: "Munnar, Kerala",
    price: 1199,
    image:
      "https://images.unsplash.com/photo-1677128350738-9dbc8710438d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    category: "Nature",
    about:
      "Wander through lush tea plantations in the Kerala hills, learn about tea harvesting, enjoy views of rolling green hills and end your trek with a tea tasting session overlooking the valley.",
    slots: [
      {
        date: "Nov 18",
        timeSlots: [
          { time: "7:30 am - 10:00 am", available: 12, booked: 0 },
          { time: "2:00 pm - 4:30 pm", available: 12, booked: 0 },
        ],
      },
      {
        date: "Nov 19",
        timeSlots: [
          { time: "7:30 am - 10:00 am", available: 12, booked: 0 },
          { time: "2:30 pm - 5:00 pm", available: 12, booked: 0 },
        ],
      },
    ],
  },
  {
    title: "Houseboat Cruise",
    description:
      "Relax on a traditional Kerala houseboat as you drift through scenic backwaters, enjoy local cuisine and village life.",
    location: "Alleppey (Alappuzha), Kerala",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1665849867282-37a9cb071d86?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    category: "Leisure",
    about:
      "Glide through the tranquil backwaters of Kerala aboard a traditional houseboat. Enjoy local snacks, watch village life pass by and unwind as the sun sets on the water with reflection views and palm trees lining the banks.",
    slots: [
      {
        date: "Nov 20",
        timeSlots: [
          { time: "4:00 pm - 6:30 pm", available: 10, booked: 0 },
          { time: "6:30 pm - 9:00 pm", available: 10, booked: 0 },
        ],
      },
      {
        date: "Nov 21",
        timeSlots: [
          { time: "4:00 pm - 6:30 pm", available: 10, booked: 0 },
          { time: "5:30 pm - 8:00 pm", available: 10, booked: 0 },
        ],
      },
    ],
  },
  {
    title: "Mountain Biking",
    description:
      "Ride high-altitude trails amidst stark desert mountains, experience raw terrain and remote landscapes in Ladakh.",
    location: "Leh-Ladakh, Jammu & Kashmir",
    price: 2199,
    image:
      "https://images.unsplash.com/photo-1517095110280-5ac9879aca68?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
    category: "Adventure",
    about:
      "Cycle across rugged high-altitude terrain in Ladakh on specially designed mountain bikes. With local guides, you'll navigate remote passes, glacial views and wild landscapes that few experience.",
    slots: [
      {
        date: "Nov 22",
        timeSlots: [
          { time: "8:00 am - 12:00 pm", available: 6, booked: 0 },
          { time: "2:00 pm - 6:00 pm", available: 6, booked: 0 },
        ],
      },
      {
        date: "Nov 23",
        timeSlots: [
          { time: "8:00 am - 12:00 pm", available: 6, booked: 0 },
          { time: "3:00 pm - 7:00 pm", available: 6, booked: 0 },
        ],
      },
    ],
  },
  {
    title: "Toy Train Ride",
    description:
      "Experience the iconic Darjeeling Himalayan Railway, winding through misty hills and tea gardens with breathtaking valley views.",
    location: "Darjeeling, West Bengal",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1618252251417-0491acfdc12d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
    category: "Nature & Heritage",
    about:
      "Ride the world-famous UNESCO-listed Darjeeling Toy Train, a journey through scenic mountain curves and lush tea estates. Enjoy the old-world charm, whistling steam engine, and panoramic views of the Eastern Himalayas.",
    slots: [
      {
        date: "Nov 25",
        timeSlots: [
          { time: "9:00 am - 12:00 pm", available: 8, booked: 0 },
          { time: "2:00 pm - 5:00 pm", available: 8, booked: 0 },
        ],
      },
      {
        date: "Nov 26",
        timeSlots: [
          { time: "10:00 am - 1:00 pm", available: 8, booked: 0 },
          { time: "3:00 pm - 6:00 pm", available: 8, booked: 0 },
        ],
      },
    ],
  },
  // 8 NEW EXPERIENCES BELOW
  {
    title: "River Rafting",
    description:
      "Navigate thrilling rapids of the Ganges River, experience white water adventure with expert guides in Rishikesh.",
    location: "Rishikesh, Uttarakhand",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    category: "Adventure",
    about:
      "Challenge yourself with an adrenaline-pumping rafting expedition through Grade II-IV rapids. Our experienced guides ensure safety while you paddle through stunning gorges and pristine waters.",
    slots: [
      {
        date: "Nov 27",
        timeSlots: [
          { time: "9:00 am - 12:30 pm", available: 15, booked: 0 },
          { time: "1:30 pm - 5:00 pm", available: 15, booked: 0 },
        ],
      },
      {
        date: "Nov 28",
        timeSlots: [
          { time: "9:00 am - 12:30 pm", available: 15, booked: 0 },
          { time: "2:00 pm - 5:30 pm", available: 15, booked: 0 },
        ],
      },
    ],
  },
  {
    title: "Spice Plantation Tour",
    description:
      "Explore aromatic spice gardens, learn about cultivation and enjoy authentic Goan cuisine in a tropical paradise.",
    location: "Goa",
    price: 899,
    image:
      "https://www.keralabackwater.com/pictures/package/packageintro/kerala-high-tea-spices-and-backwaters-tour-57.jpeg",
    category: "Cultural",
    about:
      "Walk through lush spice plantations filled with cardamom, pepper, cinnamon and vanilla. Learn traditional farming methods and savor a traditional Goan lunch amidst nature.",
    slots: [
      {
        date: "Nov 29",
        timeSlots: [
          { time: "10:00 am - 1:00 pm", available: 18, booked: 0 },
          { time: "2:00 pm - 5:00 pm", available: 18, booked: 0 },
        ],
      },
      {
        date: "Nov 30",
        timeSlots: [
          { time: "10:00 am - 1:00 pm", available: 18, booked: 0 },
          { time: "2:30 pm - 5:30 pm", available: 18, booked: 0 },
        ],
      },
    ],
  },
  {
    title: "Camel Safari",
    description:
      "Journey through the vast Rann of Kutch on camelback, witness white salt desert and vibrant local culture.",
    location: "Kutch, Gujarat",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    category: "Adventure",
    about:
      "Explore the surreal white desert of Kutch on a traditional camel safari. Experience the unique landscape, meet local artisans and witness spectacular sunsets over the salt flats.",
    slots: [
      {
        date: "Dec 1",
        timeSlots: [
          { time: "4:00 pm - 7:00 pm", available: 12, booked: 0 },
          { time: "5:00 pm - 8:00 pm", available: 12, booked: 0 },
        ],
      },
      {
        date: "Dec 2",
        timeSlots: [
          { time: "4:00 pm - 7:00 pm", available: 12, booked: 0 },
          { time: "4:30 pm - 7:30 pm", available: 12, booked: 0 },
        ],
      },
    ],
  },
  {
    title: "Paragliding",
    description:
      "Soar above the Himalayas with tandem paragliding, enjoy bird's-eye views of valleys and snow-capped peaks.",
    location: "Bir Billing, Himachal Pradesh",
    price: 2899,
    image:
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    category: "Adventure",
    about:
      "Experience the thrill of flying over one of the world's best paragliding sites. Certified pilots will guide your tandem flight over stunning Himalayan landscapes and monasteries.",
    slots: [
      {
        date: "Dec 3",
        timeSlots: [
          { time: "8:00 am - 10:30 am", available: 6, booked: 0 },
          { time: "11:00 am - 1:30 pm", available: 6, booked: 0 },
        ],
      },
      {
        date: "Dec 4",
        timeSlots: [
          { time: "8:00 am - 10:30 am", available: 6, booked: 0 },
          { time: "11:30 am - 2:00 pm", available: 6, booked: 0 },
        ],
      },
    ],
  },
  {
    title: "Temple Trail",
    description:
      "Discover ancient temples of Mahabalipuram, marvel at rock-cut architecture and coastal heritage sites.",
    location: "Mahabalipuram, Tamil Nadu",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    category: "Cultural",
    about:
      "Step back in time exploring UNESCO World Heritage temples carved from single rocks. Learn about Pallava dynasty architecture and enjoy stunning coastal views.",
    slots: [
      {
        date: "Dec 5",
        timeSlots: [
          { time: "7:00 am - 10:00 am", available: 20, booked: 0 },
          { time: "3:00 pm - 6:00 pm", available: 20, booked: 0 },
        ],
      },
      {
        date: "Dec 6",
        timeSlots: [
          { time: "7:00 am - 10:00 am", available: 20, booked: 0 },
          { time: "3:30 pm - 6:30 pm", available: 20, booked: 0 },
        ],
      },
    ],
  },
  {
    title: "Yoga Retreat",
    description:
      "Rejuvenate with morning yoga sessions by the Ganges, meditation and wellness practices in a serene ashram.",
    location: "Rishikesh, Uttarakhand",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    category: "Leisure",
    about:
      "Find inner peace with guided yoga and meditation sessions in the yoga capital of the world. Experienced instructors lead you through asanas with the soothing sounds of the river.",
    slots: [
      {
        date: "Dec 7",
        timeSlots: [
          { time: "6:00 am - 8:00 am", available: 15, booked: 0 },
          { time: "5:00 pm - 7:00 pm", available: 15, booked: 0 },
        ],
      },
      {
        date: "Dec 8",
        timeSlots: [
          { time: "6:00 am - 8:00 am", available: 15, booked: 0 },
          { time: "5:30 pm - 7:30 pm", available: 15, booked: 0 },
        ],
      },
    ],
  },
  {
    title: "Bamboo Rafting",
    description:
      "Float down calm rivers on bamboo rafts, observe rural life and enjoy peaceful moments in Meghalaya's forests.",
    location: "Dawki, Meghalaya",
    price: 1099,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    category: "Nature",
    about:
      "Drift on crystal-clear waters of the Umngot River on traditional bamboo rafts. Experience the serenity of one of India's cleanest rivers surrounded by lush forests.",
    slots: [
      {
        date: "Dec 9",
        timeSlots: [
          { time: "9:00 am - 11:30 am", available: 10, booked: 0 },
          { time: "1:00 pm - 3:30 pm", available: 10, booked: 0 },
        ],
      },
      {
        date: "Dec 10",
        timeSlots: [
          { time: "9:00 am - 11:30 am", available: 10, booked: 0 },
          { time: "1:30 pm - 4:00 pm", available: 10, booked: 0 },
        ],
      },
    ],
  },
  {
    title: "Palace Tour",
    description:
      "Visit grand palaces of Jaipur, explore royal heritage, intricate architecture and hear tales of Rajput glory.",
    location: "Jaipur, Rajasthan",
    price: 1399,
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    category: "Cultural",
    about:
      "Tour magnificent palaces including Hawa Mahal, City Palace and Amber Fort. Learn about royal history, admire intricate mirror work and enjoy panoramic city views.",
    slots: [
      {
        date: "Dec 11",
        timeSlots: [
          { time: "9:00 am - 1:00 pm", available: 18, booked: 0 },
          { time: "2:00 pm - 6:00 pm", available: 18, booked: 0 },
        ],
      },
      {
        date: "Dec 12",
        timeSlots: [
          { time: "9:30 am - 1:30 pm", available: 18, booked: 0 },
          { time: "2:30 pm - 6:30 pm", available: 18, booked: 0 },
        ],
      },
    ],
  },
];

const promos = [
  {
    code: "SAVE10",
    discountType: "percentage",
    discountValue: 10,
    maxDiscount: 200,
    minOrderValue: 500,
    isActive: true,
  },
  {
    code: "FLAT100",
    discountType: "fixed",
    discountValue: 100,
    minOrderValue: 1000,
    isActive: true,
  },
  {
    code: "WELCOME20",
    discountType: "percentage",
    discountValue: 20,
    maxDiscount: 500,
    minOrderValue: 800,
    isActive: true,
  },
];

const seedData = async () => {
  try {
    await connectDB();

    await Experience.deleteMany();
    await Promo.deleteMany();

    await Experience.insertMany(experiences);
    console.log("Experiences seeded successfully");

    await Promo.insertMany(promos);
    console.log("Promo codes seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();