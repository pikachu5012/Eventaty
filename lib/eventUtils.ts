import { IEvent } from "@/types/event";
import { IVenue } from "@/types/venue";
import { ICategory } from "@/types/category";

/**
 * Utility functions to safely access event data whether it's populated or not
 */

/**
 * Get venue name from event, whether venueId is populated or not
 */
export function getVenueName(event: IEvent): string {
  if (typeof event.venueId === "object" && event.venueId !== null) {
    return event.venueId.name;
  }
  return "Unknown Venue";
}

/**
 * Get venue address from event, whether venueId is populated or not
 */
export function getVenueAddress(event: IEvent): string {
  if (typeof event.venueId === "object" && event.venueId !== null) {
    return event.venueId.address;
  }
  return "";
}

/**
 * Get venue city from event, whether venueId is populated or not
 */
export function getVenueCity(event: IEvent): string {
  if (typeof event.venueId === "object" && event.venueId !== null) {
    return event.venueId.city;
  }
  return "";
}

/**
 * Get full venue object if populated, otherwise null
 */
export function getVenue(event: IEvent): IVenue | null {
  if (typeof event.venueId === "object" && event.venueId !== null) {
    return event.venueId;
  }
  return null;
}

/**
 * Get venue ID string, whether venueId is populated or not
 */
export function getVenueId(event: IEvent): string {
  if (typeof event.venueId === "object" && event.venueId !== null) {
    return event.venueId._id;
  }
  return event.venueId;
}

/**
 * Get category name from event, whether categoryId is populated or not
 */
export function getCategoryName(event: IEvent): string {
  if (typeof event.categoryId === "object" && event.categoryId !== null) {
    return event.categoryId.name;
  }
  return "Unknown Category";
}

/**
 * Get full category object if populated, otherwise null
 */
export function getCategory(event: IEvent): ICategory | null {
  if (typeof event.categoryId === "object" && event.categoryId !== null) {
    return event.categoryId;
  }
  return null;
}

/**
 * Get category ID string, whether categoryId is populated or not
 */
export function getCategoryId(event: IEvent): string {
  if (typeof event.categoryId === "object" && event.categoryId !== null) {
    return event.categoryId._id;
  }
  return event.categoryId;
}

/**
 * Check if event data is fully populated
 */
export function isEventPopulated(event: IEvent): boolean {
  return (
    typeof event.venueId === "object" &&
    event.venueId !== null &&
    typeof event.categoryId === "object" &&
    event.categoryId !== null
  );
}
