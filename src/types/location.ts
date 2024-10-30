export interface SearchFullNameRequest {
  q: string;
}

export interface ReverseRequest {
  lat: number;
  lon: number;
}

export interface Address {
  place_id: number;
  licence: string;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: number[];
  geojson: {
    type: string;
    coordinates: number[];
  };
}

export interface Reverse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    'house_number': string;
    'road': string;
    'neighbourhood': string;
    'suburb': string;
    'city': string;
    'municipality': string;
    'region': string;
    'state': string;
    'ISO3166-2-lvl4': string;
    'postcode': string;
    'country': string;
    'country_code': string;
  };
  boundingbox: string[];
}
