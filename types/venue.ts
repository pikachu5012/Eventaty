import { IEvent } from "./event";

export interface IAmenity {
  name: string;
  icon: string;
  id?: string;
  _id?: string;
}

export interface IVenue {
  _id: string;
  name: string;
  address: string;
  images: string[];
  city: string;
  state: string;
  postalCode: string;
  country: string;
  longitude: number;
  latitude: number;
  capacity: number;
  description?: string;
  amenities?: IAmenity[];
  eventCount?: number;
  events?: IEvent[];
}
