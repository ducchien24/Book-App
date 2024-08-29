import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter ,RouterProvider } from 'react-router-dom'
import {LoginPage,RegisterPage,UsersPage,BooksPage,ErrorPage} from './pages/index'
import TodoApp  from './component/todo/TodoApp'
import {AuthWrapper} from './component/context/AuthContext'

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
        element: < UsersPage/>,
      },
      {
        path: "/books",
        element: < BooksPage/>,
      },

    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage/>,
  },
 
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthWrapper>
     <RouterProvider router={router} />
  </AuthWrapper>
    
  // </React.StrictMode>,
)
