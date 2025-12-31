# Backend Modification Guide

To return fully populated venue and category data in your events API, modify your backend event service as follows:

## Required Changes

### 1. Event Service (`event.service.js`)

Locate your `getAllEvents` or `findAll` method and add `.populate()` calls:

```javascript
// Before (returns only IDs)
async function getAllEvents() {
  return await Event.find().populate("createdBy");
}

// After (returns populated venue and category)
async function getAllEvents() {
  return await Event.find()
    .populate("createdBy")
    .populate("venueId") // Add this
    .populate("categoryId"); // Add this
}
```

### 2. Single Event Retrieval

Also update the method that fetches a single event:

```javascript
async function getEventById(id) {
  return await Event.findById(id)
    .populate("createdBy")
    .populate("venueId")
    .populate("categoryId");
}
```

### 3. Optional: Selective Field Population

If you want to limit which fields are returned from populated documents:

```javascript
async function getAllEvents() {
  return await Event.find()
    .populate("createdBy", "email firstName")
    .populate("venueId", "name address city capacity") // Select specific fields
    .populate("categoryId", "name description"); // Select specific fields
}
```

## Testing

After making these changes:

1. Restart your backend server
2. Test the API endpoint: `GET http://localhost:5000/events`
3. Verify the response includes full venue and category objects instead of just IDs

### Example Expected Response

```json
{
  "data": {
    "events": [
      {
        "_id": "123",
        "title": "Summer Festival",
        "venueId": {
          "_id": "venue123",
          "name": "Grand Arena",
          "address": "123 Main St",
          "city": "Metropolis"
        },
        "categoryId": {
          "_id": "cat123",
          "name": "Festival",
          "description": "Large outdoor events"
        }
      }
    ]
  }
}
```

## Notes

- The frontend TypeScript types have been updated to support both populated and unpopulated versions
- No frontend API changes are needed - it will automatically work once backend returns populated data
- Make sure your `Category` and `Venue` Mongoose models are properly exported
