# Wasel Palestine - Progress Report

## 1. Project Information

**Project Name:** Wasel Palestine  
**Type:** Backend System  
**Framework:** NestJS  
**Database:** PostgreSQL  
**ORM:** TypeORM

---

## 2. Project Goal

Wasel Palestine aims to provide a backend platform for managing road incidents, checkpoints, crowdsourced reports, and user alerts in Palestine.

The system helps users submit reports, track checkpoint conditions, verify incidents, and receive alerts based on location and incident type.

---

## 3. Completed Features

### F1 - Authentication & User Management

- User registration and login
- JWT access token
- Refresh token flow
- Logout
- Current user endpoint
- Role-based access control

### F2 - Checkpoint Management

- Create checkpoints
- Retrieve checkpoints
- Search checkpoints
- Update checkpoint status
- Delete checkpoints

### F3 - Checkpoint Status History

- Automatic history tracking when checkpoint status changes
- Retrieve all history records
- Retrieve recent history
- Retrieve history by checkpoint

### F4 - Incident Management

- Create incidents
- Update incidents
- Retrieve incidents with filtering and pagination
- Verify incidents
- Close incidents

### F5 - Crowdsourced Reports

- Create user reports
- Detect duplicate reports based on category and location
- Vote on reports
- Update confidence score

### F6 - Alerts System

- Create alert subscriptions
- Match verified incidents with subscriptions
- Generate alert records automatically

### F7 - Moderation Logs

- Track moderation actions
- Log incident verification
- Log incident closure

### F8 - External Routing API

- Integrated OpenRouteService
- Estimate route distance and duration
- Cache route results

### F9 - External Weather API

- Integrated Open-Meteo
- Fetch current weather by coordinates
- Cache weather results

### F10 - Analytics

- Added analytics endpoint using raw SQL
- Incident count by status
- Report count by category
- Verified incident count
- Alert record count

### F11 - Docker Support

- Added Dockerfile
- Added docker-compose.yml
- Added PostgreSQL container support

### F12 - Performance Testing

- Added k6 read-heavy performance test
- Tested incidents endpoint under load

---

## 4. External APIs Used

### OpenRouteService

Used for route estimation between two geographic points.

### Open-Meteo

Used for fetching current weather data based on latitude and longitude.

---

## 5. Database Summary

The system uses PostgreSQL with TypeORM entities.

Main tables:

- users
- checkpoints
- checkpoint_status_history
- incidents
- reports
- report_votes
- alert_subscriptions
- alert_records
- moderation_logs
- route_cache
- weather_cache

---

## 6. GitHub Workflow

The project was developed using Git branches and structured commits.

Examples of used branches:

- develop
- fix/phase-1-versioning-security
- feature/checkpoint
- feature/incident

The final stable work is merged into the develop branch and prepared for main.

---

## 7. Testing Summary

The project was tested using:

- API-Dog / Postman for API testing
- k6 for performance testing
- Manual smoke tests for major endpoints

Main tested endpoints:

- Auth
- Incidents
- Reports
- Alerts
- Routing
- Weather
- Analytics

---

## 8. Challenges

Main challenges included:

- Handling JWT access and refresh tokens correctly
- Connecting incident verification with alert generation
- Avoiding duplicated report logic
- Managing external API caching
- Dockerizing the backend with PostgreSQL

---

## 9. Future Improvements

Possible future improvements:

- Add real-time notifications using WebSockets
- Add advanced route avoidance logic
- Add frontend dashboard
- Improve automated unit and e2e testing
- Add deployment pipeline

---

## 10. Current Status

The backend system is functional and includes the main required features:

- Authentication
- Role-based access
- Incidents
- Reports
- Alerts
- External APIs
- Analytics
- Docker
- API documentation
- Performance testing
