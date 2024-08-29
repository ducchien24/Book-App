import React from "react";
import { Button, Modal, Form, Checkbox, Input ,Row,Col} from "antd";

const BookModal = ({ isModalOpen, setIsModalOpen }) => {
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
          name="bookadd"
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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
            <Input />
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
            <Input />
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
            <Input />
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
            <Input />
          </Form.Item>
        </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default BookModal;
