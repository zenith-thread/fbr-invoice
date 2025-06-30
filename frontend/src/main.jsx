import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// router
import { BrowserRouter } from "react-router";

// react-toastify
import { ToastContainer } from "react-toastify";

// Redux
import { store } from "./store/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
