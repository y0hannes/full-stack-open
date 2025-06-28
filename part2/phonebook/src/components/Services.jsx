import axios from "axios"

const url = '/api'

const GetAll = () => axios.get(`${url}/persons`).then(response => response.data)

const Update = (id, newPerson) => {
  const request = axios.put(`${url}/${id}`, newPerson)
  return request.then(response => response.data)
}

const Create = (newPerson) => {
  const request = axios.post(`${url}/persons`, newPerson)
  return request.then(response => response.data)
}

const Delete = (id) => {
  const request = axios.delete(`${url}/person/${id}`)
  return request.then(response => response.data)
}

export default { GetAll, Create, Update, Delete}