import React from 'react';
import '@mantine/core/styles.css'; // wrong order
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogHistoryPage from './Pages/LogHistoryPage/LogHistoryPage';
import AdminPage from './Pages/AdminPage/AdminPage'

// Replace with your Auth0 domain and client ID
const domain = "dev-cslkpjrs07f1l8bo.us.auth0.com"; // e.g., dev-abc123.auth0.com
const clientId = "0WGSquqnJqfTfFwqroY1uArAPIIvEXbH"; // from your Auth0 Application settings
const redirectUri = window.location.origin; // Redirect URL after login (default to current URL)


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{ redirect_uri: redirectUri }}
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Routes>
            <Route path="/" element={<App />} />
            {/* Home component for the root path */}
            <Route path="/workoutlog" element={<LogHistoryPage />} />

            <Route path="/profile" element={<p>Profile here</p>} />
            {/* Profile component for the /profile path */}

            {/* You can define more routes as needed */}
            <Route path="/admin" element={<AdminPage />} />
          </Routes>

        </MantineProvider>
      </Auth0Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
