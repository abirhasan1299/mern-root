import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import React from 'react'

import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/bootstrap/dist/js/bootstrap.min.js";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createRoot } from 'react-dom/client'
import Additem from './pages/Additem.jsx'
import Listitem from './pages/Listitem.jsx'
import Navbar from './pages/Navbar.jsx'
import './index.css'
const url = "http://localhost:4000";

let Routes = createBrowserRouter(
  [
    {
      path:'/',
      element: <Navbar />
    },
    {
      path:'add-item',
      element: <Additem url={url} />
    },
    {
      path:'list-item',
      element: <Listitem url={url} />
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ToastContainer />
      <RouterProvider router={Routes} />
   
  </React.StrictMode>,
)
