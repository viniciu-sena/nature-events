import { create } from 'zustand';
import { getStorage, setStorage } from '../utils/persistStore';

interface Options {
  location: string | null;
  latLon: [number, number] | null;
  setLocation: (location: string) => void;
  setLatLon: (latLon: [number, number]) => void;
}

export const optionsStore = create<Options>((set) => ({
  location: getStorage('location'),
  latLon: getStorage('latLon'),
  setLocation: (location: string) => setStorage('location', location, set),
  setLatLon: (latLon: [number, number]) => setStorage('latLon', latLon, set),
}));
