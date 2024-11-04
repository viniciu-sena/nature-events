export const getStorage = <T>(key: string): T | null => {
  const item = sessionStorage.getItem(key);
  return item !== null && item ? JSON.parse(item) : null;
};

export const setStorage = <T>(
  key: keyof T,
  value: T[keyof T],
  set: (
    partial: T | Partial<T> | ((state: T) => T | Partial<T>),
    replace?: false | undefined,
  ) => void,
) => {
  if (value === null || !value) {
    sessionStorage.removeItem(key as string);
  }
  sessionStorage.setItem(key as string, JSON.stringify(value));
  set((state) => ({ ...state, [key]: value }));
};
