export enum EONETCategories {
  drought = 'drought',
  dustHaze = 'dustHaze',
  earthquakes = 'earthquakes',
  floods = 'floods',
  landslides = 'landslides',
  manmade = 'manmade',
  seaLakeIce = 'seaLakeIce',
  severeStorms = 'severeStorms',
  snow = 'snow',
  tempExtremes = 'tempExtremes',
  volcanoes = 'volcanoes',
  waterColor = 'waterColor',
  wildfires = 'wildfires',
}

export interface EventRequest {
  bbox?: string;
  source?: string;
  category?: EONETCategories;
  status?: 'open' | 'closed' | 'all';
  limit?: number;
  days?: number;
  start?: string;
  end?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  link: string;
  closed?: string;
  categories: {
    id: EONETCategories;
    title: string;
  }[];
  sources: {
    id: string;
    url: string;
  }[];
  geometry: {
    magnitudeValue?: number;
    magnitudeUnit?: string;
    date: string;
    type: string;
    coordinates: [number, number];
  }[];
}

export interface EventsResponse {
  events: Event[];
  title: string;
  description?: string;
  link: string;
}
