import React ,{useState} from "react";
import { Drawer, Button ,message} from "antd";
import {uploadImageBook,updateBook} from '../../services/api/apiBooks'
const DetailBook = ({ isOpenDrawer, setIsOpenDrawer, dataBook, loadData }) => {

  const [urlPreview, setUrlPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleClickImg = (e) => {
    if(!e.target.files||e.target.files.length===0){
        setUrlPreview(null)
        setSelectedFile(null)
    }
    const file = e.target.files[0];
    console.log(file)
    if (file) {
        setSelectedFile(file);
        setUrlPreview(URL.createObjectURL(file));
      }
  };
   
  const handClickSaveImg= async() =>{
    
        const resUpload = await uploadImageBook(selectedFile,'book')
        // console.log(resUpload.data)
        if(resUpload)
          {
          const resUpdate= await updateBook(dataBook._id,resUpload.data.fileUploaded,dataBook.mainText,dataBook.author,dataBook.price,dataBook.quantity,dataBook.category)
          //  console.log(resUpdate)
          
            loadData( )
            message.success("upload file successed!")
            setSelectedFile(null)
            setUrlPreview(null)
            setIsOpenDrawer(false) 
        } 
      }
      const onClose = () => {
        setIsOpenDrawer(false);
        setUrlPreview(null)
      };
      // console.log(urlPreview)
  return (
    <Drawer
      title={`Info ${dataBook._id} `}
      onClose={onClose}
      open={isOpenDrawer}
    >
      <>
        <div>
          <p>
            <b>MainText : </b> {dataBook.mainText}
          </p>
          <p>
            <b>Author : </b> {dataBook.author}
          </p>
          <p>
            <b>Category : </b> {dataBook.category}
          </p>
          <p>
            <b>Price : </b> {dataBook.price}
          </p>
          <p>
            <b>Quantity : </b> {dataBook.quantity}
          </p>
          <p>
            <b>Sold : </b> {dataBook.sold}
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingRight: "10px",
            }}
          >
            <b>Thumbnail </b>
            <img
              style={{ width: "65px", height: "65px", margin: "15px 0px" }}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                dataBook.thumbnail
              }`}
              alt="thumbnail"
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
                onChange={(handleClickImg)}
                onClick={(event)=>event.target.value=null}
              />
            </div>
          </div>
          
          {/* <div style={{ display: "flex", flexDirection: "column" }}>
            <b>Preview</b>
          </div> */}
         {urlPreview &&  <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingRight: "10px",
            }}
          >
            <b>Preview </b>
            <img
              style={{ width: "65px", height: "65px", margin: "15px 0px" }}
              src={urlPreview}
              alt="thumbnail"
            />
             <Button type='primary' onClick={handClickSaveImg}>Save</Button>
          </div>}
        </div>
      </>
    </Drawer>
  );
};

export default DetailBook;
