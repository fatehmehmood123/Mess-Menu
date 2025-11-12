# API Methodology

> For help with the codebase or menu management, contact: [taahabz@gmail.com](mailto:taahabz@gmail.com)

## Overview

The app fetches mess menu data dynamically from a backend API. Responses are cached for 15 minutes to reduce API calls and improve performance while ensuring users see updated menu changes relatively quickly.

## Configuration

API URL is configured in `src/config.js`:

```javascript
const config = {
  API_BASE_URL: "http://localhost:3000"
};

export default config;
```

- For production, set `API_BASE_URL` to your deployed API URL.
- For development, if you are not using a proxy, set `API_BASE_URL` to your local backend URL (e.g., `http://localhost:3000`).

## Endpoints Used

### 1. Today's Menu

- URL: `GET /api/menu/today`
- Returns: Today's breakfast, lunch, and dinner

```json
{
  "date": "2025-11-11",
  "day": "tuesday",
  "meals": {
    "breakfast": ["Paratha", "Omelette", "Tea"],
    "lunch": ["Chicken Biryani", "Raita"],
    "dinner": ["Daal", "Roti", "Salad"]
  }
}
```

### 2. Weekly Menu

- URL: `GET /api/menu/week`
- Returns: Full week menu (Monday to Sunday)

```json
{
  "weekNumber": 1,
  "menu": {
    "monday": {
      "breakfast": ["..."],
      "lunch": ["..."],
      "dinner": ["..."]
    },
    "tuesday": {"breakfast": ["..."], "lunch": ["..."], "dinner": ["..."]}
  }
}
```

## How It Works

1. Redux Store (`src/redux/menu.js`)
   - `fetchTodayMenu()` - Fetches today's menu with 15-minute caching
   - `fetchWeeklyMenu()` - Fetches weekly menu with 15-minute caching
   - Separate loading and error states per request

2. Caching Strategy
   - First visit: fetch from API
   - Subsequent visits: use cached data if less than 15 minutes old AND same calendar day
   - Automatic cache refresh after 15-minute TTL expires OR at midnight
   - Cache keys: `todayMenu`, `todayMenuTime`, `todayMenuDate`, `weeklyMenu`, `weeklyMenuTime`, `weeklyMenuDate`
   - TTL: 900000ms (15 minutes)
   - Day change invalidation: ensures fresh data at midnight

3. Components
   - `Today.js` - shows today's menu (prefetches weekly menu in background)
   - `Weekly.js` - shows weekly menu
   - UI: green spinner (#9bb158) during loading, error alerts with retry

4. Data Flow

Cache Check → API Call (if needed) → Redux Store → Components → Display

## Deployment

1. Update `src/config.js` with production API URL.
2. Optionally use a dev proxy pointing to your backend; otherwise set `API_BASE_URL` for development to your local backend.
3. Build: `npm run build`.
4. Deploy the `build` folder.

## Developer Notes

- Cache policy: 15-minute time-based TTL (900000ms) + day change invalidation
- Cache keys: `todayMenu`, `todayMenuTime`, `todayMenuDate`, `weeklyMenu`, `weeklyMenuTime`, `weeklyMenuDate`
- Users will see menu updates within 15 minutes of backend changes
- Cache automatically invalidates at midnight (day boundary)
- CORS: use a proxy in development or configure your backend to allow the dev origin
