import React from "react";
import ReactDOM from "react-dom/client";
import Connect from "./components/Connect.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Mainpage from "./components/Mainpage.tsx";
import Cart from "./components/Cart.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/connect",
    element: <Connect />,
  },
  {
    path: "/mainpage",
    element: <Mainpage />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
