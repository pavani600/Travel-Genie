import { LocationItem } from '../types/travel';
import { LOCATIONS_DATABASE, searchLocations as searchLocalLocations } from '../data/locationsDatabase';

// In-memory cache for fast lookups and deduplication across the app session
const locationCache = new Map<string, LocationItem>();
const searchResultsCache = new Map<string, LocationItem[]>();

// Curated dictionary of major global cities & countries for instant zero-latency resolution
const GLOBAL_KNOWN_LOCATIONS: Record<string, { lat: number; lng: number; country: string; state?: string; code: string; type: LocationItem['type'] }> = {
  'moscow': { lat: 55.7558, lng: 37.6173, country: 'Russia', state: 'Moscow', code: 'MOW', type: 'city' },
  'russia': { lat: 61.5240, lng: 105.3188, country: 'Russia', state: 'Russian Federation', code: 'RUS', type: 'country' },
  'tokyo': { lat: 35.6762, lng: 139.6503, country: 'Japan', state: 'Tokyo Prefecture', code: 'TYO', type: 'city' },
  'japan': { lat: 36.2048, lng: 138.2529, country: 'Japan', state: '', code: 'JPN', type: 'country' },
  'new york': { lat: 40.7128, lng: -74.0060, country: 'United States', state: 'New York', code: 'NYC', type: 'city' },
  'nyc': { lat: 40.7128, lng: -74.0060, country: 'United States', state: 'New York', code: 'NYC', type: 'city' },
  'london': { lat: 51.5074, lng: -0.1278, country: 'United Kingdom', state: 'England', code: 'LON', type: 'city' },
  'paris': { lat: 48.8566, lng: 2.3522, country: 'France', state: 'Île-de-France', code: 'PAR', type: 'city' },
  'dubai': { lat: 25.2048, lng: 55.2708, country: 'United Arab Emirates', state: 'Dubai', code: 'DXB', type: 'city' },
  'singapore': { lat: 1.3521, lng: 103.8198, country: 'Singapore', state: 'Singapore', code: 'SIN', type: 'city' },
  'sydney': { lat: -33.8688, lng: 151.2093, country: 'Australia', state: 'New South Wales', code: 'SYD', type: 'city' },
  'berlin': { lat: 52.5200, lng: 13.4050, country: 'Germany', state: 'Berlin', code: 'BER', type: 'city' },
  'rome': { lat: 41.9028, lng: 12.4964, country: 'Italy', state: 'Lazio', code: 'ROM', type: 'city' },
  'beijing': { lat: 39.9042, lng: 116.4074, country: 'China', state: 'Beijing', code: 'BJS', type: 'city' },
  'bangkok': { lat: 13.7563, lng: 100.5018, country: 'Thailand', state: 'Bangkok', code: 'BKK', type: 'city' },
  'toronto': { lat: 43.6532, lng: -79.3832, country: 'Canada', state: 'Ontario', code: 'YTO', type: 'city' },
  'los angeles': { lat: 34.0522, lng: -118.2437, country: 'United States', state: 'California', code: 'LAX', type: 'city' },
  'chicago': { lat: 41.8781, lng: -87.6298, country: 'United States', state: 'Illinois', code: 'CHI', type: 'city' },
  'san francisco': { lat: 37.7749, lng: -122.4194, country: 'United States', state: 'California', code: 'SFO', type: 'city' },
  'doha': { lat: 25.2854, lng: 51.5310, country: 'Qatar', state: 'Doha', code: 'DOH', type: 'city' },
  'kuala lumpur': { lat: 3.1390, lng: 101.6869, country: 'Malaysia', state: 'Federal Territory', code: 'KUL', type: 'city' },
  'frankfurt': { lat: 50.1109, lng: 8.6821, country: 'Germany', state: 'Hesse', code: 'FRA', type: 'city' },
  'amsterdam': { lat: 52.3676, lng: 4.9041, country: 'Netherlands', state: 'North Holland', code: 'AMS', type: 'city' },
  'seoul': { lat: 37.5665, lng: 126.9780, country: 'South Korea', state: 'Seoul', code: 'SEL', type: 'city' },
  'united states': { lat: 37.0902, lng: -95.7129, country: 'United States', state: '', code: 'USA', type: 'country' },
  'usa': { lat: 37.0902, lng: -95.7129, country: 'United States', state: '', code: 'USA', type: 'country' },
  'germany': { lat: 51.1657, lng: 10.4515, country: 'Germany', state: '', code: 'DEU', type: 'country' },
  'france': { lat: 46.2276, lng: 2.2137, country: 'France', state: '', code: 'FRA', type: 'country' },
  'italy': { lat: 41.8719, lng: 12.5674, country: 'Italy', state: '', code: 'ITA', type: 'country' },
  'australia': { lat: -25.2744, lng: 133.7751, country: 'Australia', state: '', code: 'AUS', type: 'country' },
  'canada': { lat: 56.1304, lng: -106.3468, country: 'Canada', state: '', code: 'CAN', type: 'country' }
};

interface OpenMeteoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  country_code?: string;
  admin1?: string;
  admin2?: string;
  feature_code?: string;
  population?: number;
}

interface PhotonFeature {
  geometry: {
    coordinates: [number, number]; // [lng, lat]
  };
  properties: {
    osm_id?: number;
    name?: string;
    city?: string;
    state?: string;
    country?: string;
    countrycode?: string;
    osm_key?: string;
    osm_value?: string;
    type?: string;
  };
}

/**
 * Searches worldwide locations dynamically using genuine geocoding APIs
 * combined with local specialized transit hubs (stations, bus complexes, airports).
 */
export async function searchWorldwideLocations(
  query: string,
  limit: number = 8,
  signal?: AbortSignal
): Promise<{ results: LocationItem[]; error?: string }> {
  const cleanQuery = query.trim();

  // If query is empty, show top popular local stations/airports
  if (!cleanQuery) {
    const popular = LOCATIONS_DATABASE.filter(l => l.popular).slice(0, limit);
    return { results: popular };
  }

  const cacheKey = cleanQuery.toLowerCase();
  if (searchResultsCache.has(cacheKey)) {
    return { results: searchResultsCache.get(cacheKey)! };
  }

  // 1. Fast local matches (IRCTC codes, airport codes, bus hubs)
  const localMatches = searchLocalLocations(cleanQuery, 4);

  // 2. Check global known dictionary
  const globalDirectMatches: LocationItem[] = [];
  for (const [key, loc] of Object.entries(GLOBAL_KNOWN_LOCATIONS)) {
    if (key.includes(cleanQuery.toLowerCase()) || cleanQuery.toLowerCase().includes(key)) {
      globalDirectMatches.push({
        id: `loc-global-${key.replace(/\s+/g, '-')}`,
        name: loc.state ? `${capitalize(key)}, ${loc.state}, ${loc.country}` : `${capitalize(key)}, ${loc.country}`,
        code: loc.code,
        type: loc.type,
        city: capitalize(key),
        state: loc.state || '',
        country: loc.country,
        aliases: [key, loc.code],
        coordinates: { lat: loc.lat, lng: loc.lng },
        isInternational: loc.country !== 'India'
      });
    }
  }

  // 3. Dynamic Live Geocoding via Open-Meteo Geocoding API
  const geocodedItems: LocationItem[] = [];
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const apiSignal = signal || controller.signal;

    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanQuery)}&count=${limit}&language=en&format=json`,
      { signal: apiSignal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.results)) {
        for (const item of data.results as OpenMeteoResult[]) {
          const type = deriveLocationType(item.feature_code);
          const fullName = [item.name, item.admin1, item.country].filter(Boolean).join(', ');
          const code = generatePlaceCode(item.name, item.country_code);

          const locItem: LocationItem = {
            id: `geo-om-${item.id}`,
            name: fullName,
            code: code,
            type: type,
            city: item.name,
            state: item.admin1 || '',
            country: item.country || (item.country_code === 'IN' ? 'India' : 'International'),
            aliases: [item.name, item.country || '', code].filter(Boolean),
            coordinates: {
              lat: item.latitude,
              lng: item.longitude
            },
            formattedAddress: fullName,
            isInternational: item.country_code ? item.country_code.toUpperCase() !== 'IN' : true
          };

          // Cache individually
          locationCache.set(item.name.toLowerCase(), locItem);
          locationCache.set(fullName.toLowerCase(), locItem);
          geocodedItems.push(locItem);
        }
      }
    }
  } catch (err: unknown) {
    // If Open-Meteo failed, try Photon fallback for OpenStreetMap search
    if (signal?.aborted) {
      return { results: localMatches };
    }
    try {
      const photonRes = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(cleanQuery)}&limit=${limit}`
      );
      if (photonRes.ok) {
        const pData = await photonRes.json();
        if (pData && Array.isArray(pData.features)) {
          for (const feat of pData.features as PhotonFeature[]) {
            const props = feat.properties;
            const geom = feat.geometry;
            if (props.name && geom && geom.coordinates) {
              const [lng, lat] = geom.coordinates;
              const type: LocationItem['type'] = 
                props.osm_key === 'railway' ? 'station' :
                props.osm_key === 'aeroway' ? 'airport' :
                props.type === 'country' ? 'country' : 'city';
              const nameParts = [props.name, props.city || props.state, props.country].filter(Boolean);
              const fullName = Array.from(new Set(nameParts)).join(', ');
              const code = generatePlaceCode(props.name, props.countrycode);

              const locItem: LocationItem = {
                id: `geo-ph-${props.osm_id || Math.random()}`,
                name: fullName,
                code: code,
                type: type,
                city: props.city || props.name,
                state: props.state || '',
                country: props.country || 'International',
                aliases: [props.name, code],
                coordinates: { lat, lng },
                formattedAddress: fullName,
                isInternational: props.countrycode ? props.countrycode.toUpperCase() !== 'IN' : true
              };
              geocodedItems.push(locItem);
              locationCache.set(props.name.toLowerCase(), locItem);
              locationCache.set(fullName.toLowerCase(), locItem);
            }
          }
        }
      }
    } catch {
      // Graceful offline fallback
    }
  }

  // 4. Merge and deduplicate
  const combined: LocationItem[] = [];
  const seenKeys = new Set<string>();

  const addItem = (item: LocationItem) => {
    // Key by simplified city/country and coordinates round
    const latRound = Math.round(item.coordinates.lat * 10) / 10;
    const lngRound = Math.round(item.coordinates.lng * 10) / 10;
    const key = `${item.city.toLowerCase()}-${latRound}-${lngRound}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      combined.push(item);
    }
  };

  // Local transit matches first if relevant
  localMatches.forEach(addItem);
  globalDirectMatches.forEach(addItem);
  geocodedItems.forEach(addItem);

  const finalResults = combined.slice(0, limit);

  // Cache query results
  if (finalResults.length > 0) {
    searchResultsCache.set(cacheKey, finalResults);
  }

  // If no results could be found for an entered string of 2+ chars
  if (finalResults.length === 0 && cleanQuery.length >= 2) {
    return {
      results: [],
      error: `No matching location found for "${cleanQuery}". Please check the spelling or select a matching place.`
    };
  }

  return { results: finalResults };
}

/**
 * Resolves any freeform user location input into a standardized LocationItem with coordinates.
 * Looks in local database, session geocoding cache, global dictionary, and fallback geocoder.
 */
export async function resolveLocationAsync(locationInput: string): Promise<LocationItem> {
  const query = locationInput.trim();
  if (!query) {
    return LOCATIONS_DATABASE[0];
  }

  const lower = query.toLowerCase();

  // 1. Check in-memory session cache
  if (locationCache.has(lower)) {
    return locationCache.get(lower)!;
  }

  // 2. Check local database
  const localMatch = searchLocalLocations(query, 1)[0];
  if (localMatch && (localMatch.name.toLowerCase() === lower || localMatch.code.toLowerCase() === lower || localMatch.city.toLowerCase() === lower)) {
    locationCache.set(lower, localMatch);
    return localMatch;
  }

  // 3. Check known global dictionary
  for (const [key, loc] of Object.entries(GLOBAL_KNOWN_LOCATIONS)) {
    if (lower === key || lower.startsWith(key) || lower.includes(key)) {
      const item: LocationItem = {
        id: `loc-global-${key.replace(/\s+/g, '-')}`,
        name: loc.state ? `${capitalize(key)}, ${loc.state}, ${loc.country}` : `${capitalize(key)}, ${loc.country}`,
        code: loc.code,
        type: loc.type,
        city: capitalize(key),
        state: loc.state || '',
        country: loc.country,
        aliases: [key, loc.code],
        coordinates: { lat: loc.lat, lng: loc.lng },
        isInternational: loc.country !== 'India'
      };
      locationCache.set(lower, item);
      return item;
    }
  }

  // 4. Live Geocode resolution
  try {
    const searchRes = await searchWorldwideLocations(query, 1);
    if (searchRes.results && searchRes.results.length > 0) {
      const topMatch = searchRes.results[0];
      locationCache.set(lower, topMatch);
      return topMatch;
    }
  } catch {
    // Continue to synthetic fallback
  }

  // 5. Fallback: Parse query into clean city and country without hardcoding Hyderabad or India
  return createStandardizedLocationFallback(query);
}

/**
 * Synchronous resolver used by components where an async call is not possible immediately.
 * Inspects caches, local DB, global dictionary, or returns structured standardized object.
 */
export function resolveLocationSync(locationInput: string): LocationItem {
  const query = locationInput.trim();
  if (!query) {
    return LOCATIONS_DATABASE[0];
  }

  const lower = query.toLowerCase();

  // Check cache
  if (locationCache.has(lower)) {
    return locationCache.get(lower)!;
  }

  // Check local DB
  const localMatch = searchLocalLocations(query, 1)[0];
  if (localMatch) {
    return localMatch;
  }

  // Check global dictionary
  for (const [key, loc] of Object.entries(GLOBAL_KNOWN_LOCATIONS)) {
    if (lower === key || lower.includes(key)) {
      return {
        id: `loc-global-${key.replace(/\s+/g, '-')}`,
        name: loc.state ? `${capitalize(key)}, ${loc.state}, ${loc.country}` : `${capitalize(key)}, ${loc.country}`,
        code: loc.code,
        type: loc.type,
        city: capitalize(key),
        state: loc.state || '',
        country: loc.country,
        aliases: [key, loc.code],
        coordinates: { lat: loc.lat, lng: loc.lng },
        isInternational: loc.country !== 'India'
      };
    }
  }

  return createStandardizedLocationFallback(query);
}

/**
 * Creates a clean, standardized fallback location item for any arbitrary place name
 * without hardcoding to Hyderabad, central India, or any static route.
 */
function createStandardizedLocationFallback(query: string): LocationItem {
  // Extract parts if formatted like "City, Country" or "Town, State"
  const parts = query.split(',').map(s => s.trim());
  const city = parts[0] || query;
  const countryOrState = parts.length > 1 ? parts[parts.length - 1] : '';

  // Generate pseudo-coordinates deterministically based on string hash so two identical locations match
  let hash = 0;
  for (let i = 0; i < query.length; i++) {
    hash = (hash << 5) - hash + query.charCodeAt(i);
    hash |= 0;
  }
  const pseudoLat = 15 + (Math.abs(hash) % 450) / 10;
  const pseudoLng = 20 + (Math.abs(hash >> 3) % 1200) / 10;

  return {
    id: `loc-custom-${query.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    name: query,
    code: generatePlaceCode(city),
    type: 'city',
    city: city,
    state: parts.length > 2 ? parts[1] : '',
    country: countryOrState || 'Global',
    aliases: [query, city],
    coordinates: { lat: pseudoLat, lng: pseudoLng },
    formattedAddress: query,
    isInternational: countryOrState ? countryOrState.toLowerCase() !== 'india' : false
  };
}

function deriveLocationType(featureCode?: string): LocationItem['type'] {
  if (!featureCode) return 'city';
  const code = featureCode.toUpperCase();
  if (code === 'PCLI') return 'country';
  if (code.startsWith('ADM1')) return 'state';
  if (code.startsWith('AIRP')) return 'airport';
  if (code === 'RSTN') return 'station';
  if (code.startsWith('PPL')) return 'city';
  return 'locality';
}

function generatePlaceCode(name: string, countryCode?: string): string {
  const clean = name.replace(/[^a-zA-Z]/g, '').toUpperCase();
  if (clean.length >= 3) {
    return clean.slice(0, 3);
  }
  if (countryCode) {
    return (countryCode + clean).slice(0, 3).toUpperCase();
  }
  return (clean + 'XX').slice(0, 3);
}

function capitalize(s: string): string {
  return s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}
