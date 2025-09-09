import axios from 'axios';

const baseUrl = 'api/blogs';

const getAll = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`);
  return response.data;
};

const create = async (id, content) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, content);
  return response.data;
};

export default { getAll, create };
