# Mess Menu Website

Welcome to the Mess Menu website! This dynamic website allows users to check the daily and weekly menu of a Mess. The Mess's menu changes on a weekly basis, ensuring users have the most up-to-date information at their fingertips. The website provides an intuitive interface that allows users to effortlessly navigate and stay informed about the Mess's menu for each day of the week.

## Features

- View daily and weekly menus.
- Responsive design for seamless access on different devices.
- Efficient data handling and date manipulation using React hooks (useEffect and useMemo).
- State management powered by React Redux and @reduxjs/toolkit.
- Smooth page transitions and client-side routing with React Router DOM.
- Comprehensive test suites using @testing-library/react, @testing-library/jest-dom, and @testing-library/user-event for robustness and reliability.
- Web-vitals integration for monitoring and optimizing website performance.

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm (v6 or above)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/fatehmehmood123/Mess-Menu
cd Mess-Menu
```

2. Install the dependencies:

```bash
npm install
```

3. Configure API URL:

Edit `src/config.js` and update the API URL:
```javascript
API_BASE_URL: "http://localhost:3000"  // For local development
// API_BASE_URL: "https://your-api.vercel.app"  // For production
```

### Usage

Start the development server:

```bash
npm start
```

The website will be accessible at `http://localhost:3000`.

**Note:** Make sure your backend API server is running for the app to fetch menu data. The app uses the following public APIs:
- `GET /api/menu/today` - Fetches today's menu
- `GET /api/menu/week` - Fetches the current week's menu

### Testing

Run the test suites:

```bash
npm test
```


### Build

Build the production-ready version:

```bash
npm run build
```

The optimized build will be available in the `build` directory.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

Thank you for using the Mess Menu website! Your feedback and support are greatly appreciated. Enjoy your dining experience with up-to-date menu information!
