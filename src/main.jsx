import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.jsx";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Details from "./pages/Details.jsx";
import TrendingPage from "./pages/TrendingPage.jsx";
import { ErrorPage } from "./components/Error.jsx";


const customMergeFunction = (existing, incoming) => {
  return {
    ...existing,
    ...incoming,
  };
};

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          Page: {
            merge: customMergeFunction,
          },
        },
      },
    },
  }),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
  {
      path:'/trending/:page',
      element:<TrendingPage />
  },
  {
    path:'*',
    element:<ErrorPage />

  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
