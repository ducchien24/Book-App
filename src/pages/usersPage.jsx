import React, { useEffect, useState } from "react";
import { TableUser, FormUser } from "../component/user/index";
import { CreateUserAPI, getALlUserAPI } from "../services/api/apiUser";
const UsersPage = () => {
  const [dataUsers, setDataUsers] = useState([]);
   const [current, setCurrent] = useState(1);
   const [pageSize, setPageSize] = useState(5);
   const [total, setTotal] = useState(0);
  useEffect(() => {
    loadData();
  }, [current,pageSize]);

  const loadData = async () => {
    const res = await getALlUserAPI(current,pageSize);
    if(res){
      console.log(res)
      setDataUsers(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize)
      setTotal(res.data.meta.total)
    }
    
  };
console.log("current",current)
  return (
    <div>
      <FormUser loadData={loadData} />
      <TableUser
       dataUsers={dataUsers}
       loadData={loadData} 
       current={current}
       pageSize={pageSize}
       total={total}
      setCurrent={setCurrent}
      setPageSize={setPageSize}
      />
    </div>
  );
};

export default UsersPage;
