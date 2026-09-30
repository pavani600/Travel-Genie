export type TransportType = 'bus' | 'train' | 'flight';

export interface RouteStop {
  station: string;
  time: string;
  haltMinutes?: number;
  day?: number;
}

export interface FareBreakdown {
  baseFare: number;
  operatorFee: number;
  taxesAndGst: number;
  convenienceFee: number;
  totalPerPerson: number;
}

export interface TransportReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface TravelClassOption {
  id: string;
  name: string;
  priceMultiplier: number;
  features: string[];
}

export type AvailabilityStatus = 'Available' | 'Filling Fast' | 'RAC' | 'Waitlist' | 'Sold Out';

export interface TransportOption {
  id: string;
  operatorName: string;
  operatorCode: string;
  transportType: TransportType;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  durationMinutes: number;
  originCity: string;
  destinationCity: string;
  originTerminal: string;
  destinationTerminal: string;
  pricePerPassenger: number;
  rating: number;
  reviewCount: number;
  seatsAvailable: number;
  isAc: boolean;
  seatingType: string;
  amenities: string[];
  routeStops: RouteStop[];
  fareBreakdown: FareBreakdown;
  cancellationPolicy: string;
  reviews: TransportReview[];
  tag?: string;
  availableClasses?: TravelClassOption[];
  
  // Real-time Provider & Dynamic fields
  providerName?: string;
  providerType?: 'irctc' | 'bus_network' | 'amadeus_gds' | 'local_transit';
  isLiveProvider?: boolean;
  lastUpdated?: string;
  availabilityStatus?: AvailabilityStatus;
  availabilityBadge?: string;
  distanceKm?: number;
  bookingUrl?: string;
}

export interface LocationItem {
  id: string;
  name: string;
  code: string;
  type: 'city' | 'station' | 'airport' | 'bus_terminal' | 'country' | 'state' | 'locality';
  city: string;
  state: string;
  country: string;
  aliases: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  nearestAirportCode?: string;
  popular?: boolean;
  formattedAddress?: string;
  isInternational?: boolean;
}

export interface ProviderStatus {
  providerId: string;
  providerName: string;
  category: 'railway' | 'bus' | 'flight' | 'hotel' | 'local_transit';
  isLiveConnected: boolean;
  authStatus: 'connected' | 'missing_credentials' | 'sandbox_mode';
  statusMessage: string;
  lastSyncTime: string;
}

export interface DataTransparencyInfo {
  isLive: boolean;
  lastUpdated: string;
  providerAttribution: string;
  disclaimer: string;
}

export interface SearchResponse {
  query: SearchParams;
  results: TransportOption[];
  distanceKm: number;
  providerStatuses: Record<string, ProviderStatus>;
  dataTransparency: DataTransparencyInfo;
  emptyStateNotice?: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  neighborhood: string;
  city: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  amenities: string[];
  distanceFromHub: string;
  roomType: string;
  cancellationPolicy: string;
  description: string;
  tag?: string;
  providerName?: string;
  isLiveProvider?: boolean;
}

export type LastMileType = 'cab' | 'shared' | 'auto' | 'metro';

export interface LastMileOption {
  id: string;
  type: LastMileType;
  title: string;
  vehicleModel: string;
  estimatedPrice: number;
  estimatedTime: string;
  passengerCapacity: number;
  rating: number;
  pickupPoint: string;
  features: string[];
  popularFor: string;
  providerName?: string;
}

export interface PassengerDetail {
  id: string;
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  seatPreference: 'Window' | 'Aisle' | 'Lower Berth' | 'Upper Berth' | 'No Preference';
  seatAssigned?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
}

export interface LocalTransportBooking {
  option: LastMileOption;
  pickupLocation: string;
  dropLocation: string;
  passengerCount: number;
}

export interface HotelBookingConfig {
  hotel: Hotel | null;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  roomCount: number;
  guestCount: number;
  isIncluded: boolean;
}

export type BookingStatus = 
  | 'Draft'
  | 'Reviewing'
  | 'Awaiting Payment'
  | 'Payment Processing'
  | 'Confirmed'
  | 'Failed'
  | 'Cancelled';

export interface DynamicFareBreakdown {
  transportBase: number;
  transportClassAdjustment: number;
  transportTotal: number;
  localTransportTotal: number;
  hotelNights: number;
  hotelTotal: number;
  insurancePerPerson: number;
  insuranceTotal: number;
  taxesAndGst: number;
  convenienceFee: number;
  grandTotal: number;
}

export interface BookingDraft {
  id: string;
  bookingRef: string;
  status: BookingStatus;
  searchParams: SearchParams;
  transport: TransportOption | null;
  selectedClassId?: string;
  localTransport: LocalTransportBooking | null;
  hotelConfig: HotelBookingConfig | null;
  passengers: PassengerDetail[];
  contactInfo: ContactInfo;
  includeInsurance: boolean;
  fareBreakdown: DynamicFareBreakdown;
  priceRevalidated: boolean;
  revalidationAlert?: {
    type: 'fare_change' | 'seats_low' | 'verified';
    message: string;
    priceDelta?: number;
  } | null;
}

export interface BookingRecord {
  id: string;
  bookingRef: string;
  date: string;
  createdAt: string;
  origin: string;
  destination: string;
  passengerName: string;
  passengersCount: number;
  transport: TransportOption;
  selectedClassName?: string;
  lastMile?: LastMileOption;
  localTransportDetails?: {
    pickup: string;
    drop: string;
  };
  hotel?: Hotel;
  hotelDetails?: {
    nights: number;
    roomCount: number;
  };
  passengers?: PassengerDetail[];
  contactInfo?: ContactInfo;
  seatNumbers: string[];
  pnrOrTicket: string;
  totalAmount: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface SearchParams {
  fromCity: string;
  toCity: string;
  departureDate: string;
  returnDate?: string;
  departureTimePref: 'any' | 'morning' | 'afternoon' | 'night';
  passengers: number;
  budgetPref: 'all' | 'economy' | 'moderate' | 'luxury';
  transportTypePref?: 'all' | 'train' | 'bus' | 'flight';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  parsedSearch?: SearchParams;
  recommendations?: TransportOption[];
  hotelRecommendations?: Hotel[];
  suggestedPrompts?: string[];
  providerStatusNote?: string;
}
