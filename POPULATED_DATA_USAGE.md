# Using Populated Event Data - Examples

This guide shows how to use events with populated venue and category data in your frontend components.

## Overview

After implementing the backend changes (see [`BACKEND_POPULATION_GUIDE.md`](file:///d:/College/iti/Project/eventaty/BACKEND_POPULATION_GUIDE.md)), your events API will return fully populated venue and category objects instead of just IDs.

## TypeScript Types

The [`IEvent`](file:///d:/College/iti/Project/eventaty/types/event.ts) interface now supports both populated and unpopulated data:

```typescript
interface IEvent {
  // ... other fields
  categoryId: string | ICategory; // Can be ID or full object
  venueId: string | IVenue; // Can be ID or full object
}
```

## Using Utility Functions

Import and use the utility functions from [`lib/eventUtils.ts`](file:///d:/College/iti/Project/eventaty/lib/eventUtils.ts):

### Example 1: Displaying Event Card

```tsx
import { IEvent } from "@/types/event";
import {
  getVenueName,
  getVenueAddress,
  getCategoryName,
} from "@/lib/eventUtils";

function EventCard({ event }: { event: IEvent }) {
  return (
    <div>
      <h2>{event.title}</h2>
      <p>Category: {getCategoryName(event)}</p>
      <p>Venue: {getVenueName(event)}</p>
      <p>Address: {getVenueAddress(event)}</p>
      <p>Price: ${event.price}</p>
    </div>
  );
}
```

### Example 2: Filtering Events by Category

```tsx
import { IEvent } from "@/types/event";
import { getCategoryName } from "@/lib/eventUtils";

function filterEventsByCategory(events: IEvent[], categoryName: string) {
  return events.filter(
    (event) =>
      getCategoryName(event).toLowerCase() === categoryName.toLowerCase()
  );
}

// Usage
const concertEvents = filterEventsByCategory(allEvents, "Concert");
```

### Example 3: Filtering by Venue Location

```tsx
import { IEvent } from "@/types/event";
import { getVenueAddress, getVenueCity } from "@/lib/eventUtils";

function filterEventsByLocation(events: IEvent[], searchTerm: string) {
  return events.filter((event) => {
    const address = getVenueAddress(event).toLowerCase();
    const city = getVenueCity(event).toLowerCase();
    const term = searchTerm.toLowerCase();

    return address.includes(term) || city.includes(term);
  });
}
```

### Example 4: Checking if Event is Populated

```tsx
import { IEvent } from "@/types/event";
import { isEventPopulated, getVenue, getCategory } from "@/lib/eventUtils";

function EventDetails({ event }: { event: IEvent }) {
  if (isEventPopulated(event)) {
    const venue = getVenue(event)!; // Safe to use ! because we checked
    const category = getCategory(event)!;

    // Access full venue and category data
    console.log("Venue capacity:", venue.capacity);
    console.log("Category description:", category.description);
  }

  // ... render component
}
```

### Example 5: Updated EventsList Component

Update your [`EventsList.tsx`](file:///d:/College/iti/Project/eventaty/components/sections/EventsList.tsx) to use the utilities:

```tsx
import { getCategoryName, getVenueAddress } from "@/lib/eventUtils";

const filteredEvents = useMemo(() => {
  return allEvents.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Use utility function to get category name (works with populated or unpopulated)
    const matchesCategory =
      selectedCategory === "All" || getCategoryName(event) === selectedCategory;

    // Use utility function to get venue address
    const matchesLocation = getVenueAddress(event)
      .toLowerCase()
      .includes(locationFilter.toLowerCase());

    const matchesDate =
      !dateFilter ||
      (() => {
        const eventDate = new Date(event.startDateTime); // Use startDateTime instead of date
        const [year, month, day] = dateFilter.split("-").map(Number);
        const filterDate = new Date(year, month - 1, day);

        return (
          eventDate.getFullYear() === filterDate.getFullYear() &&
          eventDate.getMonth() === filterDate.getMonth() &&
          eventDate.getDate() === filterDate.getDate()
        );
      })();

    return matchesSearch && matchesCategory && matchesLocation && matchesDate;
  });
}, [searchQuery, selectedCategory, locationFilter, dateFilter, allEvents]);
```

## API Response Structure

### Before (Unpopulated)

```json
{
  "_id": "evt123",
  "title": "Summer Festival",
  "categoryId": "cat456",
  "venueId": "ven789"
}
```

### After (Populated)

```json
{
  "_id": "evt123",
  "title": "Summer Festival",
  "categoryId": {
    "_id": "cat456",
    "name": "Festival",
    "description": "Large outdoor events"
  },
  "venueId": {
    "_id": "ven789",
    "name": "Grand Arena",
    "address": "123 Main St",
    "city": "Metropolis",
    "capacity": 5000
  }
}
```

## Benefits

✅ **Type-safe**: TypeScript knows the data can be either populated or not  
✅ **Flexible**: Works with both populated and unpopulated data  
✅ **Clean code**: Utility functions handle the type checking for you  
✅ **Future-proof**: Easy to adapt if backend changes

## Next Steps

1. **Backend**: Follow the [`BACKEND_POPULATION_GUIDE.md`](file:///d:/College/iti/Project/eventaty/BACKEND_POPULATION_GUIDE.md) to add populate calls
2. **Test**: Verify the API returns populated data
3. **Update Components**: Use the utility functions in your React components
4. **Enjoy**: Access full venue and category details without additional API calls!
