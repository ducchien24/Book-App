import React from "react";
import { Form } from "antd";
import {
  Button,
  Checkbox,
  Input,
  notification,
  Grid,
  Card,
  Col,
  Row,
} from "antd";
import { useNavigate } from "react-router-dom";
import { RegisterAPI } from "../services/api/apiUser";
const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("Success:", values);
    const res = await RegisterAPI(
      values.fullName,
      values.email,
      values.password,
      values.phone
    );
    if (res.data) {
      notification.success({
        message: "success ",
        description: "register successful",
      });
      navigate("/login");
    } else
      notification.error({
        message: "error ",
        description: JSON.stringify(res.message),
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const validateEmail = (rule, value, callback) => {
    const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;
    if (!emailRegex.test(value)) {
      callback("Invalid email address");
    } else {
      callback();
    }
  };
  const validatePhoneNumber = (rule, value, callback) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(value)) {
      callback("Invalid phone number");
    } else {
      callback();
    }
  };
  return (
    <Row justify={"center"} layout="horizontal">
      <Col xs={24} md={16} lg={8}>
        <Card
          title={
            <span style={{ color: "#1890ff", fontSize: "20px" }}>Register</span>
          }
          bordered={false}
          style={{ textAlign: "center", backgroundColor: "#CCCCCC" }}
        >
          <Form
            form={form}
            layout="vertical"
            name="register"

            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="FullName :"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email :"
              name="email"
              rules={[
                {
                  required: true,

                  message: "Please input your username!",
                },
                {
                  validator: validateEmail,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password :"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="PhoneNumber :"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
                {
                  validator: validatePhoneNumber,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 3,
                span: 18,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
             wrapperCol={{
              offset: 3,
              span: 18,
            }}
            >
              <Button
                type="primary"
                onChange={() => form.submit}
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
