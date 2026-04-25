# Wasel Palestine - Implemented Features

## F1 - Authentication & User Management

**Description:**  
The system supports secure user registration and login using JWT authentication. It uses access tokens and refresh tokens to improve security and user experience.

**Implemented Endpoints:**

- `POST /api/v1/user/register`
- `POST /api/v1/user/login`
- `POST /api/v1/user/refresh`
- `POST /api/v1/user/logout`
- `GET /api/v1/user/current-user`

**Roles:**

- Citizen
- Moderator
- Admin

---

## F2 - Checkpoint Management

**Description:**  
Admins and moderators can manage checkpoints and update their operational status.

**Implemented Endpoints:**

- `POST /api/v1/checkpoint`
- `GET /api/v1/checkpoint`
- `GET /api/v1/checkpoint/:id`
- `GET /api/v1/checkpoint/search`
- `PATCH /api/v1/checkpoint/:id`
- `DELETE /api/v1/checkpoint`

---

## F3 - Checkpoint Status History

**Description:**  
The system automatically tracks checkpoint status changes for audit and historical review.

**Implemented Endpoints:**

- `GET /api/v1/checkpoint-status-history`
- `GET /api/v1/checkpoint-status-history/recent`
- `GET /api/v1/checkpoint-status-history/checkpoint/:checkpointId`

---

## F4 - Incident Management

**Description:**  
Users can create incidents, while moderators/admins can verify or close incidents. Verified incidents trigger moderation logs and alert records.

**Implemented Endpoints:**

- `POST /api/v1/incident`
- `GET /api/v1/incident`
- `GET /api/v1/incident/:id`
- `PATCH /api/v1/incident/:id`
- `PATCH /api/v1/incident/:id/verify`
- `PATCH /api/v1/incident/:id/close`

---

## F5 - Crowdsourced Reports

**Description:**  
Citizens can submit reports about road conditions. The system supports duplicate detection, voting, and confidence score updates.

**Implemented Endpoints:**

- `POST /api/v1/reports`
- `GET /api/v1/reports`
- `GET /api/v1/reports/:id`
- `POST /api/v1/reports/:id/vote`

---

## F6 - Alert Subscriptions & Alert Records

**Description:**  
Users can subscribe to incident categories within a geographic radius. When a matching incident is verified, the system automatically creates alert records.

**Implemented Endpoints:**

- `POST /api/v1/alert-subscriptions`
- `GET /api/v1/alert-subscriptions/my`
- `GET /api/v1/alert-subscriptions`
- `GET /api/v1/alert-subscriptions/:id`
- `PATCH /api/v1/alert-subscriptions/:id`
- `PATCH /api/v1/alert-subscriptions/:id/toggle`
- `DELETE /api/v1/alert-subscriptions/:id`
- `GET /api/v1/alert-records`
- `GET /api/v1/alert-records/my`

---

## F7 - Moderation Logs

**Description:**  
Moderation actions such as verifying or closing incidents are logged for auditability.

**Implemented Endpoints:**

- `GET /api/v1/moderation-logs`
- `POST /api/v1/moderation-logs`

---

## F8 - Route Estimation External API

**Description:**  
The system integrates with OpenRouteService to estimate distance and duration between two geographic points. Results are cached to reduce external API calls.

**Implemented Endpoints:**

- `GET /api/v1/route-cache/estimate`
- `GET /api/v1/route-cache`

**External Provider:**

- OpenRouteService

---

## F9 - Weather External API

**Description:**  
The system integrates with Open-Meteo to fetch current weather data for a location. Results are cached for performance.

**Implemented Endpoints:**

- `GET /api/v1/weather-cache/current`
- `GET /api/v1/weather-cache`

**External Provider:**

- Open-Meteo

---

## F10 - Analytics Using Raw SQL

**Description:**  
The system provides analytics summaries using raw SQL queries in addition to ORM-based operations.

**Implemented Endpoints:**

- `GET /api/v1/analytics/summary`

---

## F11 - Docker Support

**Description:**  
The project supports containerized execution using Docker and Docker Compose.

**Files:**

- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`

---

## F12 - Performance Testing

**Description:**  
k6 is used to test backend performance under load.

**Files:**

- `docs/k6/test.js`

**Tested Scenario:**

- Read-heavy incidents endpoint
