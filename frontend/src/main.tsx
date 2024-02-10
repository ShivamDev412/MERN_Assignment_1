import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider } from "./components/ThemeProvider";
import EmployeeDirectory from "./App.tsx";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ToastContainer } from "react-toastify";
import { __DEV__ } from "@apollo/client/utilities/globals";
const client = new ApolloClient({
  uri: "http://localhost:4004/graphql",
  // uri: "https://myadmin-20gl.onrender.com/graphql",
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: {
    query: {
      errorPolicy: "all",
    },
  },
});


if (__DEV__) {  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <JotaiProvider>
        <ApolloProvider client={client}>
          <EmployeeDirectory />
          <ToastContainer
        position="top-right"
        limit={1}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        </ApolloProvider>
      </JotaiProvider>
    </ThemeProvider>
  </React.StrictMode>
);
