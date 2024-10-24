import { optionsStore } from '../../store/options';

export function useMain() {
  const { location, setLocation } = optionsStore((state) => state);

  return { location, setLocation };
}
