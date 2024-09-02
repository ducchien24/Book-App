import React,{useState,useContext} from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Grid,
  Col,
  Row,
  Card,
  notification,
  message,
} from "antd";
import { LoginAPI } from "../services/api/apiUser";
import { useNavigate, Link } from "react-router-dom";
import {AuthContext} from '../component/context/AuthContext'

const Login = () => {
  const {setUser}=useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    setLoading(true)
    const res = await LoginAPI(values.email, values.password);
    // console.log(res);
    if (res.data) {
      localStorage.setItem("access_token",res.data.access_token)
      setUser(res.data.user)
      message.success("Đăng nhập thành công");
      setLoading(true)
      navigate("/");
    } else
      notification.error({
        message: "error ",
        description: JSON.stringify(res.message),
      });
      setLoading(false)
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  const validateEmail = (rule, value, callback) => {
    const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;
    if (!emailRegex.test(value)) {
      callback("Invalid email address");
    } else {
      callback();
    }
  };

  return (
    <Row justify={"center"} layout="horizontal">
      <Col xs={24} md={16} lg={8}>
        <Card
          title={
            <span style={{ color: "#1890ff", fontSize: "20px" }}>Login</span>
          }
          bordered={false}
          style={{ textAlign: "center",backgroundColor:'#CCCCCC'}}
        >
          <Form
            form={form}
            name="basic"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
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
              <Input.Password  onKeyDown={(event)=>{ 
                if(event.key==='Enter') form.submit()}}/>
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
                offset: 6,
                span: 12,
              }}
            >
              <Button
                type="primary"
                loading={loading}
                onClick={() => form.submit()}
               
              >
                Login
              </Button>
            </Form.Item>
            <Form.Item
              layout="inline"
              // wrapperCol={{
              //   offset: 6,
              //   span: 12,
              // }}
            >
              <span>Bạn chưa có tài khoản?</span>{" "}
              <Link to={"/register"}>
                <i>Đăng ký tại đây</i>
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
export default Login;
