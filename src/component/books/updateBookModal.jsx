import React, { useState ,useEffect} from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Select,
  message,
} from "antd";
import { uploadImageBook, createBook,updateBook } from "../../services/api/apiBooks";

const UpdateBookModal = ({isOpenModalUpdate,setIsOpenModalUpdate,dataBook,loadData}) =>
  {
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [form] = Form.useForm();
  const handleOk = () => {
    form.submit();
    // setIsOpenModalUpdate(false);
  };
  const handleCancel = () => {
    setIsOpenModalUpdate(false);
     form.resetFields(); 
  };
  const onFinish = async (values) => {
    console.log(values);
     console.log("1")
     const resUpdate= await updateBook(values.id,selectedFile,values.mainText,values.author,values.price,values.quantity,values.category)
     if(resUpdate.data){
      message.success('Cập nhật thành công!')
      form.resetFields(); 
      setSelectedFile(null)
      setIsOpenModalUpdate(false);
      loadData()
     }else {
      message.error(resUpdate.message);
    }
  }

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const handleClickImg = async (event)=>{
       console.log(event)
         if(!event.target.files||event.target.files.length===0)
          {
            setSelectedFile(null)
         }
         const file = event.target.files[0]
         const resUpload = await uploadImageBook(file,'book')
         if(resUpload.data) 
          {setSelectedFile(resUpload.data.fileUploaded)
          
          }
          event.target.value=null
    }
console.log("selectedFile",selectedFile)
    const options = [
      {
        value: "Arts",
        label: "Arts",
      },
      {
        value: "History",
        label: "History",
      },
      {
        value: "Music",
        label: "Music",
      },
      {
        value: "Sports",
        label: "Sports",
      },
      {
        value: "Comics",
        label: "Comics",
      },
      {
        value: "Business",
        label: "Business",
      },
      {
        value: "Teen",
        label: "Teen",
      },
      {
        value: "Cooking",
        label: "Cooking",
      },
      {
        value: "Entertainment",
        label: "Entertainment",
      },
      {
        value: "Travel",
        label: "Travel",
      },
    ];
    useEffect(() => {
      if (isOpenModalUpdate) {
        form.setFieldsValue({
          id: dataBook._id,
          mainText: dataBook.mainText,
          author: dataBook.author,
          price: dataBook.price,
          quantity: dataBook.quantity,
          category: dataBook.category,
          thumbnail: dataBook.thumbnail,
        });
        setSelectedFile(dataBook.thumbnail);
      } else {
        form.resetFields();
        setSelectedFile(null);
      }
    }, [isOpenModalUpdate, dataBook, form]);
  return (
    <>
    <Modal
      title="Update Book"
      open={isOpenModalUpdate}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Row justify={"center"} layout="horizontal">
        <Col xs={8} md={16} lg={20}>
          <Form
            form={form}
            style={{ marginTop: "20px" }}
            labelAlign="left"
            name="bookadd"
          
            initialValues={{
              id: dataBook._id,
              mainText: dataBook.mainText,
              author: dataBook.author,
              price: dataBook.price,
              quantity: dataBook.quantity,
              category: dataBook.category,
            }}
           
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            labelCol={{ span: 8 }} // Điều chỉnh độ rộng của nhãn (label)
            wrapperCol={{ span: 16 }} // Điều chỉnh độ rộng của vùng chứa input
          >
            <Form.Item
              label="ID Book"
              name="id"
            >
              <Input placeholder={dataBook._id} disabled  />
            </Form.Item>
            <Form.Item
              label="MainText"
              name="mainText"
              rules={[
                {
                  required: true,
                  message: "Please input your mainText!",
                },
              ]}
            >
              <Input 
             
               />
            </Form.Item>
            <Form.Item
              label="Author"
              name="author"
              rules={[
                {
                  required: true,
                  message: "Please input your author!",
                },
              ]}
            >
              <Input  
             
               />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
            >
              <InputNumber
               
                suffix="VNĐ"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Please input your quantity!",
                },
              ]}
            >
              <InputNumber
              
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please input your category!",
                },
              ]}
            >
              <Select
               
                // mode="tags"
                style={{
                  width: "100%",
                }}
              
                // onChange={handleChange}
                options={options}
              />
            </Form.Item>
            <Form.Item
              label="Thumbnail"
              name="thumbnail"
              rules={[
                {
                  required: true,
                  message: "Please input your thumbnail!",
                },
              ]}
            >
              <div >
                <input
                  type="file"
                  hidden
                  id="uploadImg"
                  onChange={handleClickImg}
                  // onClick={(event) => (event.target.value = null)}
                />
                <img src={selectedFile?`${import.meta.env.VITE_BACKEND_URL}/images/book/${selectedFile}`:`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBook.thumbnail}`} style={{width:"85px",height:"100px" ,marginTop:'20px'}} alt="thumbnail" />
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  </>
  );
}

export default UpdateBookModal;
