import { useState, useEffect } from "react";
import { Table, Popconfirm, message, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateUserModal from "./updateUserModal";
import DetailUser from "./detailUser";
import { DeleteUser } from "../../services/api/apiUser";

const TableUser = ({ dataUsers, loadData ,current,pageSize,total,setCurrent,setPageSize}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [isOpenDrawe, setIsOpenDrawe] = useState(false);
  const [dataUser, setDataUser] = useState("");
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, record, index) => <> {(index + 1)+(current-1)*pageSize}</>,
    },
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
      render: (_, record) => (
        <>
          <a
            href="#"
            onClick={() => {
              setDataUser(record);
              setIsOpenDrawe(true);
            }}
          >
            {" "}
            {record._id}
          </a>
        </>
      ),
    },
    {
      title: "FullName",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined
            style={{ cursor: "pointer", color: "orange" }}
            onClick={() => {
              setIsModalOpen(true);
              setDataUpdate(record);
            }}
          />
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            onConfirm={() => {
              handleDeleteUser(record._id);
              console.log(record._id);
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const handleDeleteUser = async (_id) => {
    const res = await DeleteUser(_id);

    if (res?.data) {
      notification.success({
        message: "Delete user",
        description: "Delete user thành công",
      });
      await loadData();
    } else {
      notification.error({
        message: "Error delete user",
        description: JSON.stringify(res.message),
      });
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log({pagination, filters, sorter, extra})
    if(pagination&&pagination.current)
    {
      if(+pagination.current!==+current){
        setCurrent(+pagination.current);
      }
    }
    if(pagination&&pagination.pageSize)
      {
        if(+pagination.pageSize!==+pageSize){
          setCurrent(1)
          setPageSize(+pagination.pageSize)
      }
   }}
  return (
    <div>
      <Table 
        dataSource={dataUsers} 
        columns={columns} 
        pagination={
          {
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) },
         
          } 
        }
        onChange={onChange}
        />;
      <UpdateUserModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadData={loadData}
      />
      <DetailUser
        isOpenDrawe={isOpenDrawe}
        setIsOpenDrawe={setIsOpenDrawe}
        dataUser={dataUser}
        loadData={loadData}
      />
    </div>
  );
};

export default TableUser;
