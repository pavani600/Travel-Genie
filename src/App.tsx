/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingStepper } from './components/booking/BookingStepper';

// Pages
import { HomePage } from './pages/HomePage';
import { TravelResultsPage } from './pages/TravelResultsPage';
import { LastMilePage } from './pages/LastMilePage';
import { HotelsPage } from './pages/HotelsPage';
import { JourneyReviewPage } from './pages/JourneyReviewPage';
import { PassengerDetailsPage } from './pages/PassengerDetailsPage';
import { PaymentPage } from './pages/PaymentPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { MyTripsPage } from './pages/MyTripsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { TransportDetailsModal } from './pages/TransportDetailsModal';
import { AuthModal } from './pages/AuthModal';

// Types & Services & Pricing
import { 
  TransportOption, 
  BookingRecord, 
  SearchParams,
  BookingStatus,
  PassengerDetail,
  ContactInfo,
  LocalTransportBooking,
  HotelBookingConfig
} from './types/travel';
import { SAMPLE_BOOKINGS } from './data/mockTravelData';
import { calculateFare } from './utils/pricing';
import { searchTravelOptions, getLastMileOptions } from './services/travelEngine';
import { getHotelsForDestination } from './services/hotelsEngine';

export default function App() {
  // Navigation active view:
  // 'home' (Step 1) | 'explore' (Step 2) | 'last-mile' (Step 3) | 'hotels' (Step 4) |
  // 'review' (Step 5) | 'passengers' (Step 6) | 'payment' (Step 7) | 'confirmation' (Step 8) |
  // 'trips' | 'assistant'
  const [activePage, setActivePage] = useState<string>('home');

  // Step index tracker (1 to 8)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxReachedStep, setMaxReachedStep] = useState<number>(1);

  // Return to Review flag when user clicks "Edit" on Step 5 (Review page)
  const [isEditingFromReview, setIsEditingFromReview] = useState<boolean>(false);

  // Booking lifecycle status
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>('Draft');

  // Step 1: Search parameters
  const [searchParams, setSearchParams] = useState<SearchParams>({
    fromCity: 'Visakhapatnam',
    toCity: 'Hyderabad',
    departureDate: '2026-10-14',
    departureTimePref: 'any',
    passengers: 2,
    budgetPref: 'all'
  });

  // Dynamic initial baseline values derived for the search parameters
  const initialOptions = useMemo(() => searchTravelOptions(searchParams), []);
  const initialTransport = initialOptions[0] || null;
  const initialLastMile = useMemo(() => getLastMileOptions(searchParams.toCity, initialTransport?.destinationTerminal), []);
  const initialHotels = useMemo(() => getHotelsForDestination(searchParams.toCity), []);

  // Step 2: Main transport selection (strictly tied to current searchParams)
  const [selectedTransport, setSelectedTransport] = useState<TransportOption | null>(initialTransport);
  const [selectedClassId, setSelectedClassId] = useState<string>(
    initialTransport?.availableClasses?.[0]?.id || 'cc'
  );

  // Step 3: Local transit selection (dynamically adapts to destination terminal)
  const [localTransport, setLocalTransport] = useState<LocalTransportBooking | null>({
    option: initialLastMile[0],
    pickupLocation: `${initialTransport?.destinationTerminal || searchParams.toCity} (Designated Bay)`,
    dropLocation: `${searchParams.toCity} City Center / Hotel Area`,
    passengerCount: 2
  });

  // Step 4: Hotel configuration (dynamically adapts to destination city)
  const [hotelConfig, setHotelConfig] = useState<HotelBookingConfig | null>({
    hotel: initialHotels[0] || null,
    checkInDate: '2026-10-14',
    checkOutDate: '2026-10-16',
    nights: 2,
    roomCount: 1,
    guestCount: 2,
    isIncluded: true
  });

  // Step 6: Passenger information
  const [passengers, setPassengers] = useState<PassengerDetail[]>([
    {
      id: 'pax-1',
      fullName: 'Sandya Pavani',
      age: 28,
      gender: 'Female',
      seatPreference: 'Window'
    },
    {
      id: 'pax-2',
      fullName: 'Vikram Pavani',
      age: 32,
      gender: 'Male',
      seatPreference: 'Aisle'
    }
  ]);

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: 'pavanisandya15@gmail.com',
    phone: '+91 98480 22334'
  });

  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);

  // Dynamic Fare Calculation: Recalculates dynamically whenever ANY selection changes!
  const fareBreakdown = useMemo(() => {
    return calculateFare({
      transport: selectedTransport,
      selectedClassId,
      passengersCount: passengers.length,
      localTransport,
      hotelConfig,
      includeInsurance
    });
  }, [selectedTransport, selectedClassId, passengers.length, localTransport, hotelConfig, includeInsurance]);

  // Step 8: Confirmed booking record
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // All bookings list
  const [bookings, setBookings] = useState<BookingRecord[]>(SAMPLE_BOOKINGS);

  // Modals
  const [detailModalTransport, setDetailModalTransport] = useState<TransportOption | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Authenticated user state
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>({
    name: 'Sandya Pavani',
    email: 'pavanisandya15@gmail.com'
  });

  // Step routing helper
  const goToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    setMaxReachedStep(prev => Math.max(prev, stepNumber));
    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (stepNumber) {
      case 1:
        setActivePage('home');
        setBookingStatus('Draft');
        break;
      case 2:
        setActivePage('explore');
        setBookingStatus('Draft');
        break;
      case 3:
        setActivePage('last-mile');
        setBookingStatus('Draft');
        break;
      case 4:
        setActivePage('hotels');
        setBookingStatus('Draft');
        break;
      case 5:
        setActivePage('review');
        setBookingStatus('Reviewing');
        break;
      case 6:
        setActivePage('passengers');
        setBookingStatus('Reviewing');
        break;
      case 7:
        setActivePage('payment');
        setBookingStatus('Awaiting Payment');
        break;
      case 8:
        setActivePage('confirmation');
        setBookingStatus('Confirmed');
        break;
      default:
        setActivePage('home');
    }
  };

  // Back button helper
  const handleGoBack = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    } else {
      goToStep(1);
    }
  };

  // Flow handlers: Dynamic Search Submission
  const handleSearchSubmit = (params: SearchParams) => {
    // 1. Update search params with exact user values
    setSearchParams(params);

    // 2. Query dynamic travel options for this new route and clear old selection
    const newOptions = searchTravelOptions(params);
    const topOption = newOptions[0] || null;
    setSelectedTransport(topOption);
    if (topOption && topOption.availableClasses && topOption.availableClasses.length > 0) {
      setSelectedClassId(topOption.availableClasses[0].id);
    } else {
      setSelectedClassId('std');
    }

    // 3. Adapt local transit for the new destination terminal
    const newLastMile = getLastMileOptions(params.toCity, topOption?.destinationTerminal);
    setLocalTransport({
      option: newLastMile[0],
      pickupLocation: `${topOption?.destinationTerminal || params.toCity} (Designated Bay)`,
      dropLocation: `${params.toCity} City Center / Hotel Area`,
      passengerCount: params.passengers
    });

    // 4. Adapt hotel inventory for the new destination city
    const newHotels = getHotelsForDestination(params.toCity);
    setHotelConfig({
      hotel: newHotels[0] || null,
      checkInDate: params.departureDate,
      checkOutDate: '2026-10-16',
      nights: 2,
      roomCount: 1,
      guestCount: params.passengers,
      isIncluded: true
    });

    // 5. If passenger count changed in search, sync passenger array length
    if (params.passengers !== passengers.length) {
      const updated: PassengerDetail[] = [];
      for (let i = 0; i < params.passengers; i++) {
        if (passengers[i]) {
          updated.push(passengers[i]);
        } else {
          updated.push({
            id: `pax-${Date.now()}-${i}`,
            fullName: '',
            age: 25,
            gender: 'Male',
            seatPreference: 'Window'
          });
        }
      }
      setPassengers(updated);
    }

    // 6. Reset review editing flag and confirmed booking
    setIsEditingFromReview(false);
    setConfirmedBooking(null);

    goToStep(2); // Explore / Main transport selection
  };

  const handleSelectPopularDestination = (city: string) => {
    const updatedParams: SearchParams = {
      ...searchParams,
      toCity: city
    };
    handleSearchSubmit(updatedParams);
  };

  const handleSelectTransport = (transport: TransportOption, classId?: string) => {
    setSelectedTransport(transport);
    if (classId) {
      setSelectedClassId(classId);
    } else if (transport.availableClasses && transport.availableClasses.length > 0) {
      setSelectedClassId(transport.availableClasses[0].id);
    }

    // Update local transport pickup terminal to match this specific transport
    if (localTransport) {
      setLocalTransport({
        ...localTransport,
        pickupLocation: `${transport.destinationTerminal} (Designated Bay)`
      });
    }

    if (isEditingFromReview) {
      setIsEditingFromReview(false);
      goToStep(5); // Jump straight back to Review!
    } else {
      goToStep(3); // Proceed to Step 3: Local Transit
    }
  };

  const handleSaveLocalTransport = (booking: LocalTransportBooking) => {
    setLocalTransport(booking);
  };

  const handleSaveHotelConfig = (config: HotelBookingConfig) => {
    setHotelConfig(config);
  };

  // Edit shortcuts from Step 5 (Review Page)
  const handleEditFromReview = (targetStep: number) => {
    setIsEditingFromReview(true);
    goToStep(targetStep);
  };

  // Return to Review helper
  const handleReturnToReview = () => {
    setIsEditingFromReview(false);
    goToStep(5);
  };

  // Payment completed
  const handlePaymentSuccess = () => {
    const destCity = selectedTransport?.destinationCity || searchParams.toCity;
    const origCity = selectedTransport?.originCity || searchParams.fromCity;
    const destCode = destCity.slice(0, 3).toUpperCase();
    const origCode = origCity.slice(0, 3).toUpperCase();
    const bookingRef = `TG-${destCode}-${Math.floor(10000 + Math.random() * 90000)}`;
    const pnr = `PNR-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord: BookingRecord = {
      id: `bk-${Date.now()}`,
      bookingRef,
      date: searchParams.departureDate || 'Oct 14, 2026',
      createdAt: 'Just now',
      origin: `${origCity} (${origCode})`,
      destination: `${destCity} (${destCode})`,
      passengerName: passengers[0]?.fullName || currentUser?.name || 'Sandya Pavani',
      passengersCount: passengers.length,
      transport: selectedTransport || initialOptions[0],
      selectedClassName: selectedTransport?.availableClasses?.find(c => c.id === selectedClassId)?.name,
      lastMile: localTransport?.option,
      localTransportDetails: localTransport ? {
        pickup: localTransport.pickupLocation,
        drop: localTransport.dropLocation
      } : undefined,
      hotel: hotelConfig?.isIncluded ? hotelConfig.hotel || undefined : undefined,
      hotelDetails: hotelConfig?.isIncluded ? {
        nights: hotelConfig.nights,
        roomCount: hotelConfig.roomCount
      } : undefined,
      passengers,
      contactInfo,
      seatNumbers: Array.from({ length: passengers.length }).map((_, i) => `S-${14 + i}`),
      pnrOrTicket: pnr,
      totalAmount: fareBreakdown.grandTotal,
      status: 'Confirmed'
    };

    setConfirmedBooking(newRecord);
    setBookings(prev => [newRecord, ...prev]);
    goToStep(8); // Step 8: Booking Confirmation
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b));
  };

  const isBookingFlowActive = [
    'explore',
    'last-mile',
    'hotels',
    'review',
    'passengers',
    'payment',
    'confirmation'
  ].includes(activePage);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-emerald-800 selection:text-white">
      
      {/* Top Bar Navigation */}
      <Navbar
        activePage={activePage === 'review' || activePage === 'confirmation' ? 'summary' : activePage}
        setActivePage={(page) => {
          if (page === 'summary') {
            goToStep(5);
          } else if (page === 'explore') {
            goToStep(2);
          } else if (page === 'hotels') {
            goToStep(4);
          } else if (page === 'home') {
            goToStep(1);
          } else {
            setActivePage(page);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
        user={currentUser}
        onSignOut={() => setCurrentUser(null)}
        hasActiveTrip={Boolean(selectedTransport)}
      />

      {/* Booking Stepper Bar with Persistent Back Navigation (Visible on Steps 2 to 7) */}
      {isBookingFlowActive && currentStep >= 2 && currentStep <= 7 && (
        <BookingStepper
          currentStep={currentStep}
          maxReachedStep={maxReachedStep}
          onNavigateStep={(step) => goToStep(step)}
          onGoBack={handleGoBack}
          canGoBack={true}
          backLabel={
            currentStep === 2 ? 'Back to Search' :
            currentStep === 3 ? 'Back to Transport' :
            currentStep === 4 ? 'Back to Transit' :
            currentStep === 5 ? 'Back to Hotels' :
            currentStep === 6 ? 'Back to Review' :
            'Back to Passengers'
          }
          status={bookingStatus}
        />
      )}

      {/* Main Pages Router */}
      <main className="flex-1">
        
        {/* STEP 1: TRAVEL SEARCH (Home Page) */}
        {activePage === 'home' && (
          <HomePage
            initialSearchParams={searchParams}
            onSearch={handleSearchSubmit}
            onSelectDestination={handleSelectPopularDestination}
            onNavigate={(page) => {
              if (page === 'explore') goToStep(2);
              else if (page === 'hotels') goToStep(4);
              else if (page === 'last-mile') goToStep(3);
              else if (page === 'summary') goToStep(5);
              else setActivePage(page);
            }}
          />
        )}

        {/* STEP 2: MAIN TRANSPORT SELECTION (Travel Results Page) */}
        {activePage === 'explore' && (
          <TravelResultsPage
            searchParams={searchParams}
            selectedTransportId={selectedTransport?.id}
            selectedClassId={selectedClassId}
            onModifySearch={() => goToStep(1)}
            onViewDetails={(transport) => setDetailModalTransport(transport)}
            onBookNow={handleSelectTransport}
            onGoBack={() => goToStep(1)}
            isEditingFromReview={isEditingFromReview}
            onReturnToReview={handleReturnToReview}
          />
        )}

        {/* STEP 3: LOCAL TRANSPORTATION SELECTION (Last Mile Page) */}
        {activePage === 'last-mile' && (
          <LastMilePage
            selectedTransport={selectedTransport}
            savedBooking={localTransport}
            onSaveLocalTransport={handleSaveLocalTransport}
            onProceedToHotels={() => goToStep(4)}
            onGoBack={() => goToStep(2)}
            isEditingFromReview={isEditingFromReview}
            onReturnToReview={handleReturnToReview}
          />
        )}

        {/* STEP 4: HOTEL SELECTION (Hotels Page) */}
        {activePage === 'hotels' && (
          <HotelsPage
            selectedCity={selectedTransport?.destinationCity || searchParams.toCity}
            savedConfig={hotelConfig}
            onSaveHotelConfig={handleSaveHotelConfig}
            onProceedToReview={() => goToStep(5)}
            onGoBack={() => goToStep(3)}
            isEditingFromReview={isEditingFromReview}
            onReturnToReview={handleReturnToReview}
          />
        )}

        {/* STEP 5: COMPLETE JOURNEY REVIEW (Review Page) */}
        {activePage === 'review' && (
          <JourneyReviewPage
            searchParams={searchParams}
            transport={selectedTransport}
            selectedClassId={selectedClassId}
            localTransport={localTransport}
            hotelConfig={hotelConfig}
            passengers={passengers}
            contactInfo={contactInfo}
            includeInsurance={includeInsurance}
            fareBreakdown={fareBreakdown}
            onEditSearch={() => handleEditFromReview(1)}
            onEditTransport={() => handleEditFromReview(2)}
            onEditLocalTransport={() => handleEditFromReview(3)}
            onEditHotel={() => handleEditFromReview(4)}
            onEditPassengers={() => handleEditFromReview(6)}
            onGoBack={() => goToStep(4)}
            onProceedToPassengers={() => goToStep(6)}
            onProceedToPaymentDirect={() => goToStep(7)}
          />
        )}

        {/* STEP 6: PASSENGER INFORMATION (Passenger Details Page) */}
        {activePage === 'passengers' && (
          <PassengerDetailsPage
            passengers={passengers}
            contactInfo={contactInfo}
            includeInsurance={includeInsurance}
            fareBreakdown={fareBreakdown}
            onUpdatePassengers={(pax) => setPassengers(pax)}
            onUpdateContactInfo={(c) => setContactInfo(c)}
            onToggleInsurance={(inc) => setIncludeInsurance(inc)}
            onProceedToPayment={() => goToStep(7)}
            onGoBack={() => goToStep(5)}
            isEditingFromReview={isEditingFromReview}
            onReturnToReview={handleReturnToReview}
          />
        )}

        {/* STEP 7: PAYMENT (Payment Gateway & Live Revalidation Page) */}
        {activePage === 'payment' && (
          <PaymentPage
            fareBreakdown={fareBreakdown}
            passengers={passengers}
            transport={selectedTransport}
            status={bookingStatus}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentFailure={() => setBookingStatus('Failed')}
            onGoBack={() => goToStep(6)}
            onReturnToReview={() => goToStep(5)}
          />
        )}

        {/* STEP 8: BOOKING CONFIRMATION */}
        {activePage === 'confirmation' && confirmedBooking && (
          <BookingConfirmationPage
            booking={confirmedBooking}
            onViewMyTrips={() => {
              setActivePage('trips');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBookAnother={() => goToStep(1)}
          />
        )}

        {/* DASHBOARD: MY TRIPS */}
        {activePage === 'trips' && (
          <MyTripsPage
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            onNavigate={(page) => {
              if (page === 'home') goToStep(1);
              else setActivePage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* AI TRAVEL ASSISTANT */}
        {activePage === 'assistant' && (
          <AIAssistantPage
            searchParams={searchParams}
            onSelectTransport={(transport) => {
              setSelectedTransport(transport);
              goToStep(3);
            }}
            onSelectHotel={(hotel) => {
              setHotelConfig(prev => ({
                hotel,
                checkInDate: prev?.checkInDate || '2026-10-14',
                checkOutDate: prev?.checkOutDate || '2026-10-16',
                nights: 2,
                roomCount: 1,
                guestCount: 2,
                isIncluded: true
              }));
              goToStep(5);
            }}
            onNavigate={(page) => {
              if (page === 'home') goToStep(1);
              else if (page === 'explore') goToStep(2);
              else if (page === 'hotels') goToStep(4);
              else setActivePage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* Transport Details Modal */}
      <TransportDetailsModal
        transport={detailModalTransport}
        onClose={() => setDetailModalTransport(null)}
        onBook={(transport) => {
          handleSelectTransport(transport);
        }}
        passengersCount={passengers.length}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
      />

      {/* Footer */}
      <Footer
        onNavigate={(page) => {
          if (page === 'home') goToStep(1);
          else if (page === 'explore') goToStep(2);
          else if (page === 'hotels') goToStep(4);
          else if (page === 'trips') setActivePage('trips');
          else if (page === 'assistant') setActivePage('assistant');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
