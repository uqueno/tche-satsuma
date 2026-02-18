# API Design - Tche Satsuma Event Management System

## Overview

RESTful API design for the Tche Satsuma Event Management System using Next.js API Routes.

## Base URL

Development: `http://localhost:3000/api`
Production: `https://tchesatsuma.org/api`

## Authentication

### JWT Token-based Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Auth Endpoints

#### POST /api/auth/login
Login user and receive JWT token

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "João",
    "lastName": "Silva",
    "role": "event_coordinator"
  },
  "token": "jwt_token_here",
  "expiresAt": "2026-03-01T12:00:00Z"
}
```

#### POST /api/auth/register
Register new user (admin only)

#### POST /api/auth/refresh
Refresh JWT token

#### POST /api/auth/logout
Invalidate current token

#### POST /api/auth/forgot-password
Request password reset

#### POST /api/auth/reset-password
Reset password with token

---

## Members API

### GET /api/members
List all members with pagination and filtering

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20, max: 100)
- `status` (string: active|inactive|honorary)
- `memberType` (string: regular|vip|volunteer|board)
- `search` (string: search by name or email)
- `sort` (string: firstName|lastName|createdAt)
- `order` (string: asc|desc)

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "membershipNumber": "TCH001",
      "firstName": "Maria",
      "lastName": "Tanaka",
      "email": "maria@example.com",
      "phone": "+55519999999",
      "membershipStatus": "active",
      "memberType": "regular",
      "isVIP": false,
      "communicationPreference": "email",
      "createdAt": "2026-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### GET /api/members/:id
Get member details by ID

**Response (200):**
```json
{
  "id": "uuid",
  "membershipNumber": "TCH001",
  "firstName": "Maria",
  "lastName": "Tanaka",
  "email": "maria@example.com",
  "phone": "+55519999999",
  "postalAddress": "Rua das Flores, 123",
  "dateOfBirth": "1980-05-15",
  "photoUrl": "https://...",
  "membershipStatus": "active",
  "memberType": "regular",
  "isVIP": false,
  "communicationPreference": "email",
  "familyMembers": ["uuid1", "uuid2"],
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-02-01T00:00:00Z"
}
```

### POST /api/members
Create new member

**Request:**
```json
{
  "membershipNumber": "TCH150",
  "firstName": "Pedro",
  "lastName": "Yamamoto",
  "email": "pedro@example.com",
  "phone": "+55519888888",
  "membershipStatus": "active",
  "memberType": "regular",
  "communicationPreference": "whatsapp"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "membershipNumber": "TCH150",
  "firstName": "Pedro",
  "lastName": "Yamamoto",
  // ... other fields
  "createdAt": "2026-02-18T00:00:00Z"
}
```

### PUT /api/members/:id
Update member

### DELETE /api/members/:id
Delete member (soft delete)

### POST /api/members/import
Bulk import members from CSV/Excel

**Request (multipart/form-data):**
- `file`: CSV or Excel file

**Response (200):**
```json
{
  "imported": 45,
  "failed": 2,
  "errors": [
    {
      "row": 10,
      "error": "Invalid email format"
    }
  ]
}
```

### GET /api/members/:id/history
Get member's event participation history

---

## Events API

### GET /api/events
List all events

**Query Parameters:**
- `page`, `limit`, `sort`, `order`
- `status` (draft|open|closed|completed|cancelled)
- `year` (filter by year)

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Almoço Anual 2026",
      "eventDate": "2026-06-15T12:00:00Z",
      "status": "open",
      "venue": {
        "id": "uuid",
        "name": "Restaurante Sakura"
      },
      "capacity": 100,
      "registrations": 75,
      "pricing": {
        "adultPrice": 80.00,
        "childPrice": 40.00
      }
    }
  ],
  "pagination": { }
}
```

### GET /api/events/:id
Get event details

### POST /api/events
Create new event

**Request:**
```json
{
  "name": "Almoço Anual 2026",
  "description": "Evento anual da comunidade",
  "eventDate": "2026-06-15T12:00:00Z",
  "registrationOpenDate": "2026-04-01T00:00:00Z",
  "registrationCloseDate": "2026-06-10T23:59:59Z",
  "venueId": "uuid",
  "capacity": 100,
  "adultPrice": 80.00,
  "childPrice": 40.00,
  "childAgeLimit": 12,
  "earlyBirdDiscount": 10.00,
  "earlyBirdDeadline": "2026-05-01T23:59:59Z"
}
```

### PUT /api/events/:id
Update event

### DELETE /api/events/:id
Delete event

### GET /api/events/:id/summary
Get event summary with statistics

**Response (200):**
```json
{
  "id": "uuid",
  "name": "Almoço Anual 2026",
  "eventDate": "2026-06-15T12:00:00Z",
  "status": "open",
  "statistics": {
    "totalRegistrations": 75,
    "totalAdults": 95,
    "totalChildren": 30,
    "totalRevenue": 8800.00,
    "totalPaid": 7200.00,
    "availableSpots": 25
  }
}
```

---

## Registrations API

### GET /api/events/:eventId/registrations
List registrations for an event

### GET /api/registrations/:id
Get registration details

### POST /api/events/:eventId/registrations
Create new registration

**Request:**
```json
{
  "memberId": "uuid",
  "numberOfAdults": 2,
  "numberOfChildren": 1,
  "childrenAges": [8],
  "dietaryRestrictions": "Vegetarian option for 1 adult",
  "paymentMethod": "transfer"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "eventId": "uuid",
  "memberId": "uuid",
  "numberOfAdults": 2,
  "numberOfChildren": 1,
  "totalAmount": 200.00,
  "paidAmount": 0.00,
  "paymentStatus": "pending",
  "registrationDate": "2026-04-15T10:30:00Z",
  "confirmed": true
}
```

### PUT /api/registrations/:id
Update registration

### DELETE /api/registrations/:id
Cancel registration

### POST /api/registrations/:id/payments
Record payment for registration

**Request:**
```json
{
  "amount": 200.00,
  "paymentMethod": "transfer",
  "transactionId": "TRX123456",
  "paymentDate": "2026-04-16T14:00:00Z"
}
```

### PATCH /api/registrations/:id/attendance
Mark attendance

**Request:**
```json
{
  "attended": true
}
```

---

## Donations API

### GET /api/events/:eventId/donations
List donations for an event

### POST /api/events/:eventId/donations
Create donation

**Request:**
```json
{
  "donorId": "uuid",
  "donorName": "Ana Silva",
  "donationType": "food",
  "description": "Sushi caseiro - 50 peças",
  "estimatedValue": 150.00,
  "destinationFund": "kagoshima-brazil"
}
```

### PUT /api/donations/:id
Update donation

### DELETE /api/donations/:id
Delete donation

---

## Venues API

### GET /api/venues
List all venues

### GET /api/venues/:id
Get venue details

### POST /api/venues
Create new venue

### PUT /api/venues/:id
Update venue

### DELETE /api/venues/:id
Delete venue

---

## Communications API

### GET /api/communications
List all communications

### GET /api/communications/:id
Get communication details

### POST /api/communications
Create and send communication

**Request:**
```json
{
  "eventId": "uuid",
  "subject": "Convite: Almoço Anual 2026",
  "body": "Prezado membro...",
  "channel": "email",
  "recipientFilter": {
    "memberType": ["regular", "vip"],
    "communicationPreference": ["email", "all"]
  },
  "scheduledDate": "2026-04-01T09:00:00Z"
}
```

### GET /api/communications/:id/status
Get delivery status for communication

**Response (200):**
```json
{
  "communicationId": "uuid",
  "totalRecipients": 100,
  "sent": 98,
  "delivered": 95,
  "opened": 45,
  "failed": 2,
  "deliveryStatus": [
    {
      "recipientId": "uuid",
      "status": "delivered",
      "sentAt": "2026-04-01T09:05:00Z",
      "deliveredAt": "2026-04-01T09:05:30Z"
    }
  ]
}
```

### POST /api/communications/templates
Create communication template

### GET /api/communications/templates
List templates

---

## Volunteers API

### GET /api/events/:eventId/volunteers
List volunteers for an event

### POST /api/events/:eventId/volunteers
Assign volunteer

**Request:**
```json
{
  "memberId": "uuid",
  "role": "Registration Desk",
  "availability": "Full day - 11:00 to 16:00"
}
```

### GET /api/volunteers/:id/tasks
Get tasks for volunteer

### POST /api/volunteers/:id/tasks
Create task

### PUT /api/tasks/:id
Update task

---

## Reports API

### GET /api/events/:eventId/reports/financial
Generate financial report

**Response (200):**
```json
{
  "eventId": "uuid",
  "eventName": "Almoço Anual 2026",
  "eventDate": "2026-06-15T12:00:00Z",
  "revenue": {
    "registrations": 8000.00,
    "donations": {
      "money": 500.00,
      "food": 800.00,
      "other": 200.00,
      "total": 1500.00
    },
    "total": 9500.00
  },
  "expenses": {
    "venue": 3000.00,
    "food": 4000.00,
    "decorations": 500.00,
    "entertainment": 800.00,
    "marketing": 300.00,
    "administrative": 200.00,
    "total": 8800.00
  },
  "netResult": 700.00,
  "kagoshimaBrasilDonation": 300.00,
  "generatedAt": "2026-06-20T10:00:00Z"
}
```

### GET /api/events/:eventId/reports/attendance
Generate attendance report

**Response (200):**
```json
{
  "eventId": "uuid",
  "eventName": "Almoço Anual 2026",
  "eventDate": "2026-06-15T12:00:00Z",
  "totalRegistrations": 80,
  "totalAttendees": 75,
  "adults": 95,
  "children": 30,
  "noShows": 5,
  "memberAttendees": 70,
  "guestAttendees": 5,
  "attendanceRate": 93.75,
  "generatedAt": "2026-06-20T10:00:00Z"
}
```

### GET /api/reports/trends
Get multi-year trends

---

## Error Responses

### Standard Error Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Error Codes

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | VALIDATION_ERROR | Invalid request data |
| 401 | UNAUTHORIZED | Authentication required |
| 403 | FORBIDDEN | Insufficient permissions |
| 404 | NOT_FOUND | Resource not found |
| 409 | CONFLICT | Resource conflict (e.g., duplicate) |
| 429 | RATE_LIMIT_EXCEEDED | Too many requests |
| 500 | INTERNAL_ERROR | Server error |

---

## Rate Limiting

- **Anonymous**: 30 requests/minute
- **Authenticated**: 100 requests/minute
- **Admin**: 300 requests/minute

## Pagination

All list endpoints support pagination:
- Default: 20 items per page
- Maximum: 100 items per page

Response includes pagination metadata:
```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Versioning

API version in URL: `/api/v1/...`

Current version: v1

---

## WebSockets (Future)

For real-time updates:

### Connection
```javascript
const ws = new WebSocket('wss://tchesatsuma.org/ws');
```

### Events
- `registration.created`
- `payment.received`
- `communication.sent`
- `event.updated`

---

## Best Practices

### Request Headers
```
Content-Type: application/json
Accept: application/json
Authorization: Bearer <token>
X-Request-ID: <uuid>
```

### Idempotency
Use `X-Idempotency-Key` header for POST/PUT requests to prevent duplicates

### Caching
Responses include cache headers:
```
Cache-Control: public, max-age=300
ETag: "abc123"
```

### Compression
All responses support gzip compression

---

## Testing

### Test API Endpoint
```
GET /api/health
```

**Response (200):**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2026-02-18T23:40:00Z"
}
```

---

**API Version**: 1.0.0
**Last Updated**: February 2026
