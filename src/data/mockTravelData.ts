import { TransportOption, Hotel, LastMileOption, BookingRecord } from '../types/travel';

export const SAMPLE_TRANSPORTS: TransportOption[] = [
  {
    id: 'tr-vande-bharat',
    operatorName: 'Vande Bharat Express',
    operatorCode: '20833 / VBE',
    transportType: 'train',
    departureTime: '05:45',
    arrivalTime: '14:15',
    duration: '8h 30m',
    durationMinutes: 510,
    originCity: 'Visakhapatnam',
    destinationCity: 'Hyderabad',
    originTerminal: 'Visakhapatnam Junction (VSKP)',
    destinationTerminal: 'Secunderabad Junction (SC)',
    pricePerPassenger: 1665,
    rating: 4.8,
    reviewCount: 3840,
    seatsAvailable: 24,
    isAc: true,
    seatingType: 'AC Chair Car (CC)',
    tag: 'Fastest Train',
    availableClasses: [
      { id: 'cc', name: 'AC Chair Car (CC)', priceMultiplier: 1.0, features: ['Comfortable 2x3 seating', 'Rotatable seats', 'Complimentary snack'] },
      { id: 'ec', name: 'Executive Chair Car (EC)', priceMultiplier: 1.85, features: ['Spacious 2x2 luxury seating', 'Extra legroom & footrest', 'Multi-course hot meal service', 'Priority boarding'] }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Hot Meals & Beverages',
      'Rotatable Plush Seats',
      'Panoramic Bio Windows',
      '180W USB-C Ports',
      'Bio-vacuum Restrooms'
    ],
    routeStops: [
      { station: 'Visakhapatnam Jn (VSKP)', time: '05:45 Departure', day: 1 },
      { station: 'Samalkot Jn (SLO)', time: '07:14 (2m halt)', day: 1 },
      { station: 'Rajahmundry (RJY)', time: '07:58 (2m halt)', day: 1 },
      { station: 'Vijayawada Jn (BZA)', time: '09:50 (5m halt)', day: 1 },
      { station: 'Khammam (KMT)', time: '11:03 (2m halt)', day: 1 },
      { station: 'Warangal (WL)', time: '12:05 (2m halt)', day: 1 },
      { station: 'Secunderabad Jn (SC)', time: '14:15 Arrival', day: 1 }
    ],
    fareBreakdown: {
      baseFare: 1350,
      operatorFee: 90,
      taxesAndGst: 145,
      convenienceFee: 80,
      totalPerPerson: 1665
    },
    cancellationPolicy: 'Full refund minus ₹60 clerkage if cancelled 48+ hours prior. 50% refund within 12 hours.',
    reviews: [
      {
        id: 'rev-1',
        userName: 'Vikram S.',
        rating: 5,
        date: '3 days ago',
        comment: 'Punctual, spotless, and the breakfast catering was piping hot. Vande Bharat is by far the best way to travel between Vizag and Hyderabad.'
      },
      {
        id: 'rev-2',
        userName: 'Aishwarya R.',
        rating: 4.5,
        date: '1 week ago',
        comment: 'Great legroom and charging sockets at every seat. Smooth ride even at 130 km/h.'
      }
    ]
  },
  {
    id: 'tr-indigo-6e',
    operatorName: 'IndiGo Airlines',
    operatorCode: '6E-421',
    transportType: 'flight',
    departureTime: '08:15',
    arrivalTime: '09:40',
    duration: '1h 25m',
    durationMinutes: 85,
    originCity: 'Visakhapatnam',
    destinationCity: 'Hyderabad',
    originTerminal: 'Visakhapatnam Airport (VTZ) · T1',
    destinationTerminal: 'Rajiv Gandhi Intl Airport (HYD) · T1',
    pricePerPassenger: 3890,
    rating: 4.6,
    reviewCount: 5120,
    seatsAvailable: 9,
    isAc: true,
    seatingType: 'Economy Saver',
    tag: 'Fastest Overall',
    availableClasses: [
      { id: 'econ', name: 'Economy Saver', priceMultiplier: 1.0, features: ['Standard seat', '7kg cabin + 15kg check-in bag'] },
      { id: 'flexi', name: 'Flexi Plus (Free Changes + Food)', priceMultiplier: 1.35, features: ['Complimentary hot snack & drink', 'Free standard seat selection', 'Zero cancellation fee up to 24h'] }
    ],
    amenities: [
      'Carry-on 7kg Included',
      'Check-in 15kg Included',
      'Snack & Beverage Cart',
      'Web Check-in',
      'Mobile Boarding Pass'
    ],
    routeStops: [
      { station: 'Visakhapatnam Airport (VTZ)', time: '08:15 Takeoff', day: 1 },
      { station: 'Rajiv Gandhi Intl Airport (HYD)', time: '09:40 Touchdown', day: 1 }
    ],
    fareBreakdown: {
      baseFare: 3100,
      operatorFee: 240,
      taxesAndGst: 430,
      convenienceFee: 120,
      totalPerPerson: 3890
    },
    cancellationPolicy: 'Refundable with standard airline fee. Cancellation allowed up to 2 hours before scheduled departure.',
    reviews: [
      {
        id: 'rev-3',
        userName: 'Sunil Verma',
        rating: 5,
        date: 'Yesterday',
        comment: 'Quick 1-hour flight. Boarding was seamless and landed 10 minutes ahead of schedule.'
      }
    ]
  },
  {
    id: 'tr-orange-bus',
    operatorName: 'Orange Tours & Travels',
    operatorCode: 'OTT-VOLVO-9600',
    transportType: 'bus',
    departureTime: '20:30',
    arrivalTime: '07:15',
    duration: '10h 45m',
    durationMinutes: 645,
    originCity: 'Visakhapatnam',
    destinationCity: 'Hyderabad',
    originTerminal: 'Rama Talkies / Gurudwara Hub',
    destinationTerminal: 'Ameerpet / MGBS Bus Terminal',
    pricePerPassenger: 1350,
    rating: 4.7,
    reviewCount: 2240,
    seatsAvailable: 14,
    isAc: true,
    seatingType: 'Volvo Multi-Axle AC Sleeper (2+1)',
    tag: 'Best Overnight',
    amenities: [
      'AC Individual Louver',
      'Fresh Laundered Blankets',
      'Water Bottle 500ml',
      'Individual USB Chargers',
      'Live GPS Tracking',
      'Emergency SOS System'
    ],
    routeStops: [
      { station: 'Rama Talkies, Vizag', time: '20:30 Boarding', day: 1 },
      { station: 'Gajuwaka Junction', time: '21:15', day: 1 },
      { station: 'Anakapalle Bypass', time: '21:55', day: 1 },
      { station: 'Suryapet Dinner Stop', time: '03:45 (30m halt)', day: 2 },
      { station: 'LB Nagar, Hyderabad', time: '06:30', day: 2 },
      { station: 'Ameerpet Metro, Hyd', time: '07:15 Dropping', day: 2 }
    ],
    fareBreakdown: {
      baseFare: 1150,
      operatorFee: 50,
      taxesAndGst: 100,
      convenienceFee: 50,
      totalPerPerson: 1350
    },
    cancellationPolicy: '100% refund before 12 hours of departure. 50% refund within 6 hours.',
    reviews: [
      {
        id: 'rev-4',
        userName: 'Divya M.',
        rating: 4.8,
        date: '4 days ago',
        comment: 'Extremely clean mattress and crisp sheets. Driver was polite and the bus was on time at Ameerpet.'
      }
    ]
  },
  {
    id: 'tr-godavari-exp',
    operatorName: 'Godavari Superfast Express',
    operatorCode: '12727 / SCR',
    transportType: 'train',
    departureTime: '17:20',
    arrivalTime: '06:15',
    duration: '12h 55m',
    durationMinutes: 775,
    originCity: 'Visakhapatnam',
    destinationCity: 'Hyderabad',
    originTerminal: 'Visakhapatnam Junction (VSKP)',
    destinationTerminal: 'Hyderabad Deccan Nampally (HYB)',
    pricePerPassenger: 1180,
    rating: 4.5,
    reviewCount: 4620,
    seatsAvailable: 38,
    isAc: true,
    seatingType: 'AC 3 Tier (3A)',
    tag: 'Cheapest AC',
    amenities: [
      'AC Berth with Bedroll',
      'Pantry Car Service',
      'Charging Ports',
      'Reading Lights',
      'Overnight Direct'
    ],
    routeStops: [
      { station: 'Visakhapatnam Jn (VSKP)', time: '17:20 Departure', day: 1 },
      { station: 'Duvvada (DVD)', time: '17:48', day: 1 },
      { station: 'Anakapalle (AKP)', time: '18:03', day: 1 },
      { station: 'Rajahmundry (RJY)', time: '20:13', day: 1 },
      { station: 'Vijayawada Jn (BZA)', time: '23:30', day: 1 },
      { station: 'Secunderabad Jn (SC)', time: '05:30', day: 2 },
      { station: 'Hyderabad Deccan (HYB)', time: '06:15 Arrival', day: 2 }
    ],
    fareBreakdown: {
      baseFare: 980,
      operatorFee: 50,
      taxesAndGst: 95,
      convenienceFee: 55,
      totalPerPerson: 1180
    },
    cancellationPolicy: 'Standard railway cancellation rules apply with instant wallet credit.',
    reviews: [
      {
        id: 'rev-5',
        userName: 'Karthik Rao',
        rating: 4.5,
        date: '2 weeks ago',
        comment: 'The timeless classic overnight train. Clean berths and timely arrival at Nampally.'
      }
    ]
  },
  {
    id: 'tr-morningstar-bus',
    operatorName: 'Morning Star Travels',
    operatorCode: 'MST-SCANIA-AC',
    transportType: 'bus',
    departureTime: '21:15',
    arrivalTime: '08:00',
    duration: '10h 45m',
    durationMinutes: 645,
    originCity: 'Visakhapatnam',
    destinationCity: 'Hyderabad',
    originTerminal: 'Maddilapalem Bus Station',
    destinationTerminal: 'Kukatpally / KPHB Colony',
    pricePerPassenger: 1220,
    rating: 4.4,
    reviewCount: 1820,
    seatsAvailable: 19,
    isAc: true,
    seatingType: 'Scania Multi-Axle Sleeper',
    tag: 'Budget Sleeper',
    amenities: [
      'AC Individual Vents',
      'Comfort Pillow & Blanket',
      'Bottled Water',
      'USB Mobile Charger',
      'CCTV Monitoring'
    ],
    routeStops: [
      { station: 'Maddilapalem, Vizag', time: '21:15 Boarding', day: 1 },
      { station: 'NAD Kotha Road', time: '21:45', day: 1 },
      { station: 'Anakapalle Highway', time: '22:30', day: 1 },
      { station: 'LB Nagar Ring Road', time: '07:15', day: 2 },
      { station: 'Kukatpally, Hyderabad', time: '08:00 Dropping', day: 2 }
    ],
    fareBreakdown: {
      baseFare: 1050,
      operatorFee: 40,
      taxesAndGst: 85,
      convenienceFee: 45,
      totalPerPerson: 1220
    },
    cancellationPolicy: 'Full refund before 18h. 60% refund up to 4 hours before journey.',
    reviews: [
      {
        id: 'rev-6',
        userName: 'Gautam P.',
        rating: 4,
        date: '5 days ago',
        comment: 'Good smooth journey. Stopped at a decent hygienic highway food court.'
      }
    ]
  },
  {
    id: 'tr-air-india-exp',
    operatorName: 'Air India Express',
    operatorCode: 'IX-983',
    transportType: 'flight',
    departureTime: '18:45',
    arrivalTime: '20:10',
    duration: '1h 25m',
    durationMinutes: 85,
    originCity: 'Visakhapatnam',
    destinationCity: 'Hyderabad',
    originTerminal: 'Visakhapatnam Airport (VTZ) · T1',
    destinationTerminal: 'Rajiv Gandhi Intl Airport (HYD) · T1',
    pricePerPassenger: 4250,
    rating: 4.5,
    reviewCount: 2980,
    seatsAvailable: 6,
    isAc: true,
    seatingType: 'Economy Prime',
    amenities: [
      'Baggage 15kg Check-in',
      'Snack Box on Board',
      'Priority Check-in Option',
      'USB Power Outlets'
    ],
    routeStops: [
      { station: 'Visakhapatnam Airport (VTZ)', time: '18:45 Departure', day: 1 },
      { station: 'Hyderabad Airport (HYD)', time: '20:10 Arrival', day: 1 }
    ],
    fareBreakdown: {
      baseFare: 3450,
      operatorFee: 260,
      taxesAndGst: 420,
      convenienceFee: 120,
      totalPerPerson: 4250
    },
    cancellationPolicy: 'Cancellation with airline fee up to 3 hours before flight.',
    reviews: [
      {
        id: 'rev-7',
        userName: 'Ananya S.',
        rating: 4.5,
        date: '1 week ago',
        comment: 'Clean aircraft and quick luggage clearance upon arrival at RGIA.'
      }
    ]
  },
  {
    id: 'tr-apsrtc-garuda',
    operatorName: 'APSRTC Garuda Plus',
    operatorCode: 'AP-EXP-109',
    transportType: 'bus',
    departureTime: '19:45',
    arrivalTime: '06:45',
    duration: '11h 00m',
    durationMinutes: 660,
    originCity: 'Visakhapatnam',
    destinationCity: 'Hyderabad',
    originTerminal: 'Dwaraka Bus Station (RTC Complex)',
    destinationTerminal: 'MGBS Imlibun Bus Station',
    pricePerPassenger: 980,
    rating: 4.3,
    reviewCount: 6200,
    seatsAvailable: 22,
    isAc: true,
    seatingType: 'AC Semi-Sleeper',
    tag: 'Cheapest Overall',
    amenities: [
      'Push-back Ergonomic Seats',
      'Water Bottle 500ml',
      'State RTC Reliability',
      'Live Fleet GPS'
    ],
    routeStops: [
      { station: 'RTC Complex, Vizag', time: '19:45 Departure', day: 1 },
      { station: 'Gajuwaka Depot', time: '20:30', day: 1 },
      { station: 'Vijayawada Bypass', time: '01:30', day: 2 },
      { station: 'MGBS Terminal, Hyd', time: '06:45 Arrival', day: 2 }
    ],
    fareBreakdown: {
      baseFare: 840,
      operatorFee: 30,
      taxesAndGst: 70,
      convenienceFee: 40,
      totalPerPerson: 980
    },
    cancellationPolicy: 'APSRTC standard rules. Cancel up to 2 hours prior with nominal deduction.',
    reviews: [
      {
        id: 'rev-8',
        userName: 'Bhanu Teja',
        rating: 4.5,
        date: '3 weeks ago',
        comment: 'Always trustworthy and safe government service. Driver drove very safely.'
      }
    ]
  },
  {
    id: 'tr-janmabhoomi',
    operatorName: 'Janmabhoomi Superfast',
    operatorCode: '12805 / ECoR',
    transportType: 'train',
    departureTime: '06:20',
    arrivalTime: '19:40',
    duration: '13h 20m',
    durationMinutes: 800,
    originCity: 'Visakhapatnam',
    destinationCity: 'Hyderabad',
    originTerminal: 'Visakhapatnam Junction (VSKP)',
    destinationTerminal: 'Secunderabad Junction (SC)',
    pricePerPassenger: 640,
    rating: 4.2,
    reviewCount: 3100,
    seatsAvailable: 54,
    isAc: false,
    seatingType: 'Second Seating (2S) / Non-AC',
    tag: 'Budget Daytime',
    amenities: [
      'Reserved Padded Seat',
      'Large Open Windows',
      'Onboard Vendor Service',
      'Coastal Countryside Views'
    ],
    routeStops: [
      { station: 'Visakhapatnam Jn (VSKP)', time: '06:20 Departure', day: 1 },
      { station: 'Rajahmundry', time: '09:20', day: 1 },
      { station: 'Vijayawada Jn', time: '12:15', day: 1 },
      { station: 'Guntur Jn', time: '13:10', day: 1 },
      { station: 'Secunderabad Jn', time: '19:40 Arrival', day: 1 }
    ],
    fareBreakdown: {
      baseFare: 540,
      operatorFee: 30,
      taxesAndGst: 40,
      convenienceFee: 30,
      totalPerPerson: 640
    },
    cancellationPolicy: 'Refundable as per Indian Railways rules.',
    reviews: [
      {
        id: 'rev-9',
        userName: 'Manoj Kumar',
        rating: 4.2,
        date: '1 month ago',
        comment: 'Budget-friendly daytime journey. Great scenic views crossing the Godavari bridge.'
      }
    ]
  }
];

export const SAMPLE_HOTELS: Hotel[] = [
  {
    id: 'ht-taj-krishna',
    name: 'Taj Krishna, Banjara Hills',
    location: 'Road No. 1, Banjara Hills',
    neighborhood: 'Banjara Hills',
    city: 'Hyderabad',
    pricePerNight: 7200,
    rating: 4.8,
    reviewCount: 1480,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    tag: 'Luxury Heritage',
    distanceFromHub: '6.2 km from Secunderabad Station · 28 km from Airport',
    roomType: 'Deluxe Garden View Room (King Bed)',
    amenities: [
      'Outdoor Pool & Spa',
      'Complimentary Breakfast',
      'High-Speed Wi-Fi',
      'Fitness Center',
      'Fine Dining Restaurants',
      '24/7 Room Service'
    ],
    cancellationPolicy: 'Free cancellation until 24 hours before check-in.',
    description: 'Surrounded by lush landscaped gardens in upscale Banjara Hills, Taj Krishna blends traditional grandeur with world-class hospitality.'
  },
  {
    id: 'ht-itc-kakatiya',
    name: 'ITC Kakatiya, Luxury Collection',
    location: 'Begumpet',
    neighborhood: 'Begumpet & Somajiguda',
    city: 'Hyderabad',
    pricePerNight: 6400,
    rating: 4.7,
    reviewCount: 1220,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    tag: 'Top Rated',
    distanceFromHub: '3.8 km from Secunderabad Station · 32 km from Airport',
    roomType: 'Executive Club Room with Lounge Access',
    amenities: [
      'Kaya Kalp Royal Spa',
      'Signature Dakshin Dining',
      'Express Laundry',
      'Valet Parking',
      'Infinity Pool'
    ],
    cancellationPolicy: 'Free cancellation up to 48 hours before arrival.',
    description: 'Inspired by the glorious Kakatiya dynasty, featuring architectural stone motifs, world-renowned culinary destinations, and curated luxury.'
  },
  {
    id: 'ht-radisson-blu',
    name: 'Radisson Blu Plaza Hotel',
    location: 'Banjara Hills, Road No. 6',
    neighborhood: 'Banjara Hills',
    city: 'Hyderabad',
    pricePerNight: 4850,
    rating: 4.5,
    reviewCount: 960,
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    tag: 'Business Choice',
    distanceFromHub: '7.1 km from Secunderabad Station · 26 km from Airport',
    roomType: 'Superior King Room with City View',
    amenities: [
      'Temperature Controlled Pool',
      'Buffet Breakfast included',
      'Airport Shuttle (Surcharge)',
      'Free High-Speed Wi-Fi',
      'Cocktail Lounge'
    ],
    cancellationPolicy: 'Non-refundable discount fare or free cancellation with flex rate.',
    description: 'Contemporary architecture with sophisticated glass facade, located right in the heart of the retail and corporate district.'
  },
  {
    id: 'ht-the-park',
    name: 'The Park Hyderabad',
    location: 'Somajiguda, Raj Bhavan Road',
    neighborhood: 'Somajiguda (Lakefront)',
    city: 'Hyderabad',
    pricePerNight: 4100,
    rating: 4.4,
    reviewCount: 840,
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    tag: 'Lakefront View',
    distanceFromHub: '4.5 km from Secunderabad Station · 29 km from Airport',
    roomType: 'Lake View Deluxe Room',
    amenities: [
      'Hussain Sagar Lakefront views',
      'Design boutique interior',
      'Rooftop Bar & Lounge',
      'Fitness Studio',
      'Spa'
    ],
    cancellationPolicy: 'Free cancellation up to 1 day prior.',
    description: 'Bold boutique design influenced by Nizam jewelry, providing panoramic water views across the historic Hussain Sagar lake.'
  },
  {
    id: 'ht-treebo-grand',
    name: 'Treebo Trend Heritage Residency',
    location: 'SD Road, Near Secunderabad Station',
    neighborhood: 'Secunderabad Central',
    city: 'Hyderabad',
    pricePerNight: 1850,
    rating: 4.2,
    reviewCount: 650,
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    tag: 'Best Budget',
    distanceFromHub: '800 meters from Secunderabad Station (Walking distance)',
    roomType: 'Standard AC Double Room',
    amenities: [
      'Hot Water 24/7',
      'Free South Indian Breakfast',
      'Elevator',
      'Daily Housekeeping',
      'Free Wi-Fi'
    ],
    cancellationPolicy: 'Free cancellation up to 12 hours before check-in.',
    description: 'Clean, reliable, comfortable transit hotel situated just a short stroll from Secunderabad Junction and metro.'
  },
  {
    id: 'ht-courtyard-marriott',
    name: 'Courtyard by Marriott Hyderabad',
    location: 'Lower Tank Bund Road',
    neighborhood: 'Tank Bund',
    city: 'Hyderabad',
    pricePerNight: 5100,
    rating: 4.6,
    reviewCount: 1140,
    imageUrl: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1200&q=80',
    tag: 'Prime Location',
    distanceFromHub: '3.2 km from Secunderabad Station · 31 km from Airport',
    roomType: 'Courtyard Executive Room',
    amenities: [
      'MoMo Cafe All-day Dining',
      'Outdoor Swimming Pool',
      'Ergonomic Workstation',
      '24-Hour Fitness',
      'Free Parking'
    ],
    cancellationPolicy: 'Cancel by 6:00 PM 1 day before arrival.',
    description: 'Overlooking Hussain Sagar lake, close to both Secunderabad and Hyderabad business districts.'
  }
];

export const SAMPLE_LAST_MILE: LastMileOption[] = [
  {
    id: 'lm-cab-sedan',
    type: 'cab',
    title: 'Private AC Cab (Sedan)',
    vehicleModel: 'Maruti Suzuki Dzire / Toyota Etios AC',
    estimatedPrice: 480,
    estimatedTime: '25 - 30 mins',
    passengerCapacity: 4,
    rating: 4.8,
    pickupPoint: 'Secunderabad Station Exit Gate 1 / RGIA Pillar 4',
    popularFor: 'Families & Travelers with Luggage',
    features: [
      'Dedicated private vehicle with AC',
      'Door-to-door direct drop',
      'Luggage boot space for 3 suitcases',
      'Verified sanitized chauffeur',
      'Zero surge guarantee'
    ]
  },
  {
    id: 'lm-shared-shuttle',
    type: 'shared',
    title: 'Shared Transit Shuttle',
    vehicleModel: 'Force Urbania / Tempo Traveller AC',
    estimatedPrice: 120,
    estimatedTime: '35 - 45 mins',
    passengerCapacity: 8,
    rating: 4.5,
    pickupPoint: 'Transit Hub Designated Bay B',
    popularFor: 'Solo & Budget Travelers',
    features: [
      'Direct route along major hotel corridors',
      'Economical per-seat pricing',
      'Air-conditioned comfortable seating',
      'Luggage assistance included'
    ]
  },
  {
    id: 'lm-auto',
    type: 'auto',
    title: 'Prepaid Auto Rickshaw',
    vehicleModel: 'Bajaj RE CNG / Electric Auto',
    estimatedPrice: 180,
    estimatedTime: '25 - 35 mins',
    passengerCapacity: 3,
    rating: 4.4,
    pickupPoint: 'Prepaid Auto Stand Booth #2',
    popularFor: 'Quick Short Distance Transit',
    features: [
      'Fixed prepaid fare (no haggling)',
      'Nimble in busy city traffic',
      'Immediate availability',
      'Govt regulated receipt'
    ]
  },
  {
    id: 'lm-metro',
    type: 'metro',
    title: 'Hyderabad Metro Express',
    vehicleModel: 'L&T Metro Rail (Blue Line Direct)',
    estimatedPrice: 45,
    estimatedTime: '20 - 25 mins',
    passengerCapacity: 50,
    rating: 4.9,
    pickupPoint: 'Secunderabad East Metro Station (Connected Walkway)',
    popularFor: 'Fastest & Zero Traffic',
    features: [
      'Zero traffic delay guarantee',
      'Modern air-conditioned coaches',
      'Trains every 4 minutes',
      'QR Code paperless mobile ticketing',
      'Eco-friendly zero emissions'
    ]
  }
];

export const SAMPLE_BOOKINGS: BookingRecord[] = [
  {
    id: 'bk-101',
    bookingRef: 'TG-HYD-98214',
    date: 'Oct 14, 2026',
    createdAt: 'Sep 25, 2026',
    origin: 'Visakhapatnam (VSKP)',
    destination: 'Hyderabad (SC)',
    passengerName: 'Sandya Pavani',
    passengersCount: 2,
    transport: SAMPLE_TRANSPORTS[0], // Vande Bharat
    lastMile: SAMPLE_LAST_MILE[0], // Private Cab
    hotel: SAMPLE_HOTELS[0], // Taj Krishna
    seatNumbers: ['C4-21', 'C4-22'],
    pnrOrTicket: 'PNR 4920-1928-31',
    totalAmount: 11010,
    status: 'Confirmed'
  },
  {
    id: 'bk-102',
    bookingRef: 'TG-GOA-73129',
    date: 'Aug 18, 2026',
    createdAt: 'Aug 02, 2026',
    origin: 'Hyderabad (HYD)',
    destination: 'Goa (GOI)',
    passengerName: 'Sandya Pavani',
    passengersCount: 2,
    transport: SAMPLE_TRANSPORTS[1], // Flight
    hotel: SAMPLE_HOTELS[1],
    seatNumbers: ['12A', '12B'],
    pnrOrTicket: 'IX-482910',
    totalAmount: 14180,
    status: 'Completed'
  },
  {
    id: 'bk-103',
    bookingRef: 'TG-MAA-41092',
    date: 'Jul 04, 2026',
    createdAt: 'Jun 28, 2026',
    origin: 'Visakhapatnam (VSKP)',
    destination: 'Chennai Central (MAS)',
    passengerName: 'Sandya Pavani',
    passengersCount: 1,
    transport: SAMPLE_TRANSPORTS[3], // Train
    seatNumbers: ['B2-45'],
    pnrOrTicket: 'PNR 2819-4819-02',
    totalAmount: 1250,
    status: 'Cancelled'
  }
];

export const POPULAR_DESTINATIONS = [
  {
    id: 'dest-hyd',
    city: 'Hyderabad',
    state: 'Telangana',
    tagline: 'City of Pearls & Royal Nizami Biryani',
    startingFare: '₹980',
    popularTransport: 'Vande Bharat · 8h 30m',
    image: 'https://images.unsplash.com/photo-1605335198083-d964f4ecf61e?auto=format&fit=crop&w=800&q=80',
    highlights: ['Charminar', 'Golconda Fort', 'Ramoji Film City', 'Hussain Sagar']
  },
  {
    id: 'dest-vizag',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    tagline: 'Jewel of the East Coast & Pristine Beaches',
    startingFare: '₹640',
    popularTransport: 'Express Train / Volvo Sleeper',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    highlights: ['RK Beach', 'Submarine Museum', 'Araku Valley', 'Kailasagiri']
  },
  {
    id: 'dest-goa',
    city: 'Goa',
    state: 'Goa',
    tagline: 'Sun-kissed Golden Beaches & Coastal Vibe',
    startingFare: '₹2,450',
    popularTransport: 'Direct Flight · 1h 45m',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    highlights: ['Baga Beach', 'Fort Aguada', 'Old Goa Cathedrals', 'Dudhsagar']
  },
  {
    id: 'dest-jaipur',
    city: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'The Pink City of Palaces & Majestic Forts',
    startingFare: '₹1,450',
    popularTransport: 'Superfast Train · Overnight',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
    highlights: ['Hawa Mahal', 'Amber Palace', 'City Palace', 'Jantar Mantar']
  },
  {
    id: 'dest-bangalore',
    city: 'Bengaluru',
    state: 'Karnataka',
    tagline: 'Silicon Valley of India & Garden City',
    startingFare: '₹1,280',
    popularTransport: 'Sleeper Bus · 10h',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
    highlights: ['Cubbon Park', 'Lalbagh Gardens', 'Bangalore Palace', 'Indiranagar']
  },
  {
    id: 'dest-kochi',
    city: 'Kochi',
    state: 'Kerala',
    tagline: 'Queen of the Arabian Sea & Serene Backwaters',
    startingFare: '₹2,190',
    popularTransport: 'Direct Flight & Coastal Train',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    highlights: ['Fort Kochi', 'Chinese Fishing Nets', 'Mattancherry', 'Backwaters']
  }
];
