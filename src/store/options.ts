import { format } from 'date-fns';
import { create } from 'zustand';
import { EONETCategories, EventRequest } from '../types/events';
import { Address } from '../types/location';
import { getStorage, setStorage } from '../utils/persistStore';

interface Options {
  location: Address | null;
  category: EONETCategories | undefined;
  status: EventRequest['status'] | undefined;
  start: string | undefined;
  end: string | undefined;
  setLocation: (location: Address | null) => void;
  setCategory: (category: EONETCategories | undefined) => void;
  setStatus: (status: EventRequest['status'] | undefined) => void;
  setStart: (start: Date | undefined) => void;
  setEnd: (end: Date | undefined) => void;
}

export const optionsStore = create<Options>((set) => ({
  location: getStorage('location'),
  category: getStorage('category') ?? undefined,
  status: getStorage('status') ?? 'open',
  start: getStorage('start') ?? undefined,
  end: getStorage('end') ?? undefined,
  setLocation: (location: Address | null) =>
    setStorage('location', location, set),
  setCategory: (category: EONETCategories | undefined) =>
    setStorage('category', (category as string) === '' ? null : category, set),
  setStatus: (status: EventRequest['status'] | undefined) =>
    setStorage('status', status || 'open', set),
  setStart: (start: Date | undefined) => {
    const date = start ? format(start.getTime(), 'yyyy-MM-dd') : null;
    return setStorage('start', date, set);
  },
  setEnd: (end: Date | undefined) => {
    const date = end ? format(end.getTime(), 'yyyy-MM-dd') : null;
    return setStorage('end', date, set);
  },
}));
