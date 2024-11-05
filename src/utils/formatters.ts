import { Event, EventsResponse } from '../types/events';

export const formatterData = (response: { data: EventsResponse }): Event[] => {
  return response.data.events
    .filter((event) =>
      event.geometry.every(
        (geo) =>
          Array.isArray(geo.coordinates) &&
          geo.coordinates.length === 2 &&
          geo.coordinates.every((coord) => typeof coord === 'number'),
      ),
    )
    .map((event) => formatterSingleData(event));
};

export const formatterSingleData = (response: Event): Event => {
  return {
    ...response,
    geometry: response.geometry.map((geo) => ({
      ...geo,
      coordinates: [...geo.coordinates],
    })),
  };
};

export const formatterDate = (date?: string): Date | undefined => {
  if (date) {
    const value = new Date(date);
    return new Date(value.getTime() + 86400000);
  }
};
