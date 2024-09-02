import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext({
  email: "",
  phone: "",
  fullName: "",
  role: "",
  avatar: "",
  id: "",
});
export const useCustomLocation = () => {
    const [current, setCurrent] = useState('home');
  const location = useLocation();
  if (location && location.pathname) {
    console.log(location);
    const allRouter = ["users", "books",'login'];
    const current = allRouter.find((item) => `/${item}` === location.pathname);
    current?setCurrent(current):setCurrent('home')
  }
  return location;
};

export const AuthWrapper = (props) => {
  const [user, setUser] = useState({
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: "",
  });
  return (
    <AuthContext.Provider value={{ user, setUser, location, }}>
      {props.children}
    </AuthContext.Provider>
  );
};
