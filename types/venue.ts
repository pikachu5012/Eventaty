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
}
