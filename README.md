# 🚀 Wasel Palestine Backend

## 📌 Overview

Wasel Palestine is a backend system built using **NestJS, TypeORM, and PostgreSQL** that focuses on:

- Road Incidents Management
- Checkpoint Status Tracking
- Crowdsourced Reporting System
- Alert & Notification System
- External API Integration (Routing & Weather)
- Analytics and Performance Testing

The system enables users to report incidents, track checkpoints, verify road conditions, and receive alerts based on their subscriptions.

---

## 🏗️ Tech Stack

- **Backend Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT (Access + Refresh Tokens)
- **Validation:** class-validator / class-transformer
- **API Documentation:** API-Dog / Postman collection
- **Performance Testing:** k6
- **Containerization:** Docker + Docker Compose
- **External APIs:**
  - OpenRouteService (Routing)
  - Open-Meteo (Weather)

---

## 📚 Project Documentation

Additional documentation is available inside the `docs/` directory:

- `docs/features.md`  
  Lists all implemented features with feature numbers and related endpoints.

- `docs/progress-report.md`  
  Contains the project progress report, completed features, challenges, testing summary, and future improvements.

- `docs/api-dog/`  
  Contains the exported API-Dog/Postman collection used to document and test the API endpoints.

- `docs/k6/`  
  Contains k6 performance testing scripts.

The feature numbering in `docs/features.md` is aligned with the API-Dog collection folders.

---

## 🔐 Authentication System

- JWT-based authentication
- Access Token
- Refresh Token
- Secure refresh token storage using hashing
- Logout invalidates the stored refresh token
- Role-based access control:
  - ADMIN
  - MODERATOR
  - CITIZEN

Public registration creates a `CITIZEN` user by default. Admin and moderator accounts are managed internally for security reasons.

---

## 📦 Core Modules

### F1 - User & Authentication Module

- Register / Login
- Refresh Token
- Logout
- Get Current User
- Role-based guards

---

### F2 - Checkpoint Module

- Manage checkpoints
- Search checkpoints
- Update checkpoint status
- Automatic status history tracking

---

### F3 - Checkpoint Status History

- Tracks checkpoint status changes
- Provides history by checkpoint
- Provides recent checkpoint status changes

---

### F4 - Incident Module

- Create Incident
- Update Incident
- Verify Incident
- Close Incident
- Filter and query incidents
- Linked with users:
  - createdBy
  - verifiedBy
  - closedBy

Verified incidents automatically create moderation logs and alert records for matching subscriptions.

---

### F5 - Report Module

- Users can submit reports
- Duplicate detection based on category and location
- Voting system
- Confidence score calculation

---

### F6 - Alert System

#### Alert Subscriptions

Users subscribe to incident categories within a geographic radius.

#### Alert Records

Alert records are automatically created when a verified incident matches a user subscription.

---

### F7 - Moderation Logs

Moderation actions are stored for auditability, including:

- Incident verification
- Incident closure

---

### F8 - Route Estimation External API

The system integrates with **OpenRouteService** to estimate distance and duration between two coordinates.

Endpoint:

```http
GET /api/v1/route-cache/estimate
```
