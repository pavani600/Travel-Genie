import { Hotel } from '../types/travel';

export function getHotelsForDestination(destinationCity: string): Hotel[] {
  const city = destinationCity.trim() || 'Visakhapatnam';
  const lower = city.toLowerCase();

  if (lower.includes('vizag') || lower.includes('visakhapatnam')) {
    return [
      {
        id: 'ht-novotel-vizag',
        name: 'Novotel Visakhapatnam Varun Beach',
        location: 'Beach Road, Maharani Peta',
        neighborhood: 'RK Beach / Coastal Promenade',
        city: 'Visakhapatnam',
        pricePerNight: 5800,
        rating: 4.8,
        reviewCount: 2340,
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        tag: 'Ocean View Luxury',
        distanceFromHub: '3.2 km from Visakhapatnam Jn · 12 km from Airport',
        roomType: 'Superior Ocean View Room (King Bed)',
        amenities: ['Infinity Bay Pool', 'Free Breakfast', 'Seafront Dining', 'Spa & Fitness', 'High-Speed Wi-Fi'],
        cancellationPolicy: 'Free cancellation until 24 hours prior to check-in.',
        description: 'Overlooking the Bay of Bengal along the scenic RK Beach road, offering panoramic ocean sunrises and luxury hospitality.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
      },
      {
        id: 'ht-gateway-vizag',
        name: 'The Gateway Hotel Beach Road',
        location: 'Beach Road, Pandurangapuram',
        neighborhood: 'Pandurangapuram (Beachfront)',
        city: 'Visakhapatnam',
        pricePerNight: 4900,
        rating: 4.7,
        reviewCount: 1820,
        imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        tag: 'Heritage Comfort',
        distanceFromHub: '4.1 km from Visakhapatnam Jn · 14 km from Airport',
        roomType: 'Deluxe Sea Facing Room',
        amenities: ['Swimming Pool', 'Multi-cuisine Restaurant', 'Free Wi-Fi', '24/7 Room Service'],
        cancellationPolicy: 'Free cancellation up to 48 hours before arrival.',
        description: 'Elegant colonial-inspired coastal resort surrounded by manicured lawns right across the pristine golden beach.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
      },
      {
        id: 'ht-radisson-vizag',
        name: 'Radisson Blu Resort Visakhapatnam',
        location: 'Rushikonda Beach Road',
        neighborhood: 'Rushikonda Cove',
        city: 'Visakhapatnam',
        pricePerNight: 6400,
        rating: 4.8,
        reviewCount: 1140,
        imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
        tag: 'Beachfront Resort',
        distanceFromHub: '12 km from Visakhapatnam Jn · 22 km from Airport',
        roomType: 'Premium Oceanfront Suite with Balcony',
        amenities: ['Private Beach Access', 'Ayurvedic Spa', 'Outdoor Pool', 'Water Sports Desk'],
        cancellationPolicy: 'Flexible cancellation up to 24h prior.',
        description: 'Tucked between the lush Eastern Ghats hills and the turquoise waters of Rushikonda beach.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
      },
      {
        id: 'ht-treebo-vizag',
        name: 'Treebo Trend Grand Coastal Heritage',
        location: 'Daba Gardens, Near RTC Complex',
        neighborhood: 'City Center (Central Hub)',
        city: 'Visakhapatnam',
        pricePerNight: 1950,
        rating: 4.3,
        reviewCount: 780,
        imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
        tag: 'Best Transit Budget',
        distanceFromHub: '1.2 km from Visakhapatnam Jn · 800m from RTC Complex',
        roomType: 'Standard AC Double Room',
        amenities: ['Free South Indian Breakfast', 'Elevator', 'Free Wi-Fi', '24/7 Hot Water'],
        cancellationPolicy: 'Free cancellation up to 12 hours prior.',
        description: 'Clean, reliable transit hotel situated right in the commercial core close to the railway station and bus hub.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
      }
    ];
  }

  if (lower.includes('chennai') || lower.includes('madras')) {
    return [
      {
        id: 'ht-itc-chola',
        name: 'ITC Grand Chola, Luxury Collection',
        location: 'No. 63, Anna Salai, Guindy',
        neighborhood: 'Guindy & Airport Corridor',
        city: 'Chennai',
        pricePerNight: 7800,
        rating: 4.9,
        reviewCount: 3120,
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        tag: 'Chola Dynasty Palace',
        distanceFromHub: '8 km from Chennai Central · 7 km from Airport',
        roomType: 'Executive Club Luxury Room',
        amenities: ['Royal Spa', 'Complimentary Breakfast', '3 Swimming Pools', 'Fine Dining Dakshin', 'Valet Parking'],
        cancellationPolicy: 'Free cancellation up to 24 hours prior to arrival.',
        description: 'An architectural tribute to Southern Indian dynasties with hand-carved stone pillars, grand courtyards, and palatial rooms.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
      },
      {
        id: 'ht-taj-coromandel',
        name: 'Taj Coromandel, Nungambakkam',
        location: '37, Mahatma Gandhi Road, Nungambakkam',
        neighborhood: 'Nungambakkam Diplomatic Quarter',
        city: 'Chennai',
        pricePerNight: 6900,
        rating: 4.8,
        reviewCount: 2450,
        imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        tag: 'Legendary Heritage',
        distanceFromHub: '5.2 km from Chennai Central · 14 km from Airport',
        roomType: 'Luxury King Room with City View',
        amenities: ['Jiva Spa', 'Poolside Lounge', 'Free High-Speed Wi-Fi', 'Southern Spices Restaurant'],
        cancellationPolicy: 'Free cancellation up to 48 hours prior.',
        description: 'Renowned beacon of traditional South Indian warmth and hospitality, hosting global luminaries since 1974.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
      },
      {
        id: 'ht-treebo-chennai',
        name: 'Treebo Trend Central Park Residency',
        location: 'Poonamallee High Road, Near Central',
        neighborhood: 'Chennai Central Station Corridor',
        city: 'Chennai',
        pricePerNight: 1850,
        rating: 4.3,
        reviewCount: 920,
        imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
        tag: 'Best Budget Transit',
        distanceFromHub: '700 meters from Chennai Central (Walking distance)',
        roomType: 'Deluxe AC Room',
        amenities: ['Complimentary Breakfast', 'Elevator', '24/7 Security', 'Free Wi-Fi'],
        cancellationPolicy: 'Free cancellation up to 12 hours prior.',
        description: 'Pristine, secure transit hotel ideal for travelers catching morning or overnight trains from Central.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
      }
    ];
  }

  if (lower.includes('bengaluru') || lower.includes('bangalore')) {
    return [
      {
        id: 'ht-leela-blr',
        name: 'The Leela Palace Bengaluru',
        location: '23, HAL Old Airport Road',
        neighborhood: 'Indiranagar / Old Airport Road',
        city: 'Bengaluru',
        pricePerNight: 8500,
        rating: 4.9,
        reviewCount: 3890,
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        tag: 'Art Deco Royal Palace',
        distanceFromHub: '9 km from KSR City Station · 38 km from Airport',
        roomType: 'Royal Premiere Garden View Room',
        amenities: ['Signature Citrus Restaurant', 'Grand Ballrooms', 'Outdoor Lagoon Pool', 'Royal Spa', 'Free Wi-Fi'],
        cancellationPolicy: 'Free cancellation up to 24 hours prior to check-in.',
        description: 'Nestled amidst 7 acres of lush tropical gardens and copper domes modeled after Mysore Palace.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
      },
      {
        id: 'ht-itc-gardenia',
        name: 'ITC Gardenia, Luxury Collection',
        location: 'No. 1, Residency Road',
        neighborhood: 'UB City / Central Business District',
        city: 'Bengaluru',
        pricePerNight: 7200,
        rating: 4.8,
        reviewCount: 2200,
        imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        tag: 'Eco-Luxury Premier',
        distanceFromHub: '3.8 km from KSR City Station · 34 km from Airport',
        roomType: 'Towers Deluxe Room with Lounge Access',
        amenities: ['LEED Platinum Eco Certified', 'Kaya Kalp Spa', 'Edo Japanese Restaurant', 'Rooftop Helipad & Pool'],
        cancellationPolicy: 'Free cancellation up to 48 hours prior.',
        description: 'An oasis of nature and modern elegance in the beating heart of Bengaluru, adjacent to Cubbon Park.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
      },
      {
        id: 'ht-treebo-blr',
        name: 'Treebo Trend Majestic Heritage',
        location: 'Tank Bund Road, Gandhi Nagar',
        neighborhood: 'Majestic / KSR Railway Hub',
        city: 'Bengaluru',
        pricePerNight: 2100,
        rating: 4.3,
        reviewCount: 840,
        imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
        tag: 'Best Transit Hub',
        distanceFromHub: '500m from KSR Bengaluru Station & Metro',
        roomType: 'Comfort Double AC Room',
        amenities: ['Hot Water 24/7', 'South Indian Breakfast Included', 'Free Wi-Fi', 'Luggage Storage'],
        cancellationPolicy: 'Free cancellation up to 12 hours prior.',
        description: 'Clean and quiet modern transit stay within immediate walking distance of train and metro hubs.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
      }
    ];
  }

  if (lower.includes('hyderabad')) {
    return [
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
        amenities: ['Outdoor Pool & Spa', 'Complimentary Breakfast', 'High-Speed Wi-Fi', 'Fine Dining'],
        cancellationPolicy: 'Free cancellation until 24 hours before check-in.',
        description: 'Surrounded by lush landscaped gardens in upscale Banjara Hills, blending traditional grandeur with Nizami hospitality.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
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
        amenities: ['Kaya Kalp Royal Spa', 'Signature Dakshin Dining', 'Valet Parking', 'Infinity Pool'],
        cancellationPolicy: 'Free cancellation up to 48 hours before arrival.',
        description: 'Inspired by the glorious Kakatiya dynasty, featuring architectural stone motifs and curated luxury.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
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
        amenities: ['Hot Water 24/7', 'Free South Indian Breakfast', 'Elevator', 'Free Wi-Fi'],
        cancellationPolicy: 'Free cancellation up to 12 hours before check-in.',
        description: 'Clean, reliable, comfortable transit hotel situated just a short stroll from Secunderabad Junction and metro.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
      }
    ];
  }

  if (lower.includes('tokyo') || lower.includes('japan')) {
    return [
      {
        id: 'ht-tokyo-shinjuku',
        name: 'Keio Plaza Hotel Tokyo',
        location: '2-2-1 Nishi-Shinjuku, Shinjuku-ku',
        neighborhood: 'Shinjuku Skyscraper District',
        city: 'Tokyo',
        pricePerNight: 12500,
        rating: 4.8,
        reviewCount: 3890,
        imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
        tag: 'Skyline City View',
        distanceFromHub: '5 mins walk from Shinjuku Station · Direct Narita Limousine Bus',
        roomType: 'Premier Grand King Room with Mt Fuji View',
        amenities: ['Skyline Bar & Lounge', 'High-Speed Wi-Fi', 'Direct Airport Limousine Bus', 'Traditional Tea Room'],
        cancellationPolicy: 'Free cancellation up to 48 hours before check-in.',
        description: 'Iconic luxury hotel in central Shinjuku offering sweeping views of the Tokyo metropolis and impeccable Japanese hospitality.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
      },
      {
        id: 'ht-tokyo-ginza',
        name: 'The Royal Park Hotel Iconic Tokyo Shiodome',
        location: '1-9-3 Higashi-Shinbashi, Minato-ku',
        neighborhood: 'Ginza & Shiodome Promenade',
        city: 'Tokyo',
        pricePerNight: 9800,
        rating: 4.7,
        reviewCount: 2450,
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        tag: 'Premier Boutique',
        distanceFromHub: '3 mins from Shimbashi Station · Walking distance to Ginza',
        roomType: 'Superior City View Double Room',
        amenities: ['Spa Mandara', 'All-Day Dining Harmony', 'Free High-Speed Wi-Fi'],
        cancellationPolicy: 'Free cancellation up to 24h prior.',
        description: 'Refined contemporary high-rise hotel perched above the dazzling lights of Shiodome and Ginza.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
      }
    ];
  }

  if (lower.includes('moscow') || lower.includes('russia')) {
    return [
      {
        id: 'ht-moscow-metropol',
        name: 'Hotel Metropol Moscow',
        location: 'Teatralny Proezd 2, Tverskoy',
        neighborhood: 'Red Square & Bolshoi Theatre District',
        city: 'Moscow',
        pricePerNight: 8900,
        rating: 4.9,
        reviewCount: 2980,
        imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        tag: 'Historic Landmark',
        distanceFromHub: '300m from Teatralnaya Metro · 5 mins from Red Square',
        roomType: 'Grand Historical Deluxe Room',
        amenities: ['Stained-Glass Dome Breakfast Hall', 'Finnish Sauna', 'Concierge Desk', 'Complimentary Wi-Fi'],
        cancellationPolicy: 'Free cancellation up to 24 hours prior to arrival.',
        description: 'Legendary Art Nouveau hotel opposite the Bolshoi Theatre featuring historic murals, stained glass, and royal service.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
      },
      {
        id: 'ht-moscow-radisson',
        name: 'Radisson Collection Hotel Moscow',
        location: 'Kutuzovsky Prospekt 2/1',
        neighborhood: 'Moskva River Promenade',
        city: 'Moscow',
        pricePerNight: 7800,
        rating: 4.8,
        reviewCount: 3100,
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        tag: 'Stalinist Skyscraper Landmark',
        distanceFromHub: '1.2 km from Kievsky Station · River Yacht Pier',
        roomType: 'Collection River View Room',
        amenities: ['Private Moskva River Yacht Fleet', '50m Olympic Indoor Pool', 'Royal Spa', 'Panoramic View Bar'],
        cancellationPolicy: 'Free cancellation up to 48 hours prior.',
        description: 'Set within one of the iconic Seven Sisters skyscrapers rising dramatically along the bend of the Moskva river.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
      }
    ];
  }

  if (lower.includes('new york') || lower.includes('nyc')) {
    return [
      {
        id: 'ht-nyc-times-square',
        name: 'The Manhattan Times Square Hotel',
        location: '790 7th Ave at 51st St',
        neighborhood: 'Midtown Manhattan',
        city: 'New York',
        pricePerNight: 11200,
        rating: 4.7,
        reviewCount: 4500,
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        tag: 'Heart of Midtown',
        distanceFromHub: '3 blocks from Grand Central · Direct Subway line',
        roomType: 'Skyline Deluxe King Room',
        amenities: ['Fitness Center', 'High-Speed Wi-Fi', '24/7 Concierge', 'Luggage Storage'],
        cancellationPolicy: 'Free cancellation up to 24 hours prior to check-in.',
        description: 'Immerse in the energy of Broadway and Times Square with stylish Midtown Manhattan accommodations.',
        providerName: 'Amadeus Hotel Inventory (Sandbox)',
        isLiveProvider: false
      }
    ];
  }

  // Universal Default for Any Other Destination (e.g. Vijayawada, Anakapalle, Goa, Delhi, Mumbai, Paris, Sydney, etc.)
  const cleanSlug = city.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return [
    {
      id: `ht-grand-${cleanSlug}-1`,
      name: `Grand Central Hotel ${city}`,
      location: `Station Road, ${city} Center`,
      neighborhood: `${city} Promenade`,
      city: city,
      pricePerNight: 3800,
      rating: 4.6,
      reviewCount: 1120,
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      tag: 'City Center Choice',
      distanceFromHub: `1.8 km from ${city} Central Hub`,
      roomType: 'Executive Deluxe AC Room',
      amenities: ['Complimentary Breakfast', 'High-Speed Wi-Fi', 'Room Service', 'Airport/Station Cab Desk'],
      cancellationPolicy: 'Free cancellation until 24 hours before check-in.',
      description: `Contemporary premier hotel located close to key transit hubs and cultural landmarks in ${city}.`,
      providerName: 'Amadeus Hotel Inventory (Sandbox)',
      isLiveProvider: false
    },
    {
      id: `ht-residency-${cleanSlug}-2`,
      name: `${city} Residency & Suites`,
      location: `Commercial District, ${city}`,
      neighborhood: `${city} Central`,
      city: city,
      pricePerNight: 2450,
      rating: 4.4,
      reviewCount: 780,
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      tag: 'Business & Family',
      distanceFromHub: `2.4 km from ${city} Junction`,
      roomType: 'Standard Double Bed Room',
      amenities: ['Free Wi-Fi', 'Hot Water 24/7', 'Daily Housekeeping', 'Air Conditioning'],
      cancellationPolicy: 'Free cancellation up to 24 hours prior.',
      description: `Spacious, clean air-conditioned rooms designed for business commuters and holiday travelers in ${city}.`,
      providerName: 'Amadeus Hotel Inventory (Sandbox)',
      isLiveProvider: false
    },
    {
      id: `ht-budget-${cleanSlug}-3`,
      name: `Treebo Trend Transit Inn ${city}`,
      location: `Near Bus Complex & Railway Gate, ${city}`,
      neighborhood: `${city} Transit Gate`,
      city: city,
      pricePerNight: 1650,
      rating: 4.2,
      reviewCount: 540,
      imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      tag: 'Best Value Budget',
      distanceFromHub: `600 meters from ${city} Station`,
      roomType: 'Budget Cozy AC Room',
      amenities: ['Free Breakfast', 'Free Wi-Fi', '24-hour Front Desk'],
      cancellationPolicy: 'Full refund if cancelled 12h prior.',
      description: `Affordable, spotless hotel tailored for prompt transit check-in and check-out in ${city}.`,
      providerName: 'Amadeus Hotel Inventory (Sandbox)',
      isLiveProvider: false
    }
  ];
}
