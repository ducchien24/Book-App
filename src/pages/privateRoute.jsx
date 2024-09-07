import React from "react";
import { useContext } from "react";
import { AuthContext } from "../component/context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const { user } = useContext(AuthContext);
  if (user && user.id) {
    return(<>{props.children}</>)  }

  return <Navigate to="/login" replace></Navigate>;
};

export default PrivateRoute;
