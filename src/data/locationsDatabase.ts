import { LocationItem } from '../types/travel';

export const LOCATIONS_DATABASE: LocationItem[] = [
  // --- ANDHRA PRADESH: Visakhapatnam Region ---
  {
    id: 'loc-akp-stn',
    name: 'Anakapalle Railway Station',
    code: 'AKP',
    type: 'station',
    city: 'Anakapalle',
    state: 'Andhra Pradesh',
    country: 'India',
    aliases: ['AKP', 'Anakapalli', 'Anakapalle Station', 'Anakapalli Jn'],
    coordinates: { lat: 17.6883, lng: 83.0039 },
    nearestAirportCode: 'VTZ',
    popular: true
  },
  {
    id: 'loc-akp-bus',
    name: 'Anakapalle RTC Complex / Highway Bypass',
    code: 'AKP-RTC',
    type: 'bus_terminal',
    city: 'Anakapalle',
    state: 'Andhra Pradesh',
    country: 'India',
    aliases: ['Anakapalle Bus Stand', 'AKP Bypass', 'Anakapalli RTC'],
    coordinates: { lat: 17.6912, lng: 83.0084 },
    nearestAirportCode: 'VTZ'
  },
  {
    id: 'loc-akp-city',
    name: 'Anakapalle (All Locations)',
    code: 'AKP-ALL',
    type: 'city',
    city: 'Anakapalle',
    state: 'Andhra Pradesh',
    country: 'India',
    aliases: ['Anakapalli', 'AKP'],
    coordinates: { lat: 17.689, lng: 83.006 },
    nearestAirportCode: 'VTZ',
    popular: true
  },
  {
    id: 'loc-vskp-stn',
    name: 'Visakhapatnam Junction',
    code: 'VSKP',
    type: 'station',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    aliases: ['Vizag Station', 'VSKP', 'Waltair Station', 'Visakhapatnam Jn'],
    coordinates: { lat: 17.7214, lng: 83.2921 },
    nearestAirportCode: 'VTZ',
    popular: true
  },
  {
    id: 'loc-vskp-air',
    name: 'Visakhapatnam International Airport',
    code: 'VTZ',
    type: 'airport',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    aliases: ['VTZ', 'Vizag Airport', 'Visakhapatnam Airport'],
    coordinates: { lat: 17.7212, lng: 83.2245 },
    popular: true
  },
  {
    id: 'loc-vskp-bus',
    name: 'Dwaraka Bus Station (RTC Complex Vizag)',
    code: 'DBS-VIZAG',
    type: 'bus_terminal',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    aliases: ['Vizag RTC Complex', 'Dwaraka Bus Stand', 'Maddilapalem', 'Gajuwaka'],
    coordinates: { lat: 17.7275, lng: 83.3082 },
    nearestAirportCode: 'VTZ',
    popular: true
  },
  {
    id: 'loc-vskp-city',
    name: 'Visakhapatnam (Vizag)',
    code: 'VIZAG',
    type: 'city',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    aliases: ['Vizag', 'Waltair', 'Visakha', 'VSKP'],
    coordinates: { lat: 17.6868, lng: 83.2185 },
    nearestAirportCode: 'VTZ',
    popular: true
  },
  {
    id: 'loc-dvd-stn',
    name: 'Duvvada Railway Station',
    code: 'DVD',
    type: 'station',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    aliases: ['DVD', 'Duvvada Station', 'Steel Plant Station'],
    coordinates: { lat: 17.7027, lng: 83.1517 },
    nearestAirportCode: 'VTZ'
  },

  // --- TELANGANA: Hyderabad Region ---
  {
    id: 'loc-sc-stn',
    name: 'Secunderabad Junction',
    code: 'SC',
    type: 'station',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    aliases: ['SC', 'Secunderabad Station', 'Secunderabad Jn', 'Hyderabad Secunderabad'],
    coordinates: { lat: 17.4334, lng: 78.5045 },
    nearestAirportCode: 'HYD',
    popular: true
  },
  {
    id: 'loc-hyb-stn',
    name: 'Hyderabad Deccan Nampally',
    code: 'HYB',
    type: 'station',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    aliases: ['HYB', 'Nampally Station', 'Hyderabad Nampally'],
    coordinates: { lat: 17.3917, lng: 78.4682 },
    nearestAirportCode: 'HYD',
    popular: true
  },
  {
    id: 'loc-kcg-stn',
    name: 'Kacheguda Railway Station',
    code: 'KCG',
    type: 'station',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    aliases: ['KCG', 'Kacheguda Station', 'Hyderabad Kacheguda'],
    coordinates: { lat: 17.3926, lng: 78.4988 },
    nearestAirportCode: 'HYD'
  },
  {
    id: 'loc-hyd-air',
    name: 'Rajiv Gandhi International Airport (Shamshabad)',
    code: 'HYD',
    type: 'airport',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    aliases: ['HYD', 'RGIA', 'Shamshabad Airport', 'Hyderabad Airport'],
    coordinates: { lat: 17.2403, lng: 78.4294 },
    popular: true
  },
  {
    id: 'loc-mgbs-bus',
    name: 'Mahatma Gandhi Bus Station (MGBS / Imlibun)',
    code: 'MGBS',
    type: 'bus_terminal',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    aliases: ['MGBS', 'Imlibun', 'Ameerpet Hub', 'LB Nagar', 'Kukatpally', 'JBS'],
    coordinates: { lat: 17.3789, lng: 78.4831 },
    nearestAirportCode: 'HYD',
    popular: true
  },
  {
    id: 'loc-hyd-city',
    name: 'Hyderabad (All Stations)',
    code: 'HYD-ALL',
    type: 'city',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    aliases: ['Hyderabad', 'Cyberabad', 'Secunderabad', 'Bhagyanagar', 'HYD'],
    coordinates: { lat: 17.385, lng: 78.4867 },
    nearestAirportCode: 'HYD',
    popular: true
  },

  // --- ANDHRA PRADESH: Other Major Hubs ---
  {
    id: 'loc-bza-stn',
    name: 'Vijayawada Junction',
    code: 'BZA',
    type: 'station',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    aliases: ['BZA', 'Vijayawada Station', 'Vijayawada Jn', 'Bezawada'],
    coordinates: { lat: 16.518, lng: 80.6195 },
    nearestAirportCode: 'VGA',
    popular: true
  },
  {
    id: 'loc-bza-bus',
    name: 'Pandit Nehru Bus Station (PNBS)',
    code: 'PNBS',
    type: 'bus_terminal',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    aliases: ['PNBS', 'Vijayawada Bus Stand', 'RTC Complex Vijayawada'],
    coordinates: { lat: 16.5074, lng: 80.6277 },
    nearestAirportCode: 'VGA'
  },
  {
    id: 'loc-bza-air',
    name: 'Vijayawada Airport (Gannavaram)',
    code: 'VGA',
    type: 'airport',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    aliases: ['VGA', 'Gannavaram Airport', 'Vijayawada Airport'],
    coordinates: { lat: 16.5304, lng: 80.7968 }
  },
  {
    id: 'loc-bza-city',
    name: 'Vijayawada',
    code: 'BZA-CITY',
    type: 'city',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    aliases: ['Bezawada', 'BZA', 'Amaravati'],
    coordinates: { lat: 16.5062, lng: 80.648 },
    nearestAirportCode: 'VGA',
    popular: true
  },
  {
    id: 'loc-rjy-stn',
    name: 'Rajahmundry Railway Station',
    code: 'RJY',
    type: 'station',
    city: 'Rajahmundry',
    state: 'Andhra Pradesh',
    country: 'India',
    aliases: ['RJY', 'Rajamahendravaram'],
    coordinates: { lat: 17.0005, lng: 81.7821 },
    nearestAirportCode: 'RJA'
  },
  {
    id: 'loc-slo-stn',
    name: 'Samalkot Junction',
    code: 'SLO',
    type: 'station',
    city: 'Samalkot',
    state: 'Andhra Pradesh',
    country: 'India',
    aliases: ['SLO', 'Samalkota', 'Kakinada Road'],
    coordinates: { lat: 17.0519, lng: 82.1697 }
  },
  {
    id: 'loc-tpty-stn',
    name: 'Tirupati Main Railway Station',
    code: 'TPTY',
    type: 'station',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    country: 'India',
    aliases: ['TPTY', 'Tirupathi Station', 'Balaji Tirupati'],
    coordinates: { lat: 13.6288, lng: 79.4192 },
    nearestAirportCode: 'TIR',
    popular: true
  },
  {
    id: 'loc-tpty-air',
    name: 'Tirupati International Airport (Renigunta)',
    code: 'TIR',
    type: 'airport',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    country: 'India',
    aliases: ['TIR', 'Renigunta Airport'],
    coordinates: { lat: 13.6325, lng: 79.5436 }
  },

  // --- KARNATAKA: Bengaluru Hub ---
  {
    id: 'loc-blr-air',
    name: 'Kempegowda International Airport',
    code: 'BLR',
    type: 'airport',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    aliases: ['BLR', 'Bangalore Airport', 'Bengaluru Airport', 'Devanahalli Airport'],
    coordinates: { lat: 13.1986, lng: 77.7066 },
    popular: true
  },
  {
    id: 'loc-sbc-stn',
    name: 'KSR Bengaluru City Junction (Majestic)',
    code: 'SBC',
    type: 'station',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    aliases: ['SBC', 'Bangalore City', 'Majestic Station', 'Bengaluru Station'],
    coordinates: { lat: 12.9781, lng: 77.5694 },
    nearestAirportCode: 'BLR',
    popular: true
  },
  {
    id: 'loc-ypr-stn',
    name: 'Yesvantpur Junction',
    code: 'YPR',
    type: 'station',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    aliases: ['YPR', 'Yeshwantpur', 'Yeshvantpur Station'],
    coordinates: { lat: 13.0238, lng: 77.5501 },
    nearestAirportCode: 'BLR'
  },
  {
    id: 'loc-blr-bus',
    name: 'Kempegowda Bus Station (Majestic)',
    code: 'MAJESTIC',
    type: 'bus_terminal',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    aliases: ['Majestic Bus Stand', 'KBS', 'Shantinagar Bus Stand', 'Madiwala'],
    coordinates: { lat: 12.9767, lng: 77.5713 },
    nearestAirportCode: 'BLR',
    popular: true
  },
  {
    id: 'loc-blr-city',
    name: 'Bengaluru (Bangalore)',
    code: 'BLR-ALL',
    type: 'city',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    aliases: ['Bangalore', 'Bengaluru', 'BLR', 'Silicon Valley'],
    coordinates: { lat: 12.9716, lng: 77.5946 },
    nearestAirportCode: 'BLR',
    popular: true
  },

  // --- TAMIL NADU: Chennai Hub ---
  {
    id: 'loc-mas-stn',
    name: 'Puratchi Thalaivar Dr. MGR Chennai Central',
    code: 'MAS',
    type: 'station',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    aliases: ['MAS', 'Chennai Central', 'Madras Central', 'Chennai Station'],
    coordinates: { lat: 13.0827, lng: 80.2754 },
    nearestAirportCode: 'MAA',
    popular: true
  },
  {
    id: 'loc-ms-stn',
    name: 'Chennai Egmore',
    code: 'MS',
    type: 'station',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    aliases: ['MS', 'Egmore Station', 'Chennai Egmore'],
    coordinates: { lat: 13.079, lng: 80.2612 },
    nearestAirportCode: 'MAA'
  },
  {
    id: 'loc-maa-air',
    name: 'Chennai International Airport (Meenambakkam)',
    code: 'MAA',
    type: 'airport',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    aliases: ['MAA', 'Madras Airport', 'Meenambakkam Airport', 'Chennai Airport'],
    coordinates: { lat: 12.9941, lng: 80.1709 },
    popular: true
  },
  {
    id: 'loc-maa-city',
    name: 'Chennai (Madras)',
    code: 'MAA-ALL',
    type: 'city',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    aliases: ['Madras', 'Chennai', 'MAA', 'Koyambedu CMBT'],
    coordinates: { lat: 13.0827, lng: 80.2707 },
    nearestAirportCode: 'MAA',
    popular: true
  },

  // --- MAHARASHTRA: Mumbai & Pune ---
  {
    id: 'loc-bom-air',
    name: 'Chhatrapati Shivaji Maharaj International Airport',
    code: 'BOM',
    type: 'airport',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    aliases: ['BOM', 'Mumbai Airport', 'Sahar Airport', 'Bombay Airport', 'Santacruz'],
    coordinates: { lat: 19.0896, lng: 72.8656 },
    popular: true
  },
  {
    id: 'loc-csmt-stn',
    name: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
    code: 'CSMT',
    type: 'station',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    aliases: ['CSMT', 'VT', 'Victoria Terminus', 'Mumbai CST', 'Bombay VT'],
    coordinates: { lat: 18.9401, lng: 72.8353 },
    nearestAirportCode: 'BOM',
    popular: true
  },
  {
    id: 'loc-bct-stn',
    name: 'Mumbai Central',
    code: 'MMCT',
    type: 'station',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    aliases: ['BCT', 'MMCT', 'Bombay Central', 'Mumbai Central'],
    coordinates: { lat: 18.9696, lng: 72.8193 },
    nearestAirportCode: 'BOM'
  },
  {
    id: 'loc-bom-city',
    name: 'Mumbai (Bombay)',
    code: 'BOM-ALL',
    type: 'city',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    aliases: ['Bombay', 'Mumbai', 'BOM', 'Dadar', 'Borivali', 'Thane'],
    coordinates: { lat: 19.076, lng: 72.8777 },
    nearestAirportCode: 'BOM',
    popular: true
  },
  {
    id: 'loc-pune-stn',
    name: 'Pune Junction',
    code: 'PUNE',
    type: 'station',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    aliases: ['PUNE', 'Pune Station', 'Pune Jn', 'Swargate'],
    coordinates: { lat: 18.5284, lng: 73.8744 },
    nearestAirportCode: 'PNQ',
    popular: true
  },
  {
    id: 'loc-pnq-air',
    name: 'Pune International Airport (Lohegaon)',
    code: 'PNQ',
    type: 'airport',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    aliases: ['PNQ', 'Pune Airport', 'Lohegaon Airport'],
    coordinates: { lat: 18.5822, lng: 73.9197 }
  },

  // --- DELHI NCR: National Capital ---
  {
    id: 'loc-del-air',
    name: 'Indira Gandhi International Airport (IGI)',
    code: 'DEL',
    type: 'airport',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    aliases: ['DEL', 'IGI Airport', 'Delhi Airport', 'Palam Airport', 'Terminal 3'],
    coordinates: { lat: 28.5562, lng: 77.1 },
    popular: true
  },
  {
    id: 'loc-ndls-stn',
    name: 'New Delhi Railway Station',
    code: 'NDLS',
    type: 'station',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    aliases: ['NDLS', 'New Delhi Station', 'Paharganj', 'Ajmeri Gate'],
    coordinates: { lat: 28.6429, lng: 77.2195 },
    nearestAirportCode: 'DEL',
    popular: true
  },
  {
    id: 'loc-nzm-stn',
    name: 'Hazrat Nizamuddin Railway Station',
    code: 'NZM',
    type: 'station',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    aliases: ['NZM', 'Nizamuddin Station', 'Delhi Nizamuddin'],
    coordinates: { lat: 28.5891, lng: 77.253 },
    nearestAirportCode: 'DEL'
  },
  {
    id: 'loc-dli-stn',
    name: 'Old Delhi Railway Station',
    code: 'DLI',
    type: 'station',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    aliases: ['DLI', 'Old Delhi', 'Chandni Chowk Station'],
    coordinates: { lat: 28.6617, lng: 77.2274 },
    nearestAirportCode: 'DEL'
  },
  {
    id: 'loc-del-city',
    name: 'Delhi NCR (All Stations)',
    code: 'DEL-ALL',
    type: 'city',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    aliases: ['Delhi', 'New Delhi', 'NCR', 'Kashmere Gate ISBT', 'Anand Vihar'],
    coordinates: { lat: 28.6139, lng: 77.209 },
    nearestAirportCode: 'DEL',
    popular: true
  },

  // --- GOA ---
  {
    id: 'loc-goi-air',
    name: 'Dabolim Airport (South Goa)',
    code: 'GOI',
    type: 'airport',
    city: 'Goa',
    state: 'Goa',
    country: 'India',
    aliases: ['GOI', 'Dabolim Airport', 'Goa Airport'],
    coordinates: { lat: 15.3808, lng: 73.8314 },
    popular: true
  },
  {
    id: 'loc-gox-air',
    name: 'Manohar International Airport (Mopa / North Goa)',
    code: 'GOX',
    type: 'airport',
    city: 'Goa',
    state: 'Goa',
    country: 'India',
    aliases: ['GOX', 'Mopa Airport', 'North Goa Airport'],
    coordinates: { lat: 15.7667, lng: 73.8667 },
    popular: true
  },
  {
    id: 'loc-mao-stn',
    name: 'Madgaon Junction',
    code: 'MAO',
    type: 'station',
    city: 'Goa',
    state: 'Goa',
    country: 'India',
    aliases: ['MAO', 'Margao Station', 'Madgaon Station', 'Goa Station'],
    coordinates: { lat: 15.2736, lng: 73.9781 },
    nearestAirportCode: 'GOI',
    popular: true
  },
  {
    id: 'loc-goa-city',
    name: 'Goa (All Areas)',
    code: 'GOA-ALL',
    type: 'city',
    city: 'Goa',
    state: 'Goa',
    country: 'India',
    aliases: ['Goa', 'Panjim', 'Panaji', 'Calangute', 'Baga', 'Candolim'],
    coordinates: { lat: 15.2993, lng: 74.124 },
    nearestAirportCode: 'GOI',
    popular: true
  },

  // --- RAJASTHAN: Jaipur ---
  {
    id: 'loc-jp-stn',
    name: 'Jaipur Junction',
    code: 'JP',
    type: 'station',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    aliases: ['JP', 'Jaipur Station', 'Pink City Station'],
    coordinates: { lat: 26.9196, lng: 75.7878 },
    nearestAirportCode: 'JAI',
    popular: true
  },
  {
    id: 'loc-jai-air',
    name: 'Jaipur International Airport (Sanganer)',
    code: 'JAI',
    type: 'airport',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    aliases: ['JAI', 'Jaipur Airport', 'Sanganer Airport'],
    coordinates: { lat: 26.8242, lng: 75.8122 }
  },
  {
    id: 'loc-jp-city',
    name: 'Jaipur (Pink City)',
    code: 'JAI-ALL',
    type: 'city',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    aliases: ['Jaipur', 'Pink City', 'Sindhi Camp'],
    coordinates: { lat: 26.9124, lng: 75.7873 },
    nearestAirportCode: 'JAI',
    popular: true
  },

  // --- KERALA: Kochi ---
  {
    id: 'loc-cok-air',
    name: 'Cochin International Airport (Nedumbassery)',
    code: 'COK',
    type: 'airport',
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    aliases: ['COK', 'Cochin Airport', 'Kochi Airport', 'Nedumbassery'],
    coordinates: { lat: 10.1518, lng: 76.393 },
    popular: true
  },
  {
    id: 'loc-ers-stn',
    name: 'Ernakulam South (Kochi)',
    code: 'ERS',
    type: 'station',
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    aliases: ['ERS', 'Ernakulam Junction', 'Kochi Station', 'Cochin South'],
    coordinates: { lat: 9.9676, lng: 76.2921 },
    nearestAirportCode: 'COK',
    popular: true
  },
  {
    id: 'loc-cok-city',
    name: 'Kochi (Cochin)',
    code: 'COK-ALL',
    type: 'city',
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    aliases: ['Kochi', 'Cochin', 'Ernakulam', 'Fort Kochi'],
    coordinates: { lat: 9.9312, lng: 76.2673 },
    nearestAirportCode: 'COK',
    popular: true
  },

  // --- WEST BENGAL: Kolkata ---
  {
    id: 'loc-hwh-stn',
    name: 'Howrah Junction',
    code: 'HWH',
    type: 'station',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    aliases: ['HWH', 'Howrah Station', 'Kolkata Howrah'],
    coordinates: { lat: 22.5839, lng: 88.3426 },
    nearestAirportCode: 'CCU',
    popular: true
  },
  {
    id: 'loc-ccu-air',
    name: 'Netaji Subhash Chandra Bose International Airport',
    code: 'CCU',
    type: 'airport',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    aliases: ['CCU', 'Dum Dum Airport', 'Kolkata Airport', 'Calcutta Airport'],
    coordinates: { lat: 22.6547, lng: 88.4467 }
  },
  {
    id: 'loc-ccu-city',
    name: 'Kolkata (Calcutta)',
    code: 'CCU-ALL',
    type: 'city',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    aliases: ['Calcutta', 'Kolkata', 'CCU', 'Esplanade'],
    coordinates: { lat: 22.5726, lng: 88.3639 },
    nearestAirportCode: 'CCU'
  }
];

/**
 * Searches the location database matching user input query by:
 * - Code exact match (e.g. "AKP", "VSKP", "SC", "HYD", "VTZ")
 * - Name startsWith
 * - Alias match
 * - City / State match
 * - Fuzzy substring match
 */
export function searchLocations(query: string, limit: number = 8): LocationItem[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) {
    return LOCATIONS_DATABASE.filter(l => l.popular).slice(0, limit);
  }

  const matches = LOCATIONS_DATABASE.filter(item => {
    // 1. Direct code match (Highest priority)
    if (item.code.toLowerCase() === cleanQuery) return true;
    
    // 2. Name contains
    if (item.name.toLowerCase().includes(cleanQuery)) return true;
    
    // 3. City contains
    if (item.city.toLowerCase().includes(cleanQuery)) return true;

    // 4. Aliases contain
    if (item.aliases.some(alias => alias.toLowerCase().includes(cleanQuery))) return true;

    // 5. Code starts with
    if (item.code.toLowerCase().startsWith(cleanQuery)) return true;

    return false;
  });

  // Sort by relevance
  return matches.sort((a, b) => {
    const aCodeExact = a.code.toLowerCase() === cleanQuery;
    const bCodeExact = b.code.toLowerCase() === cleanQuery;
    if (aCodeExact && !bCodeExact) return -1;
    if (!aCodeExact && bCodeExact) return 1;

    const aNameStarts = a.name.toLowerCase().startsWith(cleanQuery);
    const bNameStarts = b.name.toLowerCase().startsWith(cleanQuery);
    if (aNameStarts && !bNameStarts) return -1;
    if (!aNameStarts && bNameStarts) return 1;

    const aPopular = a.popular ? 1 : 0;
    const bPopular = b.popular ? 1 : 0;
    return bPopular - aPopular;
  }).slice(0, limit);
}

// Global dictionary for instant synchronous resolution of worldwide locations
const WORLDWIDE_CITIES: Record<string, { lat: number; lng: number; country: string; code: string }> = {
  'moscow': { lat: 55.7558, lng: 37.6173, country: 'Russia', code: 'MOW' },
  'russia': { lat: 61.5240, lng: 105.3188, country: 'Russia', code: 'RUS' },
  'tokyo': { lat: 35.6762, lng: 139.6503, country: 'Japan', code: 'TYO' },
  'japan': { lat: 36.2048, lng: 138.2529, country: 'Japan', code: 'JPN' },
  'new york': { lat: 40.7128, lng: -74.0060, country: 'United States', code: 'NYC' },
  'nyc': { lat: 40.7128, lng: -74.0060, country: 'United States', code: 'NYC' },
  'london': { lat: 51.5074, lng: -0.1278, country: 'United Kingdom', code: 'LON' },
  'paris': { lat: 48.8566, lng: 2.3522, country: 'France', code: 'PAR' },
  'dubai': { lat: 25.2048, lng: 55.2708, country: 'United Arab Emirates', code: 'DXB' },
  'singapore': { lat: 1.3521, lng: 103.8198, country: 'Singapore', code: 'SIN' },
  'sydney': { lat: -33.8688, lng: 151.2093, country: 'Australia', code: 'SYD' },
  'berlin': { lat: 52.5200, lng: 13.4050, country: 'Germany', code: 'BER' },
  'rome': { lat: 41.9028, lng: 12.4964, country: 'Italy', code: 'ROM' },
  'beijing': { lat: 39.9042, lng: 116.4074, country: 'China', code: 'BJS' },
  'bangkok': { lat: 13.7563, lng: 100.5018, country: 'Thailand', code: 'BKK' },
  'toronto': { lat: 43.6532, lng: -79.3832, country: 'Canada', code: 'YTO' },
  'los angeles': { lat: 34.0522, lng: -118.2437, country: 'United States', code: 'LAX' },
  'chicago': { lat: 41.8781, lng: -87.6298, country: 'United States', code: 'CHI' },
  'san francisco': { lat: 37.7749, lng: -122.4194, country: 'United States', code: 'SFO' },
  'doha': { lat: 25.2854, lng: 51.5310, country: 'Qatar', code: 'DOH' },
  'kuala lumpur': { lat: 3.1390, lng: 101.6869, country: 'Malaysia', code: 'KUL' },
  'amsterdam': { lat: 52.3676, lng: 4.9041, country: 'Netherlands', code: 'AMS' },
  'seoul': { lat: 37.5665, lng: 126.9780, country: 'South Korea', code: 'SEL' }
};

/**
 * Resolves any freeform user location input to a known LocationItem or structured fallback worldwide
 */
export function resolveLocation(locationInput: string): LocationItem {
  const query = locationInput.trim();
  const lower = query.toLowerCase();

  // 1. Direct match in local locations database
  const found = searchLocations(query, 1)[0];
  if (found && (found.name.toLowerCase() === lower || found.code.toLowerCase() === lower || found.city.toLowerCase() === lower)) {
    return found;
  }

  // 2. Direct match in worldwide cities dictionary
  for (const [key, loc] of Object.entries(WORLDWIDE_CITIES)) {
    if (lower === key || lower.startsWith(key) || lower.includes(key)) {
      return {
        id: `loc-global-${key.replace(/\s+/g, '-')}`,
        name: `${query.charAt(0).toUpperCase() + query.slice(1)}, ${loc.country}`,
        code: loc.code,
        type: 'city',
        city: query.charAt(0).toUpperCase() + query.slice(1),
        state: '',
        country: loc.country,
        aliases: [query, loc.code],
        coordinates: { lat: loc.lat, lng: loc.lng },
        isInternational: loc.country !== 'India'
      };
    }
  }

  if (found) return found;

  // 3. Fallback synthetic location for any arbitrary worldwide town, village, or city
  const parts = query.split(',').map(s => s.trim());
  const city = parts[0] || query;
  const country = parts.length > 1 ? parts[parts.length - 1] : 'Global';

  // Deterministic coordinate derivation from name
  let hash = 0;
  for (let i = 0; i < query.length; i++) {
    hash = (hash << 5) - hash + query.charCodeAt(i);
    hash |= 0;
  }
  const pseudoLat = 20 + (Math.abs(hash) % 400) / 10;
  const pseudoLng = 30 + (Math.abs(hash >> 3) % 1000) / 10;

  return {
    id: `loc-custom-${query.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    name: query,
    code: (city.replace(/[^a-zA-Z]/g, '').slice(0, 3) || 'LOC').toUpperCase(),
    type: 'city',
    city: city,
    state: parts.length > 2 ? parts[1] : '',
    country: country,
    aliases: [query, city],
    coordinates: { lat: pseudoLat, lng: pseudoLng },
    isInternational: country.toLowerCase() !== 'india'
  };
}

/**
 * Calculates geographic distance in KM using the Haversine formula
 */
export function calculateDistanceKm(loc1: { lat: number; lng: number }, loc2: { lat: number; lng: number }): number {
  const R = 6371; // Earth's radius in km
  const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
  const dLng = (loc2.lng - loc1.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(loc1.lat * (Math.PI / 180)) *
      Math.cos(loc2.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance);
}
