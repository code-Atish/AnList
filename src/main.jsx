import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.jsx";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import { useNavigate } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Details from "./pages/Details.jsx";
// import Home from "./Home.jsx";
// import TagsBar from "./TagsBar.jsx";
// import DisplayTrending from "./ui/Trending.jsx";
// import DisplaySearch from "./searchAnime.jsx";
// import Landing from "./Landing.jsx";
import TrendingPage from "./pages/TrendingPage.jsx";
import { ErrorPage } from "./components/Error.jsx";


const customMergeFunction = (existing, incoming) => {
  // Merge logic here
  // You may want to merge based on IDs or some other criteria
  // Ensure that you don't overwrite existing data unintentionally

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
    children: [
      // {
      //   path: "search",
      //   element: <TagsBar />,
      // },
      // {
      //   path: "/Home",
      //   element: <Home/>,
      //   index:true,
      // },
      //
    ],
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
  {
      path:'/trending/:page',
      // element:<DisplaySearch
      //           sortCriteria={'TRENDING_DESC'}
      //           filterOptions={Array(7).fill(undefined)}
      //           />
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
