import axios from "../axios/axios";
const CreateUserAPI = (fullName, email, password, phone) => {
  const URL_BE = "api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BE, data);
};
const RegisterAPI = (fullName, email, password, phone) => {
  const URL_BE = "api/v1/user/register";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BE, data);
};
const LoginAPI = (email, password) => {
  const URL_BE = "api/v1/auth/login";
  const data = {
    username: email,
    password: password,
  };
  return axios.post(URL_BE, data);
};
const getAccountApi = () => {
  const URL_BE = "api/v1/auth/account";
  return axios.get(URL_BE);
};
const logOutApi = () => {
  const URL_BE = "api/v1/auth/logout";
  return axios.post(URL_BE);
};
const UpdateUserAPI = (id, fullName, phone, avatar) => {
  const URL_BE = "api/v1/user";
  const data = {
    _id: id,
    fullName: fullName,
    phone: phone,
    avatar: avatar,
  };
  return axios.put(URL_BE, data);
};
const DeleteUser = (id) => {
  const URL_BE = `api/v1/user/${id}`;

  return axios.delete(URL_BE);
};
const getALlUserAPI = (current, pageSize) => {
  const URL_BE = `api/v1/user?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BE);
};

const handUploadFile = (file, folder) => {
  const URL_BE = `api/v1/file/upload`;
  let config = {
    headers: {
      "upload-type": folder,
      "Content-Type": "multipart/form-data",
    },
  };
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);
  return axios.post(URL_BE, bodyFormData, config);
};
export {
  CreateUserAPI,
  UpdateUserAPI,
  getALlUserAPI,
  DeleteUser,
  handUploadFile,
  RegisterAPI,
  LoginAPI,
  getAccountApi,
  logOutApi,
};
