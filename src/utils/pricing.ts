import { 
  TransportOption, 
  LocalTransportBooking, 
  HotelBookingConfig, 
  DynamicFareBreakdown 
} from '../types/travel';

export function calculateFare(params: {
  transport: TransportOption | null;
  selectedClassId?: string;
  passengersCount: number;
  localTransport: LocalTransportBooking | null;
  hotelConfig: HotelBookingConfig | null;
  includeInsurance: boolean;
}): DynamicFareBreakdown {
  const {
    transport,
    selectedClassId,
    passengersCount,
    localTransport,
    hotelConfig,
    includeInsurance
  } = params;

  // 1. Transport fare
  let transportBase = 0;
  let transportClassAdjustment = 0;

  if (transport) {
    const rawPerPax = transport.pricePerPassenger;
    let multiplier = 1.0;

    if (selectedClassId && transport.availableClasses) {
      const foundClass = transport.availableClasses.find(c => c.id === selectedClassId);
      if (foundClass) {
        multiplier = foundClass.priceMultiplier;
      }
    }

    const perPaxTotal = Math.round(rawPerPax * multiplier);
    transportBase = rawPerPax * passengersCount;
    transportClassAdjustment = (perPaxTotal - rawPerPax) * passengersCount;
  }

  const transportTotal = transportBase + transportClassAdjustment;

  // 2. Local transport
  let localTransportTotal = 0;
  if (localTransport) {
    localTransportTotal = localTransport.option.estimatedPrice;
  }

  // 3. Hotel accommodation
  let hotelTotal = 0;
  let hotelNights = 0;
  if (hotelConfig && hotelConfig.isIncluded && hotelConfig.hotel) {
    hotelNights = Math.max(1, hotelConfig.nights);
    const rooms = Math.max(1, hotelConfig.roomCount);
    hotelTotal = hotelConfig.hotel.pricePerNight * hotelNights * rooms;
  }

  // 4. Insurance
  const insurancePerPerson = 15;
  const insuranceTotal = includeInsurance ? insurancePerPerson * passengersCount : 0;

  // 5. Taxes & GST (5% on taxable services)
  const taxableSubtotal = transportTotal + hotelTotal + localTransportTotal;
  const taxesAndGst = Math.round(taxableSubtotal * 0.05);

  // 6. Convenience fee
  const convenienceFee = transport ? 60 : 0;

  // 7. Grand total
  const grandTotal = transportTotal + localTransportTotal + hotelTotal + insuranceTotal + taxesAndGst + convenienceFee;

  return {
    transportBase,
    transportClassAdjustment,
    transportTotal,
    localTransportTotal,
    hotelNights,
    hotelTotal,
    insurancePerPerson,
    insuranceTotal,
    taxesAndGst,
    convenienceFee,
    grandTotal
  };
}
