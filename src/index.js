import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Home } from './components/Home';
import About from './components/About';
import AllLists from './components/AllLists'
import ErrorPage from './components/ErrorPage';
import BookPage from './components/BookPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { ResultsPage } from './components/ResultsPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/my-lists",
        element: <AllLists />
      },
      {
        path: "/book",
        element: <BookPage />
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/results",
        element: <ResultsPage />
      }
    ]
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
