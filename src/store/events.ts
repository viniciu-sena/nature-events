import { create } from 'zustand';
import { Event } from '../types/events';
import { getStorage, setStorage } from '../utils/persistStore';

interface EventsStore {
  events: Event[] | null;
  loading: boolean;
  setEvents: (events: Event[] | null) => void;
  setLoading: (loading: boolean) => void;
}

export const eventsStore = create<EventsStore>((set) => ({
  events: getStorage('events'),
  loading: getStorage('loading') ?? false,
  setEvents: (events: Event[] | null) => setStorage('events', events, set),
  setLoading: (loading: boolean) => setStorage('loading', loading, set),
}));
