export interface IBooking {
  _id: string;
  bookingReference: string;
  userId: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: number;
  };
  eventId: {
    _id: string;
    title: string;
    description: string;
    images: string[];
    startDateTime: string;
    endDateTime: string;
    venue: {
      address: string;
      city: string;
      country: string;
    };
  };
  ticketType: string;
  seatsBooked: number;
  totalAmount: number;
  status: string;
  cancellationAllowed: boolean;
  cancellationDeadline: string;
  bookingDate: string;
  createdAt: string;
  updatedAt: string;
}
