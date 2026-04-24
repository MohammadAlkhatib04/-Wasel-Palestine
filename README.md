# 🚀 Wasel Palestine Backend

## 📌 Overview

Wasel Palestine is a backend system built using **NestJS, TypeORM, and PostgreSQL** that focuses on:

* Road Incidents Management
* Checkpoint Status Tracking
* Crowdsourced Reporting System
* Alert & Notification System
* External API Integration (Routing & Weather)

The system enables users to report incidents, track checkpoints, and receive alerts based on their subscriptions.

---

## 🏗️ Tech Stack

* **Backend Framework:** NestJS
* **Database:** PostgreSQL
* **ORM:** TypeORM
* **Authentication:** JWT (Access + Refresh Tokens)
* **Validation:** class-validator
* **External APIs:**

  * OpenRouteService (Routing)
  * Open-Meteo (Weather)

---

## 🔐 Authentication System

* JWT-based authentication
* Access Token (short-lived)
* Refresh Token (long-lived)
* Secure token storage (hashed refresh tokens)
* Role-based access control:

  * ADMIN
  * MODERATOR
  * CITIZEN

---

## 📦 Core Modules

### 👤 User Module

* Register / Login
* Refresh Token
* Logout
* Get Current User

---

### 🚧 Incident Module

* Create Incident
* Update / Close / Verify
* Filter & Query incidents
* Linked with users (createdBy, verifiedBy, closedBy)

---

### 📍 Checkpoint Module

* Manage checkpoints
* Track status updates
* Automatic status history

---

### 📢 Report Module

* Users can submit reports
* Duplicate detection (based on location)
* Voting system (up/down)
* Confidence score calculation

---

### 🔔 Alert System

#### Alert Subscriptions

* Users subscribe to incident types

#### Alert Records

* Automatically created when incidents are verified
* Tracks notifications sent to users

---

### 🌍 External APIs Integration

#### 🚗 Routing (OpenRouteService)

* Estimate distance and duration between two locations
* Cached responses to improve performance

Endpoint:

```http
GET /api/v1/route-cache/estimate
```

---

#### 🌦️ Weather (Open-Meteo)

* Fetch real-time weather data
* Cached responses

Endpoint:

```http
GET /api/v1/weather-cache/current
```

---

### 📊 Analytics Module (Raw SQL)

Provides system insights using raw SQL queries.

Endpoint:

```http
GET /api/v1/analytics/summary
```

Returns:

* Incidents grouped by status
* Reports grouped by category
* Verified incidents count
* Alert records count

---

## ⚙️ Setup Instructions

### 1) Clone the repository

```bash
git clone https://github.com/YOUR_REPO.git
cd YOUR_PROJECT
```

---

### 2) Install dependencies

```bash
npm install
```

---

### 3) Setup environment variables

Create `.env.development`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=wasel_db

JWT_SECRET=secret
JWT_REFRESH_SECRET=refresh_secret

ORS_API_KEY=your_openrouteservice_key
```

---

### 4) Run the project

```bash
npm run start:dev
```

---

## 🔁 API Base URL

```text
http://localhost:3000/api/v1
```

---

## 🧪 Example Endpoints

### Auth

* POST `/user/register`
* POST `/user/login`
* POST `/user/refresh`
* POST `/user/logout`

---

### Incidents

* GET `/incident`
* POST `/incident`
* PATCH `/incident/:id/verify`
* PATCH `/incident/:id/close`

---

### Reports

* POST `/reports`
* GET `/reports`
* POST `/reports/:id/vote`

---

### Analytics

* GET `/analytics/summary`

---

### External APIs

* GET `/route-cache/estimate`
* GET `/weather-cache/current`

---

## 🧠 Key Features

* Modular architecture
* Scalable backend design
* Secure authentication flow
* Caching system for performance
* Real-time contextual data (weather + routing)
* Automated alert system
* Raw SQL usage for analytics

---

## 📈 Performance Considerations

* Caching implemented for:

  * Routes
  * Weather data
* Reduces external API calls
* Improves response time

---

## 🧩 Future Improvements

* Dockerization
* Real-time notifications (WebSockets)
* Frontend dashboard
* Advanced analytics

---

## 👨‍💻 Author

Mohammad Alkhatib

---

## 📄 License

This project is for educational purposes.
