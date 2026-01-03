import { IVenue } from "./venue";
import { ICategory } from "./category";

export interface ITicket {
  _id: string;
  type: string;
  description: string;
  multiplier: number;
}

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  images: string[];
  startDateTime: string;
  endDateTime: string;

  // Support both populated (object) and unpopulated (string) versions
  categoryId: string | ICategory;
  venueId: string | IVenue;

  totalCapacity: number;
  availableSeats: number;
  price: number;
  eventType: string;
  status: string;
  featured: boolean;
  createdBy: {
    _id: string;
    email: string;
    firstName: string;
  };
  createdAt: string;
  updatedAt: string;
  tickets: ITicket[];
}

// Helper type for fully populated events (when you know data is populated)
export interface IEventPopulated
  extends Omit<IEvent, "categoryId" | "venueId"> {
  categoryId: ICategory;
  venueId: IVenue;
  tickets: ITicket[];
}
