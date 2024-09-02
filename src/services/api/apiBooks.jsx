import axios from '../axios/axios'

export const getAllBooks = (current,pageSize) =>{
     const BE_Url=`api/v1/book?current=${current}&pageSize=${pageSize}`
     return axios.get(BE_Url)
};
export const createBook = (thumbnail,mainText,author,price,quantity,category) =>{
  const BE_Url='api/v1/book'
  const data ={
    thumbnail:thumbnail,
    mainText:mainText,
    author:author,
    price:price,
    quantity:quantity,
    category:category,
  }
 return axios.post(BE_Url,data)
};
export const uploadImageBook=(file,folder)=>{
  
    const BE_Url='api/v1/file/upload'
    let config=  {
        headers:{ 
        "upload-type": folder,
        "Content-Type": "multipart/form-data" }
    }
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', file); 
    return axios.post( BE_Url,bodyFormData,config)
};
export const updateBook = (id,thumbnail,mainText,author,price,quantity,category) =>{
  const BE_Url='api/v1/book'
  const data ={
    _id:id,
    thumbnail:thumbnail,
    mainText:mainText,
    author:author,
    price:price,
    quantity:quantity,
    category:category,
  }
  return axios.put(BE_Url,data)
};
export const deleteBook = (id)=>{
   const BE_Url=`api/v1/book/${id}`
   return axios.delete(BE_Url)
};

