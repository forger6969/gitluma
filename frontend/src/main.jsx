import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
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
import CreateNewproject from './pages/CreateNewproject.jsx';
import ActFeed from './pages/ActFeed.jsx'
import TasksPage from './pages/TasksPage.jsx'
import Settings from './pages/Settings.jsx'


import Info from './pages/Info.jsx'
import Documentation from './pages/Documentation.jsx'
import GettingStartedPage from './pages/docs/GettingStarted.jsx'
import APIReferencePage from './pages/docs/APIReference.jsx'
import CLIToolPage from './pages/docs/CLITool.jsx'
import IntegrationsPage from './pages/docs/Integrations.jsx'
import AuthenticationPage from './pages/docs/Authentication.jsx'
import SDKPage from './pages/docs/SDK.jsx'

const restoreRedirectPath = () => {
  if (typeof window === "undefined") return;

  const currentUrl = new URL(window.location.href);
  const redirect = currentUrl.searchParams.get("redirect");

  if (!redirect || !redirect.startsWith("/")) return;

  currentUrl.searchParams.delete("redirect");
  const nextPath = `${redirect}${currentUrl.searchParams.toString() ? `?${currentUrl.searchParams.toString()}` : ""}${currentUrl.hash}`;
  window.history.replaceState(null, "", nextPath);
};

restoreRedirectPath();

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
        path:"/info",
        element:<Info/>
      },
      {
        path:"/docs",
        element:<Documentation/>
      },
      {
        path:"/docs/getting-started",
        element:<GettingStartedPage/>
      },
      {
        path:"/docs/api-reference",
        element:<APIReferencePage/>
      },
      {
        path:"/docs/cli-tool",
        element:<CLIToolPage/>
      },
      {
        path:"/docs/integrations",
        element:<IntegrationsPage/>
      },
      {
        path:"/docs/authentication",
        element:<AuthenticationPage/>
      },
      {
        path:"/docs/sdk",
        element:<SDKPage/>
      },
      {
        path: "*",
        element: <PageNotFound404 />
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
        path: "/dashboard",
        children: [
          { index: true, element: <Home /> },
          { path: "projects", element: <Projekt /> },
          { path: "tasks", element: <TasksPage /> },
          { path: "profile", element: <Profile /> },
          { path: "settings", element: <Settings /> },
          { path: "project/:id", element: <ProjectMoreInf /> },
          { path: "create", element: <CreateNewproject /> },
        ]
      }
    ],
  },
  {
    path: "/too-many-requests",
    element: <div> <p>aloo</p> </div>
  }
], {
  basename: import.meta.env.BASE_URL,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
