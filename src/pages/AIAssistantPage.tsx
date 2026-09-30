import { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  ArrowRight, 
  Train, 
  Bus, 
  Plane, 
  Star, 
  RotateCcw, 
  Building 
} from 'lucide-react';
import { ChatMessage, TransportOption, Hotel, SearchParams } from '../types/travel';
import { searchTravelOptions } from '../services/travelEngine';
import { getHotelsForDestination } from '../services/hotelsEngine';

interface AIAssistantPageProps {
  searchParams?: SearchParams;
  onSelectTransport: (transport: TransportOption) => void;
  onSelectHotel: (hotel: Hotel) => void;
  onNavigate: (page: string) => void;
}

export function AIAssistantPage({
  searchParams,
  onSelectTransport,
  onSelectHotel,
  onNavigate
}: AIAssistantPageProps) {
  const currentOrigin = searchParams?.fromCity || 'Visakhapatnam';
  const currentDest = searchParams?.toCity || 'Your Destination';

  const initialMessages: ChatMessage[] = useMemo(() => [
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: searchParams?.toCity 
        ? `Hi! I'm Genie, your personal multi-modal travel assistant. I can help you plan your journey from ${currentOrigin} to ${currentDest}, compare buses, trains, and flights, or discover top-rated stays. Where would you like to explore?`
        : `Hi! I'm Genie, your personal worldwide travel assistant. Tell me where you'd like to travel (e.g., "I want to travel from Anakapalle to Visakhapatnam" or "Find flights from Tokyo to New York") and I'll find the best door-to-door transit for you!`,
      timestamp: 'Just now',
      suggestedPrompts: searchParams?.toCity ? [
        `Find the cheapest trip from ${currentOrigin} to ${currentDest}.`,
        `Show the fastest travel option to ${currentDest}.`,
        `Find top-rated verified hotels in ${currentDest}.`,
        'Plan a family journey with comfortable seating.'
      ] : [
        'Find travel options from Anakapalle to Visakhapatnam.',
        'Find fastest connection from Visakhapatnam to Hyderabad.',
        'Compare travel from Vijayawada to Chennai.',
        'Show flights from Tokyo to New York.'
      ]
    }
  ], [currentOrigin, currentDest, searchParams]);

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let responseText = '';
      let recommendations: TransportOption[] | undefined;
      let hotelRecommendations: Hotel[] | undefined;
      let nextPrompts: string[] = [];

      // Determine relevant route (dynamic natural language extraction or active search)
      let origin = currentOrigin;
      let destination = currentDest !== 'Your Destination' ? currentDest : 'Visakhapatnam';

      const fromToMatch = query.match(/from\s+([A-Za-z\s]+?)\s+to\s+([A-Za-z\s]+?)(?:tomorrow|today|after|for|\.|\?|$)/i);
      if (fromToMatch && fromToMatch[1] && fromToMatch[2]) {
        origin = fromToMatch[1].trim();
        destination = fromToMatch[2].trim();
      }

      // Query dynamic travel engine
      const dynamicTransports = searchTravelOptions({
        fromCity: origin,
        toCity: destination,
        departureDate: searchParams?.departureDate || '2026-10-14',
        departureTimePref: 'any',
        passengers: searchParams?.passengers || 2,
        budgetPref: 'all'
      });

      const dynamicHotels = getHotelsForDestination(destination);

      if (lower.includes('cheap') || lower.includes('budget') || lower.includes('lowest') || lower.includes('saving')) {
        const sorted = [...dynamicTransports].sort((a, b) => a.pricePerPassenger - b.pricePerPassenger);
        const cheapest = sorted[0];
        const secondCheapest = sorted[1] || sorted[0];

        responseText = `I analyzed all transport modes for ${origin} → ${destination}. The most economical choice is ${cheapest.operatorName} at ₹${cheapest.pricePerPassenger.toLocaleString()} per person (${cheapest.seatingType}). Here are the best budget options:`;
        recommendations = [cheapest, secondCheapest];
        nextPrompts = [`Show fastest route instead`, `Find budget hotel in ${destination}`, `How long is the journey?`];
      } else if (lower.includes('fast') || lower.includes('quick') || lower.includes('speed') || lower.includes('time')) {
        const sorted = [...dynamicTransports].sort((a, b) => a.durationMinutes - b.durationMinutes);
        const fastest = sorted[0];
        const secondFastest = sorted[1] || sorted[0];

        responseText = `If travel speed is your top priority for ${origin} → ${destination}, ${fastest.operatorName} is the fastest with a duration of ${fastest.duration}. Here are the top swift connections:`;
        recommendations = [fastest, secondFastest];
        nextPrompts = [`Compare rail vs bus fare`, `Show hotels in ${destination}`, `Check morning departures`];
      } else if (lower.includes('hotel') || lower.includes('stay') || lower.includes('resort') || lower.includes('room')) {
        responseText = `Here are the highest-rated verified accommodations in ${destination} matching your travel itinerary:`;
        hotelRecommendations = dynamicHotels.slice(0, 2);
        nextPrompts = [`Show transport options to ${destination}`, `Add station cab transfer`, `Proceed to review`];
      } else if (lower.includes('family') || lower.includes('kid') || lower.includes('group')) {
        const comfortable = dynamicTransports.filter(t => t.isAc) || dynamicTransports;
        responseText = `For family and group travel between ${origin} and ${destination}, I recommend air-conditioned reserved transit with generous legroom and onboard amenities, paired with a pre-booked station arrival cab:`;
        recommendations = comfortable.slice(0, 2);
        hotelRecommendations = dynamicHotels.slice(0, 1);
        nextPrompts = [`Calculate total group cost`, `Find stays with family suites in ${destination}`, `Show overnight sleepers`];
      } else {
        responseText = `I'm happy to help you with your journey from ${origin} to ${destination}! Here are the highest-rated multi-modal options currently available:`;
        recommendations = dynamicTransports.slice(0, 2);
        hotelRecommendations = dynamicHotels.slice(0, 1);
        nextPrompts = [`Find cheapest option`, `Show fastest route`, `Stitch last-mile transit`];
      }

      const assistantMessage: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: 'Just now',
        recommendations,
        hotelRecommendations,
        suggestedPrompts: nextPrompts
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, assistantMessage]);
    }, 800);
  };

  const handleResetChat = () => {
    setMessages(initialMessages);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      {/* Top assistant banner */}
      <div className="bg-white border-b border-stone-200/80 px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-900 text-amber-300 flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-stone-900">Genie AI Travel Assistant</h1>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Ready to assist
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Route guidance for {currentOrigin} → {currentDest} and beyond
              </p>
            </div>
          </div>

          <button
            onClick={handleResetChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 hover:border-stone-300 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>
      </div>

      {/* Chat Messages Workspace */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 overflow-y-auto space-y-6">
        
        {messages.map((message) => {
          const isUser = message.sender === 'user';
          return (
            <div
              key={message.id}
              className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-amber-400" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[78%] space-y-3 ${isUser ? 'text-right' : 'text-left'}`}>
                {/* Bubble */}
                <div
                  className={`inline-block p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-emerald-900 text-white rounded-tr-xs'
                      : 'bg-white text-stone-800 border border-stone-200/90 rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>

                {/* Embedded Transport Recommendations */}
                {message.recommendations && message.recommendations.length > 0 && (
                  <div className="space-y-2.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block text-left">
                      Genie Recommended Itineraries:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                      {message.recommendations.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-xl border border-stone-200 p-3.5 shadow-xs hover:border-emerald-600/50 transition-all space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5 font-bold text-stone-900">
                              {item.transportType === 'train' && <Train className="w-3.5 h-3.5 text-emerald-800" />}
                              {item.transportType === 'bus' && <Bus className="w-3.5 h-3.5 text-orange-600" />}
                              {item.transportType === 'flight' && <Plane className="w-3.5 h-3.5 text-sky-700" />}
                              <span className="truncate max-w-[140px]">{item.operatorName}</span>
                            </div>
                            <span className="font-extrabold text-emerald-900">₹{item.pricePerPassenger}</span>
                          </div>

                          <div className="text-[11px] text-stone-500 flex items-center justify-between">
                            <span>{item.departureTime} → {item.arrivalTime}</span>
                            <span>{item.duration}</span>
                          </div>

                          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                            <span className="text-[10px] text-amber-600 font-bold flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              {item.rating}
                            </span>
                            <button
                              onClick={() => onSelectTransport(item)}
                              className="px-2.5 py-1 bg-emerald-900 hover:bg-emerald-800 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1"
                            >
                              <span>Select Route</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Embedded Hotel Recommendations */}
                {message.hotelRecommendations && message.hotelRecommendations.length > 0 && (
                  <div className="space-y-2.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block text-left">
                      Matched Stays in {currentDest}:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                      {message.hotelRecommendations.map((hotel) => (
                        <div
                          key={hotel.id}
                          className="bg-white rounded-xl border border-stone-200 p-3.5 shadow-xs hover:border-emerald-600/50 transition-all space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5 font-bold text-stone-900">
                              <Building className="w-3.5 h-3.5 text-emerald-800" />
                              <span className="truncate max-w-[150px]">{hotel.name}</span>
                            </div>
                            <span className="font-extrabold text-emerald-900">₹{hotel.pricePerNight}</span>
                          </div>

                          <p className="text-[11px] text-stone-500 truncate">{hotel.location}</p>

                          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                            <span className="text-[10px] text-amber-600 font-bold flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              {hotel.rating}
                            </span>
                            <button
                              onClick={() => onSelectHotel(hotel)}
                              className="px-2.5 py-1 bg-emerald-900 hover:bg-emerald-800 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1"
                            >
                              <span>Select Hotel</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Follow-up Prompts */}
                {message.suggestedPrompts && message.suggestedPrompts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {message.suggestedPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(prompt)}
                        className="px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:border-emerald-800 text-stone-700 hover:text-emerald-950 text-xs font-medium transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-3 items-center text-xs text-stone-400 animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center">
              <Bot className="w-4 h-4 text-amber-400" />
            </div>
            <span>Genie is analyzing live multi-modal itineraries...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input bar */}
      <div className="bg-white border-t border-stone-200/80 p-4">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask Genie about transit from ${currentOrigin} to ${currentDest}...`}
              className="flex-1 bg-stone-100/80 hover:bg-stone-100 focus:bg-white text-xs sm:text-sm px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-800 focus:outline-none transition-all font-medium text-stone-900 placeholder:text-stone-400"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-4 py-3 bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
