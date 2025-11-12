# API Methodology

> For help with the codebase or menu management, contact: [taahabz@gmail.com](mailto:taahabz@gmail.com)

## Overview

The app fetches mess menu data dynamically from a backend API. Responses are cached for the current calendar day (same-day caching) to reduce API calls and improve performance.

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
   - `fetchTodayMenu()` - Fetches today's menu with same-day caching
   - `fetchWeeklyMenu()` - Fetches weekly menu with same-day caching
   - Separate loading and error states per request

2. Caching Strategy
   - First visit: fetch from API
   - Subsequent visits: use cached data for the same calendar day
   - Automatic cache refresh on date change
   - Cache keys: `todayMenu`, `todayMenuDate`, `weeklyMenu`, `weeklyMenuDate`

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

- Cache policy: same-day caching (invalidates on date change)
- Cache keys: `todayMenu`, `todayMenuDate`, `weeklyMenu`, `weeklyMenuDate`
- CORS: use a proxy in development or configure your backend to allow the dev origin
