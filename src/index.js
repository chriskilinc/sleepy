import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { TimeProvider } from "./TimeContext";
import { ErrorPage } from "./error-page";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
});

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/wake-up/:time",
//     element: <App />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/go-to-bed/:time",
//     element: <App />,
//     errorElement: <ErrorPage />,
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TimeProvider>
        <App />
        {/* <RouterProvider router={router} /> */}
      </TimeProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function (registration) {})
    .catch(function (error) {
      console.log("ServiceWorker registration failed:", error);
    });
}
