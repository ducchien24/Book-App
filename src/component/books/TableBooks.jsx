import React, { useState } from "react";
import { Table, Space, message, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { DetailBook, UpdateBookModal } from "./index";
import { deleteBook } from "../../services/api/apiBooks";
const TableBooks = ({
  dataBooks,
  loadData,
  current,
  pageSize,
  total,
  setCurrent,
  setPageSize,
}) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [dataBook, setDataBook] = useState({});
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const handOpenModalUpdate = () => {
    setIsOpenModalUpdate(true);
  };
  const handDeleteBook = async (id) => {
    const resDelete = await deleteBook(id);
    if (resDelete.data) {
      message.success("Xóa thành công!");
      loadData();
    }
  };
  const cancel = (e) => {
    // console.log(e);
    message.error("Click on No");
  };
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log({pagination, filters, sorter, extra})
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
  //  console.log(current)
  //  console.log(pageSize)
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      rowScope: "row",
      render: (_, record, index) => <>{(index+1)+(current-1)*pageSize}</>,
    },
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
      render: (text, record) => (
        <a
          href="#"
          onClick={() => {
            setIsOpenDrawer(true);
            setDataBook(record);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "MainText",
      dataIndex: "mainText",
      key: "mainText",
    },
    {
      title: "Thumbnail",
      key: "thumbnail",
      render: (record) => (
        <>
          <img
            style={{ width: "40px", height: "40px" }}
            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
              record.thumbnail
            }`}
            alt="thumbnail"
          />
        </>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              handOpenModalUpdate();
              setDataBook(record);
            }}
            style={{ cursor: "pointer", color: "orange" }}
          />

          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            onConfirm={() => {
              handDeleteBook(record._id);
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            placement="left"
            icon={
              <QuestionCircleOutlined
                style={{
                  color: "red",
                }}
              />
            }
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (dataBooks && dataBooks.length !== 0) {
    return (
      <>
        <DetailBook
          setIsOpenDrawer={setIsOpenDrawer}
          isOpenDrawer={isOpenDrawer}
          dataBook={dataBook}
          loadData={loadData}
        ></DetailBook>
        <Table
          dataSource={dataBooks}
          columns={columns}
          onChange={onChange}
          pagination={{
            current: current,
            pageSize: pageSize,
            showSizeChanger: true,
            total: total,
            showTotal: (total, range) => {
              return (
                <div>
                  {" "}
                  {range[0]}-{range[1]} trên {total} rows
                </div>
              );
            },
          }}
        />
        ;
        <UpdateBookModal
          isOpenModalUpdate={isOpenModalUpdate}
          setIsOpenModalUpdate={setIsOpenModalUpdate}
          dataBook={dataBook}
          loadData={loadData}
        />
      </>
    );
  } else {
    return <div> Bạn cần đăng nhập để xem chức năng này </div>;
  }
};

export default TableBooks;
