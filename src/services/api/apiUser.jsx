import axios from '../axios/axios'
const CreateUserAPI=(fullName,email,password,phone)=>{
    const URL_BE='api/v1/user'
    const data = {
      fullName: fullName,
      email: email,
      password: password,
      phone: phone,
    };
     return axios.post(URL_BE ,data)
}
const UpdateUserAPI =() =>{


}
const getALlUserAPI=()=>{
    const URL_BE='api/v1/user'
     return axios.get(URL_BE)
}
export {CreateUserAPI,UpdateUserAPI,getALlUserAPI};