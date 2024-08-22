import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { CreateUserAPI, getALlUserAPI } from "../../services/api/apiUser";

const TableUser = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  const [dataUsers, setDataUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getALlUserAPI();
      console.log(res);
      setDataUsers(res.data);
    };
    fetchData();
    console.log(dataUsers);
  }, []);
  console.log(dataUsers);
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default TableUser;
