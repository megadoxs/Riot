import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './routes/Root.js';
import ErrorPage from './routes/Error-Page.js';

const router = createBrowserRouter([
  {
    path: "/"
    ,element: <Root/>
    ,errorElement: <ErrorPage/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

reportWebVitals();
