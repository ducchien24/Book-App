import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter ,RouterProvider } from 'react-router-dom'
import {Login,Register,Users,Books,ErrorPage} from './pages/index'
import TodoApp  from './component/todo/TodoApp'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true ,
        element: <TodoApp/>
      },
      {
        path: "/user",
        element: < Users/>,
      },
      {
        path: "/books",
        element: < Books/>,
      },

    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register/>,
  },
 
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
     <RouterProvider router={router} />
  // </React.StrictMode>,
)
