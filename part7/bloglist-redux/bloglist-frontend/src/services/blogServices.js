import axios from 'axios';
const baseUrl = '/api/blogs';

let config;
let token = null;

const setToken = (newTtoken) => {
  token = `Bearer ${newTtoken}`;
  config = {
    headers: {
      Authorization: token,
    },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data;
};

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return response.data;
};

const remove = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response.data;
};

export default { getAll, getBlog, create, update, remove, setToken };
