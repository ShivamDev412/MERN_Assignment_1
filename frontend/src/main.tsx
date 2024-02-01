import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider } from "./components/ThemeProvider";
import EmployeeDirectory from "./App.tsx";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { __DEV__ } from "@apollo/client/utilities/globals";
const client = new ApolloClient({
  uri: "http://localhost:4004/graphql",
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
        </ApolloProvider>
      </JotaiProvider>
    </ThemeProvider>
  </React.StrictMode>
);
