# API Methodology

> **For Developers:** Need help with the codebase or menu management?  
> Contact: **taahabz@gmail.com**

## Overview

This app fetches mess menu data dynamically from a backend API. Menu items are cached for 1 hour to improve performance and reduce API calls.

## Configuration

API URL is configured in `src/config.js`:

```javascript
const config = {
  API_BASE_URL: "http://localhost:3000"
};
```

For production, just change it to your deployed API URL.

## Endpoints Used

### 1. Today's Menu
- **URL:** `GET /api/menu/today`
- **Returns:** Today's breakfast, lunch, and dinner

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
- **URL:** `GET /api/menu/week`
- **Returns:** Full week menu (Monday to Sunday)

```json
{
  "weekNumber": 1,
  "menu": {
    "monday": {
      "breakfast": [...],
      "lunch": [...],
      "dinner": [...]
    },
    "tuesday": {...},
    ...
  }
}
```

## How It Works

1. **Redux Store** (`src/redux/menu.js`)
   - `fetchTodayMenu()` - Fetches today's menu with caching
   - `fetchWeeklyMenu()` - Fetches weekly menu with caching
   - localStorage cache expires after 1 hour
   - Handles loading and error states

2. **Caching Strategy**
   - First visit: Fetches from API
   - Subsequent visits: Uses cached data (1 hour)
   - Instant loading for returning users
   - Automatic cache refresh after expiry

3. **Components**
   - `Today.js` - Shows today's menu (prefetches weekly menu in background)
   - `Weekly.js` - Shows weekly menu
   - Green spinner (#9bb158) during loading
   - Error messages with retry button

4. **Data Flow**
   ```
   Cache Check → API Call (if needed) → Redux Store → Components → Display
   ```

## Usage

The components automatically fetch data on page load. If there's an error, a retry button is shown.

## Deployment

1. Update `src/config.js` with production API URL
2. Build: `npm run build`
3. Deploy the build folder

## Developer Notes

- Cache duration: 1 hour (3600000ms)
- Cache keys: `todayMenu`, `todayMenuTime`, `weeklyMenu`, `weeklyMenuTime`
- Both menus prefetch on first page load for better UX
- CORS handled via proxy in development

**Questions?** Contact: **taahabz@gmail.com**
