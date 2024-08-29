import React, { useState, useEffect } from "react";
import { Drawer,notification } from "antd";
import { handUploadFile ,UpdateUserAPI} from "../../services/api/apiUser";

const DetailUser = ({ dataUser, setIsOpenDrawe, isOpenDrawe ,loadData}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onClose = () => {
    setIsOpenDrawe(false);
  };

  const handleClickImg = (e) => {
    if (!e.target.value || e.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
    }
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      console.log("hehe");
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
    console.log(selectedFile);
    console.log(preview);
  };
  console.log(selectedFile);
  console.log(preview);

  const handUpdateUserAvatar = async() =>{
    const resUpload= await handUploadFile(selectedFile,'avatar')
    console.log("resUpload",resUpload)
    if(resUpload){
       await UpdateUserAPI(dataUser._id,dataUser.fullName,dataUser.phone,resUpload.data.fileUploaded)
        setSelectedFile(null)
        setPreview(null)
        loadData()
        onClose()
        notification.success({
          message:'upload image success',
          description:'upload file Image thành công'
        })

    }else{
      notification.error({
        message:'error upload image',
        description:'file không hợp lệ hoặc file quá lớn!'
      })
    }
    console.log(resUpload)
  }
  return (
    <Drawer
      title={`Detail user ${dataUser._id}`}
      onClose={onClose}
      open={isOpenDrawe}
    >
      <div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              // justifyContent: "start",
              // alignItems: "start",
            }}
          >
            <img
              style={{ width: "65px", height: "65px" }}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                dataUser.avatar
              }`}
              alt="avt user"
            />

            <div
              style={{
                display: "block",
                width: "fit-content",
                padding: "5px 10px",
                margin: "15px 0px",
                background: "orange",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <label htmlFor="uploadImg">Upload File</label>
              <input
                type="file"
                hidden
                id="uploadImg"
                onChange={handleClickImg}
              />
              {/* <input type="file" hidden id="uploadImg" onChange={(e)=>handleClickImg(e)}/> */}
            </div>
          </div>
          {preview && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
              }}
            >
              <img
                style={{ width: "65px", height: "65px" }}
                src={preview}
                alt="avt user preview"
              />
              <div
                style={{ 
                  margin: "15px 0px",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "fit-content",
                }}
              >
                <button onClick={()=>{handUpdateUserAvatar()}}>Save</button>
              </div>
            </div>
          )}
        </div>
        <p>
          <b>FullName :</b> {dataUser.fullName}
        </p>
        <p>
          <b>Email :</b> {dataUser.email}
        </p>
        <p>
          <b>PhoneNumber :</b> {dataUser.phone}
        </p>
        <p>
          <b>Role :</b> {dataUser.role}
        </p>
      </div>
    </Drawer>
  );
};

export default DetailUser;
