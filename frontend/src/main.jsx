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

import WorkSpace from './pages/WorkSpace.jsx'
import Profile from './pages/Profile.jsx'
import OnBoardWizard from './pages/OnBoardWizard.jsx';
import PageNotFound404 from './pages/404pagenotfound.jsx';
import './locales/i18n.js'
import CreateNewproject from './pages/CreateNewproject.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
<<<<<<< HEAD
    errorElement: <div>404 Not Found</div>,
=======
    errorElement: <PageNotFound404 />,
>>>>>>> 9051ff5569bac29ec69975fc672225b490130f56
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
        element: <WorkSpace />
      },
      {
        path: "/profile",
<<<<<<< HEAD
        element: <Profile />
=======
        element: <Profile/>
      },
      {
        path: "*",
        element: <PageNotFound404 />
>>>>>>> 9051ff5569bac29ec69975fc672225b490130f56
      }
     
    ],
  },
  {
    path: "/dashboard",
<<<<<<< HEAD
    errorElement: <h1>404 Not Found </h1>,
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
    {
      path: "projects",
      element: <Projekt />,
    },
    {
=======
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
      }
   ,   
      {
>>>>>>> 9051ff5569bac29ec69975fc672225b490130f56
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