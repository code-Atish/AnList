import React from 'react'
import ReactDOM from 'react-dom/client'
import  App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Details from './Details.jsx';


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
  uri: 'https://graphql.anilist.co',
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
    element: <App/>,
    children: [
      {
        path: "search",
        element: <div>search</div>,
      },
      {
        path: "/Home",
        element: <div>Home route</div>,
        index:true,
      },
    ],
  },
  {
    path: "/details/:id",
    element: <Details/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
  
)
