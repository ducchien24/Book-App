import React from "react";
import { Table } from "antd";

const TableBooks = ({ dataBooks }) => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key:'index',
      rowScope: 'row',
      render:(_, record,index)=><>{index}</>
    },
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <a href="#">{text}</a>,
    },
    {
      title: "MainText",
      dataIndex: "mainText",
      key: "mainText",
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
  ];
  if (dataBooks && dataBooks.length !== 0) {
    return <Table dataSource={dataBooks} columns={columns} />;
  } else {
    return <div> Bạn cần đăng nhập để xem chức năng này </div>;
  }
};

export default TableBooks;
