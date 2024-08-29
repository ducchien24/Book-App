import axios from '../axios/axios'

export const getAllBooks = () =>{
     const BE_Url='api/v1/book'
     return axios.get(BE_Url)
};