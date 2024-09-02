import React, { useState ,useEffect} from "react";
import {
  Button,
  Modal,
  Form,
  Checkbox,
  Input,
  InputNumber,
  Row,
  Col,
  Select,
  message,
} from "antd";
import { uploadImageBook, createBook } from "../../services/api/apiBooks";

const BookModal = ({ isModalOpen, setIsModalOpen, loadData }) => {
  const [form] = Form.useForm();
  const [imgPreview, setImgPreview] = useState(null);
  const [fileSelected, setFileSelected] = useState(null);
  const [newThumbnail, setNewThumbnail] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.submit();
    // setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);

  };
  const onFinish = async (values) => {
    // console.log(
    //   newThumbnail,
    //   values.mainText,
    //   values.author,
    //   values.price,
    //   values.quantity,
    //   ...values.category
    // );

    try {
      // console.log("Success:", values);
      const resCreate = await createBook(
        newThumbnail,
        values.mainText,
        values.author,
        values.price,
        values.quantity,
        values.category
      );
      // console.log(resCreate);
      if (resCreate?.data) {
        message.success("Thêm thành công!");
        loadData();
        form.resetFields()
        setImgPreview(null)
        setIsModalOpen(false);
      } else {
        message.error(resCreate.message);
      }
    } catch (error) {
      message.error("Error in onFinish:", error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    message.log("Failed:", errorInfo);
  };
 
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
  };

 
  const handleClickImg = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setImgPreview(null);
      setFileSelected(null);
    } 
    const file= event.target.files[0]
    if(file) {
      setFileSelected(file);
      const urlPreview = URL.createObjectURL(file);
      setImgPreview(urlPreview);
      const resUpload = await uploadImageBook(file, "book");
      // console.log(resUpload)
      if (resUpload) setNewThumbnail(resUpload.data.fileUploaded);
    }
  };
  // console.log(fileSelected);
  // console.log(imgPreview);
  // console.log(newThumbnail);

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

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Book
      </Button>
      <Modal
        title="Create Book"
        open={isModalOpen}
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
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              labelCol={{ span: 8 }} // Điều chỉnh độ rộng của nhãn (label)
              wrapperCol={{ span: 16 }} // Điều chỉnh độ rộng của vùng chứa input
            >
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
                <Input />
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
                <Input />
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
                  placeholder="Tags Mode"
                  onChange={handleChange}
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
                <div>
                  <input
                    type="file"
                    hidden
                    id="uploadImg"
                    onChange={handleClickImg}
                    onClick={(event) => (event.target.value = null)}
                  />
                  {imgPreview && (
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "10px 0px",
                      }}
                      src={imgPreview}
                      alt="imgPreview"
                    />
                  )}
                </div>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default BookModal;
