import React, { useState, useEffect } from "react";
import { Input, Button, notification, Modal } from "antd";
import { CreateUserAPI } from "../../services/api/apiUser";

const FormUser = ({ loadData }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handSubmit = async () => {
    const res = await CreateUserAPI(fullName, email, password, phone);
    await loadData();
    resetValue();
    if (res.data) {
      notification.success({
        message: "creat user",
        description: "Tạo user thành công",
      });
    } else {
      notification.error({
        message: "Error creat user",
        description: JSON.stringify(res.message),
      });
    }
  };
  const resetValue = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "20px",
      }}
    >
      <div>Table User</div>
      <div>
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Create User
        </Button>
        <Modal
          title="Basic Modal"
          maskCloseable="false"
          okText={"Create User"}
          open={isModalOpen}
          onOk={() => {
            setIsModalOpen(false);
            handSubmit();
          }}
          onCancel={() => {
            setIsModalOpen(false);
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
                <span>FullName</span>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <span>Email</span>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <span>Password</span>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <span>PhoneNumber</span>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default FormUser;
