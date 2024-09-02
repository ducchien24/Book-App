import React, { useState, useEffect } from "react";
import { TableBooks ,BookModal,DetailBook } from "../component/books/index";
import { getAllBooks ,updateBook} from "../services/api/apiBooks";

const Books = () => {
  const [dataBooks, setDataBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadData();
  }, [current,pageSize]);

  const loadData = async () => {
    const res = await getAllBooks(current,pageSize);
  if  (res.data) {
      setDataBooks(res.data.result)
      setCurrent(res.data.meta.current)
      setPageSize(res.data.meta.pageSize)
      setTotal(res.data.meta.total)
    }
  };
  // console.log(dataBooks)


  return (
    <div>
       <div style={{display:"flex", justifyContent:"space-between", margin:'10px',alignItems:'center'}}>
       <h2>Table Books</h2>
       <BookModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} loadData={loadData} />
      </div>
      <TableBooks dataBooks={dataBooks} loadData={loadData} current={current} pageSize={pageSize} total={total} setCurrent={setCurrent} setPageSize={setPageSize}></TableBooks>
      
    </div>
  );
};

export default Books;
