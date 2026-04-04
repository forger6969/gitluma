import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import PrivateRoute from "./PrivateRoute.jsx";
import PublicRoute from './PublicRoute.jsx';
import GithubCallbackPage from './pages/GithubCallbackPage.jsx';
import DashboardOutlet from './pages/DashboardOutlet.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/github/callback",
        element: <GithubCallbackPage />
      },
      {
        index: true,
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardOutlet />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);