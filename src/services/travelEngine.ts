import { TransportOption, SearchParams, TravelClassOption, LastMileOption } from '../types/travel';
import { resolveLocation, calculateDistanceKm } from '../data/locationsDatabase';

/**
 * Dynamic Travel Engine
 * Generates realistic, route-accurate multimodal travel options for ANY valid source and destination worldwide.
 * Calculates real geographic distances, stations, travel times, and realistic fares.
 */
export function searchTravelOptions(params: SearchParams): TransportOption[] {
  const origin = resolveLocation(params.fromCity);
  const destination = resolveLocation(params.toCity);

  // Calculate actual distance in km using geographic coordinates
  let distanceKm = calculateDistanceKm(origin.coordinates, destination.coordinates);
  if (distanceKm < 15) {
    distanceKm = 35; // Default local transit baseline if same city/area
  }

  const results: TransportOption[] = [];
  const fromName = origin.city || params.fromCity;
  const toName = destination.city || params.toCity;
  const routeSlug = `${fromName.toLowerCase().replace(/[^a-z0-9]/g, '')}-${toName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;

  const isCrossBorderOrIntercontinental = 
    distanceKm > 1600 || 
    origin.country !== destination.country || 
    origin.isInternational || 
    destination.isInternational;

  // Station/Terminal naming
  const trainOrigin = origin.type === 'station' ? origin.name : `${fromName} Central (${origin.code || 'STN'})`;
  const trainDest = destination.type === 'station' ? destination.name : `${toName} Central (${destination.code || 'STN'})`;

  const busOrigin = origin.type === 'bus_terminal' ? origin.name : `${fromName} Central Bus Terminal`;
  const busDest = destination.type === 'bus_terminal' ? destination.name : `${toName} Central Bus Station`;

  const flightOrigin = `${fromName} International Airport (${origin.nearestAirportCode || origin.code || 'ORG'})`;
  const flightDest = `${toName} International Airport (${destination.nearestAirportCode || destination.code || 'DST'})`;

  // -------------------------------------------------------------
  // A. INTERNATIONAL / LONG-HAUL INTERCONTINENTAL ROUTES (> 1600 km or Cross-Border)
  // -------------------------------------------------------------
  if (isCrossBorderOrIntercontinental) {
    // Flight 1: Premier Non-stop / Direct Flight
    const flightMinutes = Math.round(90 + (distanceKm / 850) * 60);
    const flHours = Math.floor(flightMinutes / 60);
    const flMins = flightMinutes % 60;
    const baseAirFare = Math.round(Math.max(12500, 7500 + distanceKm * 4.2));

    results.push({
      id: `fl-global-direct-${routeSlug}-1`,
      operatorName: `Global Skyways (${fromName} → ${toName})`,
      operatorCode: 'GS-802 / Star Alliance',
      transportType: 'flight',
      departureTime: '09:15',
      arrivalTime: calculateArrivalTime('09:15', flightMinutes),
      duration: `${flHours}h ${flMins}m`,
      durationMinutes: flightMinutes,
      originCity: fromName,
      destinationCity: toName,
      originTerminal: flightOrigin,
      destinationTerminal: flightDest,
      pricePerPassenger: baseAirFare,
      rating: 4.8,
      reviewCount: 4210,
      seatsAvailable: 14,
      isAc: true,
      seatingType: 'International Economy (Direct)',
      tag: 'Fastest Global Connection',
      providerName: 'Amadeus GDS / Global Airline Partner (Sandbox)',
      providerType: 'amadeus_gds',
      isLiveProvider: false,
      lastUpdated: 'Just now · Demo Data',
      availabilityStatus: 'Available',
      distanceKm,
      availableClasses: [
        { id: 'econ', name: 'Economy Standard', priceMultiplier: 1.0, features: ['2x 23kg check-in bags', '7kg cabin bag', 'Complimentary in-flight dining', 'Seatback screen'] },
        { id: 'prem_econ', name: 'Premium Economy', priceMultiplier: 1.45, features: ['Extra legroom wide seat', 'Priority boarding', 'Premium meal selection', 'Noise-cancelling headphones'] },
        { id: 'biz', name: 'Business Suite Lie-Flat', priceMultiplier: 2.8, features: ['Full lie-flat bed', 'Lounge access worldwide', 'Chauffeur airport transfer', 'Multi-course gourmet meal'] }
      ],
      amenities: ['In-flight Entertainment', 'Complimentary Hot Meals', 'Global Satellite Wi-Fi', '2x23kg Check-in Bag'],
      routeStops: [
        { station: flightOrigin, time: '09:15 Takeoff', day: 1 },
        { station: flightDest, time: calculateArrivalTime('09:15', flightMinutes) + ' Touchdown', day: 1 }
      ],
      fareBreakdown: {
        baseFare: Math.round(baseAirFare * 0.75),
        operatorFee: 450,
        taxesAndGst: Math.round(baseAirFare * 0.15),
        convenienceFee: 250,
        totalPerPerson: baseAirFare
      },
      cancellationPolicy: 'Refundable with standard airline cancellation fee up to 24 hours prior to departure.',
      reviews: [{ id: 'rev-fl1', userName: 'Alexandre P.', rating: 5, date: '3 days ago', comment: 'Smooth international connection, courteous cabin crew.' }]
    });

    // Flight 2: Flag Carrier / 1-Stop Connecting Option
    const layoverMinutes = 105;
    const connectingMinutes = flightMinutes + layoverMinutes;
    const cHours = Math.floor(connectingMinutes / 60);
    const cMins = connectingMinutes % 60;
    const budgetFlightFare = Math.round(baseAirFare * 0.82);

    results.push({
      id: `fl-skyteam-${routeSlug}-2`,
      operatorName: `Trans-World Express (${fromName} → ${toName})`,
      operatorCode: 'TW-419 / SkyTeam',
      transportType: 'flight',
      departureTime: '14:30',
      arrivalTime: calculateArrivalTime('14:30', connectingMinutes),
      duration: `${cHours}h ${cMins}m (1-Stop)`,
      durationMinutes: connectingMinutes,
      originCity: fromName,
      destinationCity: toName,
      originTerminal: flightOrigin,
      destinationTerminal: flightDest,
      pricePerPassenger: budgetFlightFare,
      rating: 4.6,
      reviewCount: 3180,
      seatsAvailable: 9,
      isAc: true,
      seatingType: 'Economy Saver (1-Stop Transit)',
      tag: 'Best International Value',
      providerName: 'Amadeus GDS / Global Partner (Sandbox)',
      providerType: 'amadeus_gds',
      isLiveProvider: false,
      lastUpdated: 'Just now · Demo Data',
      availabilityStatus: 'Available',
      distanceKm,
      availableClasses: [
        { id: 'saver', name: 'Economy Value', priceMultiplier: 1.0, features: ['1x 23kg check-in bag', 'In-flight snack and drink'] },
        { id: 'flex', name: 'Economy Flexible', priceMultiplier: 1.25, features: ['Free date change', '2x 23kg baggage included'] }
      ],
      amenities: ['Free Checked Luggage', 'Comfort Seating', 'USB Charging', 'Transit Hub Transfer'],
      routeStops: [
        { station: flightOrigin, time: '14:30 Departure', day: 1 },
        { station: 'International Transit Hub', time: '+5h (1h 45m Layover)', day: 1 },
        { station: flightDest, time: calculateArrivalTime('14:30', connectingMinutes) + ' Arrival', day: 1 }
      ],
      fareBreakdown: {
        baseFare: Math.round(budgetFlightFare * 0.78),
        operatorFee: 380,
        taxesAndGst: Math.round(budgetFlightFare * 0.14),
        convenienceFee: 200,
        totalPerPerson: budgetFlightFare
      },
      cancellationPolicy: 'Refundable with standard fee up to 12 hours before first leg.',
      reviews: [{ id: 'rev-fl2', userName: 'Elena R.', rating: 4.5, date: '1 week ago', comment: 'Great value for international route, smooth baggage transfer.' }]
    });

    // Flight 3: Evening Premium Service
    results.push({
      id: `fl-emirates-partner-${routeSlug}-3`,
      operatorName: `Air Intercontinental (${fromName} → ${toName})`,
      operatorCode: 'IC-912',
      transportType: 'flight',
      departureTime: '21:40',
      arrivalTime: calculateArrivalTime('21:40', flightMinutes),
      duration: `${flHours}h ${flMins}m`,
      durationMinutes: flightMinutes,
      originCity: fromName,
      destinationCity: toName,
      originTerminal: flightOrigin,
      destinationTerminal: flightDest,
      pricePerPassenger: Math.round(baseAirFare * 1.15),
      rating: 4.9,
      reviewCount: 5600,
      seatsAvailable: 5,
      isAc: true,
      seatingType: 'Widebody Dreamliner Cabin',
      tag: 'Top Rated Airline',
      providerName: 'Amadeus GDS / Global Alliance (Sandbox)',
      providerType: 'amadeus_gds',
      isLiveProvider: false,
      lastUpdated: 'Just now · Demo Data',
      availabilityStatus: 'Filling Fast',
      distanceKm,
      availableClasses: [
        { id: 'econ', name: 'Economy Classic', priceMultiplier: 1.0, features: ['Standard baggage', 'Hot dinner served'] },
        { id: 'biz', name: 'Business Class Lie-Flat', priceMultiplier: 2.7, features: ['Exclusive lounge access', 'Chef-prepared meals', 'Priority check-in'] }
      ],
      amenities: ['Boeing 787 / Airbus A350', 'Individual Touchscreen', 'Generous Recline', 'Duty Free In-Flight'],
      routeStops: [
        { station: flightOrigin, time: '21:40 Departure', day: 1 },
        { station: flightDest, time: calculateArrivalTime('21:40', flightMinutes) + ' Arrival', day: 2 }
      ],
      fareBreakdown: {
        baseFare: Math.round(baseAirFare * 1.15 * 0.76),
        operatorFee: 500,
        taxesAndGst: Math.round(baseAirFare * 1.15 * 0.15),
        convenienceFee: 250,
        totalPerPerson: Math.round(baseAirFare * 1.15)
      },
      cancellationPolicy: 'Full refund minus service fee if cancelled 48h prior.',
      reviews: [{ id: 'rev-fl3', userName: 'Michael T.', rating: 5, date: '2 weeks ago', comment: 'Extremely comfortable widebody aircraft.' }]
    });

    return results;
  }

  // -------------------------------------------------------------
  // B. SHORT CORRIDOR ROUTES (< 100 km, e.g. Anakapalle -> Visakhapatnam ~33km)
  // -------------------------------------------------------------
  if (distanceKm <= 100) {
    // Train 1: Superfast Rail
    results.push({
      id: `tr-superfast-${routeSlug}-1`,
      operatorName: `${fromName} - ${toName} Superfast Express`,
      operatorCode: '12728 / Rail Intercity',
      transportType: 'train',
      departureTime: '06:15',
      arrivalTime: '07:05',
      duration: '50m',
      durationMinutes: 50,
      originCity: fromName,
      destinationCity: toName,
      originTerminal: trainOrigin,
      destinationTerminal: trainDest,
      pricePerPassenger: 85,
      rating: 4.6,
      reviewCount: 1420,
      seatsAvailable: 48,
      isAc: false,
      seatingType: 'Second Seating (2S) / AC Chair Car',
      tag: 'Fastest Morning',
      providerName: 'National Railway System (IRCTC / Sandbox)',
      providerType: 'irctc',
      isLiveProvider: false,
      lastUpdated: 'Just now · Demo Data',
      availabilityStatus: 'Available',
      distanceKm,
      availableClasses: [
        { id: '2s', name: 'Second Seating (2S)', priceMultiplier: 1.0, features: ['Reserved padded seat', 'Express speed'] },
        { id: 'cc', name: 'AC Chair Car (CC)', priceMultiplier: 3.5, features: ['Air-conditioned comfort', 'Large scenic window'] }
      ],
      amenities: ['Reserved Seating', 'Mobile Charging', 'Rapid Transit'],
      routeStops: [
        { station: trainOrigin, time: '06:15 Departure', day: 1 },
        { station: `${fromName} Suburban`, time: '06:38', day: 1 },
        { station: trainDest, time: '07:05 Arrival', day: 1 }
      ],
      fareBreakdown: { baseFare: 65, operatorFee: 10, taxesAndGst: 5, convenienceFee: 5, totalPerPerson: 85 },
      cancellationPolicy: 'Full refund minus small clerkage before departure.',
      reviews: [{ id: 'r1', userName: 'Ramesh K.', rating: 5, date: '2 days ago', comment: 'Punctual and very convenient commuter service.' }]
    });

    // Train 2: Daytime Express
    results.push({
      id: `tr-intercity-${routeSlug}-2`,
      operatorName: `${fromName} Express Intercity`,
      operatorCode: '17016 / Express',
      transportType: 'train',
      departureTime: '08:45',
      arrivalTime: '09:30',
      duration: '45m',
      durationMinutes: 45,
      originCity: fromName,
      destinationCity: toName,
      originTerminal: trainOrigin,
      destinationTerminal: trainDest,
      pricePerPassenger: 65,
      rating: 4.4,
      reviewCount: 980,
      seatsAvailable: 62,
      isAc: false,
      seatingType: 'Unreserved / 2S Express',
      tag: 'Most Economical',
      providerName: 'Regional Rail Transit (Sandbox)',
      providerType: 'irctc',
      isLiveProvider: false,
      lastUpdated: 'Just now · Demo Data',
      availabilityStatus: 'Available',
      distanceKm,
      availableClasses: [
        { id: '2s', name: 'General Second Class (2S)', priceMultiplier: 1.0, features: ['Padded seating', 'Daily commuter pass eligible'] }
      ],
      amenities: ['Direct Rail Corridor', 'Multiple Daily Halts'],
      routeStops: [
        { station: trainOrigin, time: '08:45 Departure', day: 1 },
        { station: trainDest, time: '09:30 Arrival', day: 1 }
      ],
      fareBreakdown: { baseFare: 50, operatorFee: 5, taxesAndGst: 5, convenienceFee: 5, totalPerPerson: 65 },
      cancellationPolicy: 'Standard railway refund guidelines apply.',
      reviews: [{ id: 'r2', userName: 'Sunil V.', rating: 4, date: '1 week ago', comment: 'Smooth 45 minute ride.' }]
    });

    // Bus 1: Express Highway Transit Bus
    results.push({
      id: `bus-express-${routeSlug}-1`,
      operatorName: `${fromName} - ${toName} AC Highway Express`,
      operatorCode: 'RTC-EXP-08',
      transportType: 'bus',
      departureTime: '07:30',
      arrivalTime: '08:25',
      duration: '55m',
      durationMinutes: 55,
      originCity: fromName,
      destinationCity: toName,
      originTerminal: busOrigin,
      destinationTerminal: busDest,
      pricePerPassenger: 90,
      rating: 4.5,
      reviewCount: 650,
      seatsAvailable: 24,
      isAc: true,
      seatingType: 'AC Push-Back Seating',
      tag: 'Frequent Departures (Every 20m)',
      providerName: 'State Transit Fleet (Sandbox)',
      providerType: 'bus_network',
      isLiveProvider: false,
      lastUpdated: 'Just now · Demo Data',
      availabilityStatus: 'Available',
      distanceKm,
      availableClasses: [
        { id: 'ac_seater', name: 'AC Seater', priceMultiplier: 1.0, features: ['Air-conditioned comfort', 'Pushback seats', 'Highway express non-stop'] }
      ],
      amenities: ['AC Cooling', 'USB Phone Charging', 'Non-stop Highway Corridor'],
      routeStops: [
        { station: busOrigin, time: '07:30 Departure', day: 1 },
        { station: busDest, time: '08:25 Arrival', day: 1 }
      ],
      fareBreakdown: { baseFare: 75, operatorFee: 5, taxesAndGst: 5, convenienceFee: 5, totalPerPerson: 90 },
      cancellationPolicy: 'Refundable up to 2 hours prior.',
      reviews: [{ id: 'b1', userName: 'Kavitha P.', rating: 4.5, date: '4 days ago', comment: 'High frequency and departs right on schedule.' }]
    });

    // Bus 2: Local Suburban Shuttle
    results.push({
      id: `bus-suburban-${routeSlug}-2`,
      operatorName: `Suburban City Transit (${fromName} → ${toName})`,
      operatorCode: 'SCT-401',
      transportType: 'bus',
      departureTime: '09:00',
      arrivalTime: '10:05',
      duration: '1h 05m',
      durationMinutes: 65,
      originCity: fromName,
      destinationCity: toName,
      originTerminal: busOrigin,
      destinationTerminal: busDest,
      pricePerPassenger: 50,
      rating: 4.2,
      reviewCount: 420,
      seatsAvailable: 35,
      isAc: false,
      seatingType: 'Regular City Express',
      tag: 'Budget Commuter',
      providerName: 'Suburban Bus Network (Sandbox)',
      providerType: 'bus_network',
      isLiveProvider: false,
      lastUpdated: 'Just now · Demo Data',
      availabilityStatus: 'Available',
      distanceKm,
      availableClasses: [
        { id: 'std', name: 'Standard Seat', priceMultiplier: 1.0, features: ['City hop-on transit', 'Luggage space'] }
      ],
      amenities: ['Multiple City Stops', 'Frequent Timings'],
      routeStops: [
        { station: busOrigin, time: '09:00 Departure', day: 1 },
        { station: busDest, time: '10:05 Arrival', day: 1 }
      ],
      fareBreakdown: { baseFare: 40, operatorFee: 5, taxesAndGst: 3, convenienceFee: 2, totalPerPerson: 50 },
      cancellationPolicy: 'Standard transit policy.',
      reviews: [{ id: 'b2', userName: 'Mahesh G.', rating: 4, date: '3 days ago', comment: 'Inexpensive and regular.' }]
    });

    return results;
  }

  // -------------------------------------------------------------
  // C. DOMESTIC / REGIONAL OVERLAND CORRIDORS (100 km - 1600 km)
  // -------------------------------------------------------------
  // Speed: ~75 km/h for Express, ~90 km/h for Vande Bharat
  const vandeHours = Math.max(1.5, distanceKm / 85);
  const vandeMinutes = Math.round(vandeHours * 60);
  const vandeHoursInt = Math.floor(vandeMinutes / 60);
  const vandeRemMin = vandeMinutes % 60;
  const vandeFare = Math.round(Math.max(450, distanceKm * 2.3));

  // Train 1: Vande Bharat Express
  results.push({
    id: `tr-vande-${routeSlug}-1`,
    operatorName: `${fromName} - ${toName} Vande Bharat Express`,
    operatorCode: '20833 / VBE',
    transportType: 'train',
    departureTime: '06:00',
    arrivalTime: calculateArrivalTime('06:00', vandeMinutes),
    duration: `${vandeHoursInt}h ${vandeRemMin}m`,
    durationMinutes: vandeMinutes,
    originCity: fromName,
    destinationCity: toName,
    originTerminal: trainOrigin,
    destinationTerminal: trainDest,
    pricePerPassenger: vandeFare,
    rating: 4.8,
    reviewCount: 3840,
    seatsAvailable: 28,
    isAc: true,
    seatingType: 'AC Chair Car (CC)',
    tag: 'Fastest Train',
    providerName: 'Indian Railways (IRCTC Sandbox)',
    providerType: 'irctc',
    isLiveProvider: false,
    lastUpdated: 'Just now · Demo Data',
    availabilityStatus: 'Available',
    distanceKm,
    availableClasses: [
      { id: 'cc', name: 'AC Chair Car (CC)', priceMultiplier: 1.0, features: ['Comfortable 2x3 rotatable seating', 'Hot breakfast included', '180W USB-C ports'] },
      { id: 'ec', name: 'Executive Chair Car (EC)', priceMultiplier: 1.85, features: ['Plush 2x2 luxury seating', 'Extra legroom & footrest', 'Multi-course meal', 'Priority boarding'] }
    ],
    amenities: ['High-Speed Wi-Fi', 'Hot Meals & Beverages', 'Rotatable Seats', 'Bio-vacuum Restrooms'],
    routeStops: [
      { station: trainOrigin, time: '06:00 Departure', day: 1 },
      { station: 'Intermediate Junction', time: '+2h 15m', day: 1 },
      { station: trainDest, time: `+${vandeHoursInt}h ${vandeRemMin}m Arrival`, day: 1 }
    ],
    fareBreakdown: {
      baseFare: Math.round(vandeFare * 0.8),
      operatorFee: 50,
      taxesAndGst: Math.round(vandeFare * 0.08),
      convenienceFee: 40,
      totalPerPerson: vandeFare
    },
    cancellationPolicy: 'Full refund minus clerkage up to 48 hours prior.',
    reviews: [{ id: 'vb1', userName: 'Vikram S.', rating: 5, date: '3 days ago', comment: 'Punctual, clean, and top-tier service.' }]
  });

  // Train 2: Overnight Superfast Express
  const expressMinutes = Math.round((distanceKm / 65) * 60);
  const expHours = Math.floor(expressMinutes / 60);
  const expMin = expressMinutes % 60;
  const expFare = Math.round(Math.max(380, distanceKm * 1.55));

  results.push({
    id: `tr-superfast-${routeSlug}-2`,
    operatorName: `${fromName} - ${toName} Superfast Express`,
    operatorCode: '12727 / SCR',
    transportType: 'train',
    departureTime: '18:15',
    arrivalTime: calculateArrivalTime('18:15', expressMinutes),
    duration: `${expHours}h ${expMin}m`,
    durationMinutes: expressMinutes,
    originCity: fromName,
    destinationCity: toName,
    originTerminal: trainOrigin,
    destinationTerminal: trainDest,
    pricePerPassenger: expFare,
    rating: 4.5,
    reviewCount: 4120,
    seatsAvailable: 42,
    isAc: true,
    seatingType: 'AC 3 Tier (3A)',
    tag: 'Best Overnight',
    providerName: 'South Central Railway (IRCTC Sandbox)',
    providerType: 'irctc',
    isLiveProvider: false,
    lastUpdated: 'Just now · Demo Data',
    availabilityStatus: 'Available',
    distanceKm,
    availableClasses: [
      { id: 'sl', name: 'Sleeper Class (SL)', priceMultiplier: 0.45, features: ['Non-AC berth', 'Open windows', 'Economical'] },
      { id: '3a', name: 'AC 3 Tier (3A)', priceMultiplier: 1.0, features: ['Air-conditioned sleeping berth', 'Bedroll and blanket', 'Reading lights'] },
      { id: '2a', name: 'AC 2 Tier (2A)', priceMultiplier: 1.55, features: ['Spacious wide berths', 'Privacy curtains', 'Personal reading lamp'] }
    ],
    amenities: ['Bedroll Included', 'Pantry Onboard', 'Charging Points'],
    routeStops: [
      { station: trainOrigin, time: '18:15 Departure', day: 1 },
      { station: trainDest, time: calculateArrivalTime('18:15', expressMinutes) + ' Arrival', day: 2 }
    ],
    fareBreakdown: {
      baseFare: Math.round(expFare * 0.8),
      operatorFee: 40,
      taxesAndGst: Math.round(expFare * 0.08),
      convenienceFee: 35,
      totalPerPerson: expFare
    },
    cancellationPolicy: 'Refundable as per railway rules with instant wallet credit.',
    reviews: [{ id: 'sf1', userName: 'Anand R.', rating: 4.5, date: '1 week ago', comment: 'Comfortable overnight journey.' }]
  });

  // Train 3: Daytime Intercity SF Express
  const intercityMinutes = Math.round((distanceKm / 68) * 60);
  const intHours = Math.floor(intercityMinutes / 60);
  const intMin = intercityMinutes % 60;
  const intFare = Math.round(Math.max(280, distanceKm * 1.15));

  results.push({
    id: `tr-intercity-${routeSlug}-3`,
    operatorName: `${fromName} - ${toName} Intercity SF`,
    operatorCode: '12805 / ECoR',
    transportType: 'train',
    departureTime: '06:30',
    arrivalTime: calculateArrivalTime('06:30', intercityMinutes),
    duration: `${intHours}h ${intMin}m`,
    durationMinutes: intercityMinutes,
    originCity: fromName,
    destinationCity: toName,
    originTerminal: trainOrigin,
    destinationTerminal: trainDest,
    pricePerPassenger: intFare,
    rating: 4.3,
    reviewCount: 2890,
    seatsAvailable: 56,
    isAc: false,
    seatingType: 'Second Seating (2S) & AC Chair Car',
    tag: 'Daytime Saver',
    providerName: 'East Coast Railway (IRCTC Sandbox)',
    providerType: 'irctc',
    isLiveProvider: false,
    lastUpdated: 'Just now · Demo Data',
    availabilityStatus: 'Available',
    distanceKm,
    availableClasses: [
      { id: '2s', name: 'Second Seating (2S)', priceMultiplier: 1.0, features: ['Reserved padded seat', 'Scenic window'] },
      { id: 'cc', name: 'AC Chair Car (CC)', priceMultiplier: 2.8, features: ['Full air conditioning', 'Pantry service'] }
    ],
    amenities: ['Reserved Seat', 'Pantry Vendors', 'Power Outlets'],
    routeStops: [
      { station: trainOrigin, time: '06:30 Departure', day: 1 },
      { station: trainDest, time: calculateArrivalTime('06:30', intercityMinutes) + ' Arrival', day: 1 }
    ],
    fareBreakdown: {
      baseFare: Math.round(intFare * 0.8),
      operatorFee: 25,
      taxesAndGst: Math.round(intFare * 0.08),
      convenienceFee: 25,
      totalPerPerson: intFare
    },
    cancellationPolicy: 'Standard railway refund guidelines apply.',
    reviews: [{ id: 'ic1', userName: 'Bhavani S.', rating: 4.5, date: '5 days ago', comment: 'Pleasant daytime travel experience.' }]
  });

  // Bus 1: Multi-Axle Volvo AC Sleeper
  const busSpeedKm = 52;
  const busMinutes = Math.round((distanceKm / busSpeedKm) * 60);
  const busHours = Math.floor(busMinutes / 60);
  const busRemMin = busMinutes % 60;
  const volvoFare = Math.round(Math.max(480, distanceKm * 1.85));

  results.push({
    id: `bus-volvo-${routeSlug}-1`,
    operatorName: `Orange Travels Volvo Multi-Axle (${fromName} → ${toName})`,
    operatorCode: 'OT-SLEEPER-91',
    transportType: 'bus',
    departureTime: '21:00',
    arrivalTime: calculateArrivalTime('21:00', busMinutes),
    duration: `${busHours}h ${busRemMin}m`,
    durationMinutes: busMinutes,
    originCity: fromName,
    destinationCity: toName,
    originTerminal: busOrigin,
    destinationTerminal: busDest,
    pricePerPassenger: volvoFare,
    rating: 4.7,
    reviewCount: 2940,
    seatsAvailable: 18,
    isAc: true,
    seatingType: 'Volvo Multi-Axle AC Sleeper (2+1)',
    tag: 'Top Rated Sleeper',
    providerName: 'AbhiBus / Private Fleet Network (Sandbox)',
    providerType: 'bus_network',
    isLiveProvider: false,
    lastUpdated: 'Just now · Demo Data',
    availabilityStatus: 'Available',
    distanceKm,
    availableClasses: [
      { id: 'single_sleeper', name: 'Upper Single Sleeper', priceMultiplier: 1.0, features: ['Private single berth', 'Curtains', 'Blanket'] },
      { id: 'double_sleeper', name: 'Lower Double Sleeper', priceMultiplier: 1.25, features: ['Lower deck comfortable bed', 'Extra headroom', 'USB charger'] }
    ],
    amenities: ['AC Louvers', 'Clean Bedding', 'Water Bottle', 'Live GPS Tracking'],
    routeStops: [
      { station: busOrigin, time: '21:00 Boarding', day: 1 },
      { station: 'Highway Food Court', time: '+4h (30m Halt)', day: 1 },
      { station: busDest, time: calculateArrivalTime('21:00', busMinutes) + ' Dropping', day: 2 }
    ],
    fareBreakdown: {
      baseFare: Math.round(volvoFare * 0.8),
      operatorFee: 40,
      taxesAndGst: Math.round(volvoFare * 0.08),
      convenienceFee: 35,
      totalPerPerson: volvoFare
    },
    cancellationPolicy: '100% refund up to 12 hours prior to departure.',
    reviews: [{ id: 'b3', userName: 'Divya M.', rating: 4.8, date: '3 days ago', comment: 'Spotless mattress and on time arrival.' }]
  });

  // Bus 2: State RTC Super Luxury
  const budgetBusFare = Math.round(volvoFare * 0.72);
  results.push({
    id: `bus-rtc-${routeSlug}-2`,
    operatorName: `State RTC Super Luxury (${fromName} → ${toName})`,
    operatorCode: 'RTC-SL-902',
    transportType: 'bus',
    departureTime: '20:15',
    arrivalTime: calculateArrivalTime('20:15', busMinutes + 30),
    duration: `${busHours}h ${busRemMin + 30}m`,
    durationMinutes: busMinutes + 30,
    originCity: fromName,
    destinationCity: toName,
    originTerminal: busOrigin,
    destinationTerminal: busDest,
    pricePerPassenger: budgetBusFare,
    rating: 4.3,
    reviewCount: 5120,
    seatsAvailable: 26,
    isAc: true,
    seatingType: 'AC Semi-Sleeper',
    tag: 'Budget Friendly',
    providerName: 'State Transport Corporation (Sandbox)',
    providerType: 'bus_network',
    isLiveProvider: false,
    lastUpdated: 'Just now · Demo Data',
    availabilityStatus: 'Available',
    distanceKm,
    availableClasses: [
      { id: 'semi_sleeper', name: 'Push-back Semi Sleeper', priceMultiplier: 1.0, features: ['Ergonomic pushback', 'Safe drivers'] }
    ],
    amenities: ['Government Regulated', 'Sanitized Coach', 'Mineral Water'],
    routeStops: [
      { station: busOrigin, time: '20:15 Boarding', day: 1 },
      { station: busDest, time: calculateArrivalTime('20:15', busMinutes + 30) + ' Dropping', day: 2 }
    ],
    fareBreakdown: {
      baseFare: Math.round(budgetBusFare * 0.8),
      operatorFee: 25,
      taxesAndGst: Math.round(budgetBusFare * 0.08),
      convenienceFee: 25,
      totalPerPerson: budgetBusFare
    },
    cancellationPolicy: 'Full refund minus small booking fee.',
    reviews: [{ id: 'b4', userName: 'Bhanu Teja', rating: 4.5, date: '2 weeks ago', comment: 'Reliable and safe overnight driving.' }]
  });

  // Flights (if distance >= 150 km)
  if (distanceKm >= 150) {
    const flightDurationMinutes = Math.round(60 + (distanceKm / 750) * 40);
    const flHours = Math.floor(flightDurationMinutes / 60);
    const flMins = flightDurationMinutes % 60;
    const flightFare = Math.round(Math.max(3400, 2400 + distanceKm * 2.2));

    results.push({
      id: `fl-indigo-${routeSlug}-1`,
      operatorName: `IndiGo (${fromName} → ${toName})`,
      operatorCode: '6E-421',
      transportType: 'flight',
      departureTime: '08:30',
      arrivalTime: calculateArrivalTime('08:30', flightDurationMinutes),
      duration: `${flHours}h ${flMins}m`,
      durationMinutes: flightDurationMinutes,
      originCity: fromName,
      destinationCity: toName,
      originTerminal: flightOrigin,
      destinationTerminal: flightDest,
      pricePerPassenger: flightFare,
      rating: 4.7,
      reviewCount: 5120,
      seatsAvailable: 9,
      isAc: true,
      seatingType: 'Economy Saver',
      tag: 'Fastest Overall',
      providerName: 'Amadeus GDS / Airline Partner (Sandbox)',
      providerType: 'amadeus_gds',
      isLiveProvider: false,
      lastUpdated: 'Just now · Demo Data',
      availabilityStatus: 'Available',
      distanceKm,
      availableClasses: [
        { id: 'saver', name: 'Economy Saver', priceMultiplier: 1.0, features: ['7kg cabin bag included', '15kg check-in bag included', 'Standard seat selection'] },
        { id: 'flexi', name: 'Flexi Plus', priceMultiplier: 1.35, features: ['Free date change', 'Complimentary sandwich and beverage', 'Priority check-in and boarding'] }
      ],
      amenities: ['15kg Check-in Included', '7kg Hand Baggage', 'Web Check-in', 'Mobile Boarding Pass'],
      routeStops: [
        { station: flightOrigin, time: '08:30 Takeoff', day: 1 },
        { station: flightDest, time: calculateArrivalTime('08:30', flightDurationMinutes) + ' Touchdown', day: 1 }
      ],
      fareBreakdown: {
        baseFare: Math.round(flightFare * 0.78),
        operatorFee: 250,
        taxesAndGst: Math.round(flightFare * 0.12),
        convenienceFee: 120,
        totalPerPerson: flightFare
      },
      cancellationPolicy: 'Refundable with standard airline cancellation fee up to 2 hours before flight.',
      reviews: [{ id: 'f1', userName: 'Sunil V.', rating: 5, date: 'Yesterday', comment: 'Quick flight, departed and arrived exactly on time.' }]
    });

    results.push({
      id: `fl-airindia-${routeSlug}-2`,
      operatorName: `Air India Express (${fromName} → ${toName})`,
      operatorCode: 'IX-983',
      transportType: 'flight',
      departureTime: '18:45',
      arrivalTime: calculateArrivalTime('18:45', flightDurationMinutes),
      duration: `${flHours}h ${flMins}m`,
      durationMinutes: flightDurationMinutes,
      originCity: fromName,
      destinationCity: toName,
      originTerminal: flightOrigin,
      destinationTerminal: flightDest,
      pricePerPassenger: Math.round(flightFare * 1.08),
      rating: 4.5,
      reviewCount: 3100,
      seatsAvailable: 6,
      isAc: true,
      seatingType: 'Economy Prime',
      tag: 'Evening Flight',
      providerName: 'Amadeus GDS / Airline Partner (Sandbox)',
      providerType: 'amadeus_gds',
      isLiveProvider: false,
      lastUpdated: 'Just now · Demo Data',
      availabilityStatus: 'Filling Fast',
      distanceKm,
      availableClasses: [
        { id: 'saver', name: 'Economy Standard', priceMultiplier: 1.0, features: ['15kg check-in bag', '7kg cabin bag'] },
        { id: 'prime', name: 'Prime Comfort', priceMultiplier: 1.3, features: ['Hot meal choice', 'Extra legroom seat', 'Free changes'] }
      ],
      amenities: ['15kg Check-in Included', 'Complimentary Snack Box', 'USB In-seat Power'],
      routeStops: [
        { station: flightOrigin, time: '18:45 Takeoff', day: 1 },
        { station: flightDest, time: calculateArrivalTime('18:45', flightDurationMinutes) + ' Touchdown', day: 1 }
      ],
      fareBreakdown: {
        baseFare: Math.round(flightFare * 0.8),
        operatorFee: 260,
        taxesAndGst: Math.round(flightFare * 0.12),
        convenienceFee: 120,
        totalPerPerson: Math.round(flightFare * 1.08)
      },
      cancellationPolicy: 'Cancellation with airline fee up to 3 hours prior.',
      reviews: [{ id: 'f2', userName: 'Ananya S.', rating: 4.5, date: '1 week ago', comment: 'Comfortable aircraft and smooth landing.' }]
    });
  }

  return results;
}

/**
 * Calculates arrival time given start "HH:MM" and duration in minutes
 */
function calculateArrivalTime(startTime: string, durationMinutes: number): string {
  const [hStr, mStr] = startTime.split(':');
  const startTotal = parseInt(hStr, 10) * 60 + parseInt(mStr, 10);
  const endTotal = (startTotal + durationMinutes) % 1440; // 24 hours
  const endHours = Math.floor(endTotal / 60);
  const endMins = endTotal % 60;
  return `${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`;
}

/**
 * Generates dynamic last-mile transportation options for ANY destination worldwide
 */
export function getLastMileOptions(destinationCity: string, arrivalTerminal?: string): LastMileOption[] {
  const city = destinationCity.trim() || 'Destination City';
  const hub = arrivalTerminal || `${city} Central Hub`;
  const lower = city.toLowerCase();

  let metroTitle = `${city} Metro Express`;
  let metroModel = 'Metro Rail Direct Transit';
  if (lower.includes('bengaluru') || lower.includes('bangalore')) {
    metroTitle = 'Namma Metro (Purple / Green Line)';
    metroModel = 'BMRCL Metro Direct Network';
  } else if (lower.includes('chennai') || lower.includes('madras')) {
    metroTitle = 'Chennai Metro Rail';
    metroModel = 'CMRL High-Frequency Network';
  } else if (lower.includes('hyderabad')) {
    metroTitle = 'Hyderabad Metro Express';
    metroModel = 'L&T Metro Rail (Blue Line Direct)';
  } else if (lower.includes('delhi')) {
    metroTitle = 'Delhi Metro Airport / City Express';
    metroModel = 'DMRC High-Speed Coach';
  } else if (lower.includes('tokyo') || lower.includes('japan')) {
    metroTitle = 'Tokyo Metro / Yamanote Line';
    metroModel = 'JR East High-Frequency Rapid Rail';
  } else if (lower.includes('moscow') || lower.includes('russia')) {
    metroTitle = 'Moscow Metro & Aeroexpress';
    metroModel = 'High-Speed Circle Line Direct';
  } else if (lower.includes('new york') || lower.includes('nyc')) {
    metroTitle = 'MTA Subway / JFK AirTrain';
    metroModel = 'Express Transit Direct';
  } else if (lower.includes('london')) {
    metroTitle = 'London Underground / Elizabeth Line';
    metroModel = 'TfL High-Capacity Crossrail';
  } else {
    metroTitle = `${city} Rapid Transit / Shuttle`;
    metroModel = `${city} Direct City Link`;
  }

  return [
    {
      id: `lm-cab-${city.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      type: 'cab',
      title: 'Private AC Cab (Sedan / Premium)',
      vehicleModel: 'Toyota Camry / Sedan AC',
      estimatedPrice: 480,
      estimatedTime: '25 - 30 mins',
      passengerCapacity: 4,
      rating: 4.8,
      pickupPoint: `${hub} (Designated Bay / Gate 1)`,
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
      id: `lm-shared-${city.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      type: 'shared',
      title: 'Airport / Station Transit Shuttle',
      vehicleModel: 'AC Mini Coach / Shuttle',
      estimatedPrice: 150,
      estimatedTime: '35 - 45 mins',
      passengerCapacity: 8,
      rating: 4.5,
      pickupPoint: `${hub} Shuttle Bay B`,
      popularFor: 'Solo & Budget Travelers',
      features: [
        'Direct route along major hotel corridors',
        'Economical per-seat pricing',
        'Air-conditioned comfortable seating',
        'Luggage assistance included'
      ]
    },
    {
      id: `lm-auto-${city.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      type: 'auto',
      title: 'Local Urban Cab / Express Rickshaw',
      vehicleModel: 'Eco City Transit Vehicle',
      estimatedPrice: 220,
      estimatedTime: '20 - 30 mins',
      passengerCapacity: 3,
      rating: 4.4,
      pickupPoint: `${hub} Transit Bay C`,
      popularFor: 'Quick Short Distance Transit',
      features: [
        'Fixed upfront fare (no haggling)',
        'Nimble in busy city traffic',
        'Immediate availability',
        'Direct electronic receipt'
      ]
    },
    {
      id: `lm-metro-${city.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      type: 'metro',
      title: metroTitle,
      vehicleModel: metroModel,
      estimatedPrice: 60,
      estimatedTime: '15 - 20 mins',
      passengerCapacity: 1,
      rating: 4.7,
      pickupPoint: `${hub} Metro / Transit Terminal Link`,
      popularFor: 'Zero Traffic & Fast Commute',
      features: [
        'High frequency service',
        'Zero road traffic congestion',
        'Air-conditioned rapid coach',
        'QR e-ticket direct barrier tap'
      ]
    }
  ];
}
