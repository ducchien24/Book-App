import React, { useState, useEffect } from "react";
import { TableBooks ,BookModal } from "../component/books/index";
import { getAllBooks } from "../services/api/apiBooks";
const Books = () => {
  const [dataBooks, setDataBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await getAllBooks();
    res.data ? setDataBooks(res.data) : [];
  };
  console.log(...dataBooks)

  return (
    <div>
       <div style={{display:"flex", justifyContent:"space-between", margin:'10px',alignItems:'center'}}>
       <h2>Table Books</h2>
       <BookModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}  />
      </div>
      <TableBooks dataBooks={dataBooks}></TableBooks>
    </div>
  );
};

export default Books;
