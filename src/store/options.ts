import { create } from 'zustand';
import { EONETCategories } from '../types/events';
import { Address } from '../types/location';
import { getStorage, setStorage } from '../utils/persistStore';

interface Options {
  location: Address | null;
  category: EONETCategories | undefined;
  setLocation: (location: Address | null) => void;
  setCategory: (category: EONETCategories | undefined) => void;
}

export const optionsStore = create<Options>((set) => ({
  location: getStorage('location'),
  category: getStorage('category') ?? undefined,
  setLocation: (location: Address | null) =>
    setStorage('location', location, set),
  setCategory: (category: EONETCategories | undefined) =>
    setStorage('category', category, set),
}));
