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
import ActFeed from './pages/ActFeed.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"/github/callback",
        element:<GithubCallbackPage/>
      },
      {
        path:"/",
        element:<Login/>
      },
      {
        path:"/actfeed",
        element:<ActFeed/>
      },
      {}
    ],

    
  },
  {
    path:"/dashboard",
    element:<DashboardOutlet/>,
    children:[
      {
        index:true,
        element:<Home/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  </StrictMode>,
)
