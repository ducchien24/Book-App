import "./App.css";
import React,{useEffect,useContext} from 'react'
import {Header,Footer} from './component/layout/index'
import {Outlet} from 'react-router-dom'
import {getAccountApi} from './services/api/apiUser'
import {AuthContext} from './component/context/AuthContext'
function App() {
  const{setUser,location}=useContext(AuthContext) 
  console.log(location)
  // const{location}=useContext(AuthContext)
 const fetchUserInfo = async()=>{
  const res= await getAccountApi()
  if(res.data)
    // console.log('check user data:' ,res.data)
    setUser(res.data.user)
 }

  useEffect(() => {
  fetchUserInfo()
 }, []);
  return (
    <>
      <Header />
      <Outlet/>
      <Footer/>
    </> 
  );
}

export default App;
