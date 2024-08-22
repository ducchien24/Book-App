import React, { useState,useEffect} from "react";
import { Input, Button,notification } from "antd";
import {CreateUserAPI,getALlUserAPI} from '../../services/api/apiUser'
const FormUser = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");


 const handClickCreate = async () =>{
    const res= await CreateUserAPI(fullName,email,password,phone)
    if(res.data){
        notification.success({
        message:"creat user",
        description:"Tạo user thành công"
    })}
    else{
        notification.error({
            message:"Error creat user",
            description:JSON.stringify(res.message)
        })
    }
 }   
  return (
    <div
      className="user-form"
      style={{
        width: "30%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "10px",
        margin: "10px",
      }}
    >
      <div>
        <div>
          <span>FullName</span>
          <Input value={fullName} onChange={ (e)=> setFullName(e.target.value)}/>
        </div>
        <div>
          <span>Email</span>
          <Input value={email} onChange={ (e)=> setEmail(e.target.value)}/>
        </div>
        <div>
          <span>Password</span>
          <Input value={password} onChange={ (e)=> setPassword(e.target.value)}/>
        </div>
        <div>
          <span>PhoneNumber</span>
          <Input value={phone} onChange={ (e)=> setPhone(e.target.value)}/>
        </div>
      </div>
      <div>
        <Button type="primary" onClick={handClickCreate}>Create User</Button>
      </div>
    </div>
  );
};

export default FormUser;
