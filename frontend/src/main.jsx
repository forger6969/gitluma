import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import GithubCallbackPage from './pages/GithubCallbackPage.jsx';
import DashboardOutlet from './pages/DashboardOutlet.jsx';
import PublicRoute from './Guards/PublicRoute.jsx';
import PrivateRoute from './Guards/PrivateRoute.jsx';
import Projekt from './pages/Projekt.jsx';
import Landing from './pages/Landing.jsx';
import CreateNewproject from './pages/CreateNewproject.jsx';
import WorkSpace from './pages/WorkSpace.jsx'
import Profile from './pages/Profile.jsx'
import OnBoardWizard from './pages/OnBoardWizard.jsx';
import PageNotFound404 from './pages/404pagenotfound.jsx';
import './locales/i18n.js'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound404 />,
    children: [
      {
        path: "github/callback",
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
      {
        path: "landing",
        element: <Landing />
      },
      {
        path: "onboarding",
        element: <OnBoardWizard />
      },
      {
        path: "/workSpace",
        element: <WorkSpace/>
      },
      {
        path: "/profile",
        element: <Profile/>
      },
      {
        path: "*",
        element: <PageNotFound404 />
      }
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardOutlet />
      </PrivateRoute>
    ),
    errorElement: <PageNotFound404 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "projects",
        element: <Projekt />,
      },
       {
      path: "create",
      element: <CreateNewproject />, 
    }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);