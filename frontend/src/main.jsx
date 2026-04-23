import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store  from './store/store.js'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import GithubCallbackPage from './pages/GithubCallbackPage.jsx'
import Login from './pages/Login.jsx'
import DashboardOutlet from './pages/DashboardOutlet.jsx'
import Home from './pages/Home.jsx'
import PublicRoute from './Guards/PublicRoute.jsx';
import PrivateRoute from './Guards/PrivateRoute.jsx';
import Projekt from './pages/Projekt.jsx';
import Landing from './pages/Landing.jsx';

import WorkSpace from './pages/WorkSpace.jsx'
import Profile from './pages/Profile.jsx'
import OnBoardWizard from './pages/OnBoardWizard.jsx';
import PageNotFound404 from './pages/404pagenotfound.jsx';
import './locales/i18n.js'
import { ThemeProvider } from './context/ThemeContext.jsx'
import ProjectMoreInf from './pages/ProjectMoreInf.jsx'
import ActFeed from './pages/ActFeed.jsx'


import Info from './pages/Info.jsx'
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
        path:"/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        index: true,
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
        element: <Profile/>
      },
      {
        path: "*",
        element: <PageNotFound404 />
      },
     
      {
        path:"/info",
        element:<Info/>
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
    children: [
      {
        path: "/dashboard",
        children: [
          { index: true, element: <Home /> },
          { path: "projects", element: <Projekt /> },
          { path: "profile", element: <Profile /> },
          {path:"project/:id", element:<ProjectMoreInf/>},
        ]
      }
    ],
  },
  {
    path: "/too-many-requests",
    element: (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8FC]">
        <div className="text-center p-8">
          <p className="text-6xl font-black text-[#E8654A] mb-2">429</p>
          <p className="text-xl font-semibold text-[#1A1F2E] mb-1">Too Many Requests</p>
          <p className="text-sm text-[#7A8499] mb-6">Please wait a moment and try again.</p>
          <a href="/dashboard" className="px-5 py-2.5 bg-[#E8654A] text-white rounded-lg text-sm font-semibold hover:bg-[#D4512F] transition-colors">
            Back to Dashboard
          </a>
        </div>
      </div>
    )
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);