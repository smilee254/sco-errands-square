// Centralized mock data for all categories
// Replace with Firebase Firestore fetches once keys are configured

import { Listing } from "./types";

export const MOCK_LISTINGS: Listing[] = [
  // ── HOUSES ──
  {
    id: "h1",
    category: "house",
    title: "1 Bedroom Apartment",
    location: "Ruiru, Kiambu",
    price: 15000,
    priceLabel: "/ month",
    description:
      "A clean 1-bedroom apartment with consistent water supply, good security and 10 minutes from the main road.",
    thumbnail:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    ],
    isPrioritized: true,
    agentContact: "+254 700 000000",
    houseCategory: "apartment",
    houseType: "1_bedroom",
  },
  {
    id: "h2",
    category: "house",
    title: "2 Bedroom House",
    location: "Kikuyu, Kiambu",
    price: 22000,
    priceLabel: "/ month",
    description:
      "Spacious 2-bedroom house with a compound, separate kitchen and good access to public transport.",
    thumbnail:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    ],
    isPrioritized: true,
    agentContact: "+254 700 000000",
    houseCategory: "detached",
    houseType: "bungalow",
  },
  {
    id: "h3",
    category: "house",
    title: "Bedsitter",
    location: "Juja, Kiambu",
    price: 8000,
    priceLabel: "/ month",
    description: "Affordable bedsitter near Juja town. Water and electricity included.",
    thumbnail:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    ],
    isPrioritized: false,
    agentContact: "+254 700 000000",
    houseCategory: "apartment",
    houseType: "bedsitter",
  },

  // ── SCHOOLS ──
  {
    id: "s1",
    category: "school",
    title: "Bright Future Academy",
    location: "Ruiru, Kiambu",
    price: 18000,
    priceLabel: "/ term",
    description:
      "A well-established primary school with a strong academic record, meals program and optional transport.",
    thumbnail:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
    ],
    isPrioritized: true,
    agentContact: "+254 700 000000",
  },
  {
    id: "s2",
    category: "school",
    title: "Greenhill Junior School",
    location: "Thika, Kiambu",
    price: 22000,
    priceLabel: "/ term",
    description:
      "CBC-compliant junior school with modern facilities, large play area and consistent CBC scores.",
    thumbnail:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    ],
    isPrioritized: false,
    agentContact: "+254 700 000000",
  },

  // ── MOVERS ──
  {
    id: "m1",
    category: "mover",
    title: "Swift Movers Kenya",
    location: "Nairobi",
    description:
      "Professional moving company covering Nairobi and surrounding counties. Careful handling of fragile items. Available weekends.",
    thumbnail:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    ],
    isPrioritized: true,
    agentContact: "+254 700 000000",
  },
  {
    id: "m2",
    category: "mover",
    title: "QuickShift Relocators",
    location: "Kiambu County",
    description:
      "Budget-friendly movers servicing Kiambu county. 1-tonne and 3-tonne trucks available. Same-day booking possible.",
    thumbnail:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
    ],
    isPrioritized: false,
    agentContact: "+254 700 000000",
  },

  // ── PROPERTY (Cars & Land) ──
  {
    id: "p1",
    category: "property",
    title: "Toyota Fielder 2014",
    location: "Nairobi",
    price: 1350000,
    priceLabel: "asking price",
    description:
      "Clean Toyota Fielder 2014, 1500cc, well maintained. Full logbook, no accidents. Asking KES 1.35M negotiable.",
    thumbnail:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
    ],
    isPrioritized: true,
    propertyType: "car",
    agentContact: "+254 700 000000",
  },
  {
    id: "p2",
    category: "property",
    title: "50x100 Plot",
    location: "Juja, Kiambu",
    price: 2800000,
    priceLabel: "asking price",
    description:
      "50x100 plot in a fast-growing area near Juja town. Title deed ready. Ideal for residential construction.",
    thumbnail:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    ],
    isPrioritized: false,
    propertyType: "land",
    agentContact: "+254 700 000000",
  },

  // ── TRANSPORT ──
  {
    id: "t1",
    category: "transport",
    title: "Safe Ride School Van",
    location: "Kasarani, Nairobi",
    price: 5000,
    priceLabel: "/ month",
    description:
      "Reliable and safe door-to-door school transport for kids around Kasarani and Roysambu. Professional drivers with child-friendly vans.",
    thumbnail:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
    ],
    isPrioritized: true,
    agentContact: "+254 700 000000",
  },
  {
    id: "t2",
    category: "transport",
    title: "Westlands Kids Shuttle",
    location: "Westlands, Nairobi",
    price: 8000,
    priceLabel: "/ month",
    description:
      "Premium school run service covering Westlands, Parklands, and Lavington. Guaranteed timely pick-ups and drop-offs.",
    thumbnail:
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80",
    ],
    isPrioritized: false,
    agentContact: "+254 700 000000",
  },
];
