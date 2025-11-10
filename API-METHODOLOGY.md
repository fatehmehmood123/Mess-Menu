# API Methodology

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
   - `fetchTodayMenu()` - Fetches today's menu
   - `fetchWeeklyMenu()` - Fetches weekly menu
   - Handles loading and error states

2. **Components**
   - `Today.js` - Shows today's menu
   - `Weekly.js` - Shows weekly menu
   - Both show loading spinners and error messages

3. **Data Flow**
   ```
   API → Redux Thunk → Redux Store → Components → Display
   ```

## Usage

The components automatically fetch data on page load. If there's an error, a retry button is shown.

## Deployment

1. Update `src/config.js` with production API URL
2. Build: `npm run build`
3. Deploy the build folder

That's it!
