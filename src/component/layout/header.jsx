import React, { useState, useContext } from "react";
// import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { Menu, message } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  AccountBookOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../context/AuthContext";
import { logOutApi } from "../../services/api/apiUser";
const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const handLogOut = async () => {
    const res = await logOutApi();
    if (res.data) {
      localStorage.removeItem("access_token");
      setUser({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      });
      navigate("/");
      message.success("logout succesful! ");
    }
  };
  const LeftItems = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/user"}>User</Link>,
      key: "users",
      icon: <UserOutlined />,
    },
    {
      label: <Link to={"/books"}>Book</Link>,
      key: "books",
      icon: <AccountBookOutlined />,
    },
  ];
  const RightItems = [
    ...(user.id
      ? [
          {
            label: (
              <span>
                {" "}
                Wellcome <i>{user.fullName}</i>
              </span>
            ),
            key: "user",
            children: [
              {
                type: "group",
                children: [
                  {
                    label: (
                      <span
                        onClick={() => {
                          handLogOut();
                        }}
                      >
                        Logout
                      </span>
                    ),
                    key: "logout",
                  },
                ],
              },
            ],
          },
        ]
      : [
          {
            label: <Link to={"/login"}>login</Link>,
            key: "login",
            icon: <SettingOutlined />,
          },
        ]),
  ];

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className="header">
      {/* <ul>
        <li>
          <NavLink to="/" className="nav_link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/user" className="nav_link">
            User
          </NavLink>
        </li>
        <li>
          <NavLink to="/books" className="nav_link">
            Books
          </NavLink>
        </li>
      </ul> */}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={LeftItems}
        />
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="vertical"
          items={RightItems}
        />
      </div>
    </div>
  );
};

export default Header;
