import React,{useState,useEffect} from 'react';
import { Input, Button, notification, Modal } from "antd";
import {UpdateUserAPI} from '../../services/api/apiUser'
const UpdateUserModal = ({isModalOpen,setIsModalOpen,dataUpdate,setDataUpdate,loadData}) => {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [id, setId] = useState("");
 
     
  const handSave = async () => {
    const res = await UpdateUserAPI(id,fullName, phone);
     await loadData()
    if (res?.data) {
      notification.success({
        message: "update user",
        description: "update user thành công",
      });
    } else {
      notification.error({
        message: "Error update user",
        description: JSON.stringify(res.message),
      });
    }
  };
useEffect(() => {
    // console.log(dataUpdate)
if (dataUpdate) {
    setFullName(dataUpdate.fullName)
    setPhone(dataUpdate.phone)
    setId(dataUpdate._id)
}
 
}, [dataUpdate]);
  const resetValue= () =>{ 
    setFullName('');
    setPhone('');
  }
  console.log(fullName)
    return (
        <Modal
        title="Update a User "
        maskCloseable="false"
        okText={"Save"}
        open={isModalOpen}
        onOk={() => {
          handSave()
          setIsModalOpen(false);
        //   handSubmit()
        }}
        onCancel={() => {
          setIsModalOpen(false);
        //   setDataUpdate(null)
        }}
      >
         <div
  className="user-form"
  style={{
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: "10px",
    margin: "10px",
  }}
>
  <div>
  <div>
      <span>id</span>
      <Input
        value={id}
        disabled
      />
    </div>
    <div>
      <span>FullName</span>
      <Input
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
    </div>
    <div>
      <span>PhoneNumber</span>
      <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
    </div>
  </div>
  </div>
      </Modal>
    )
};

export default UpdateUserModal;
