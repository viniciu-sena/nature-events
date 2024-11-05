import axios from 'axios';
import { Event, EventRequest, EventsResponse } from '../types/events';
import {
  Address,
  Reverse,
  ReverseRequest,
  SearchFullNameRequest,
} from '../types/location';
import { GetResponse } from './types';

const location = {
  byFullName: (params: SearchFullNameRequest): GetResponse<Address[]> =>
    axios.get('https://nominatim.openstreetmap.org/search', {
      params: { q: params.q, format: 'jsonv2' },
    }),
  reverse: (params: ReverseRequest): GetResponse<Reverse> =>
    axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: { lat: params.lat, lon: params.lon, format: 'jsonv2' },
    }),
};

const eonet = {
  get: (params: EventRequest): GetResponse<EventsResponse> =>
    axios.get('https://eonet.gsfc.nasa.gov/api/v3/events', { params }),
  event: (id: string): GetResponse<Event> =>
    axios.get(`https://eonet.gsfc.nasa.gov/api/v3/events/${id}`),
};

export const client = { location, eonet };
