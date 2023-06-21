import React from "react";
import ReactDOM from "react-dom/client";

import { GlobalProvider } from "./context/GlobalState";
import { SpeechProvider } from "@speechly/react-client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SpeechProvider appId={process.env.REACT_APP_API_KEY} language="en-US">
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </SpeechProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
