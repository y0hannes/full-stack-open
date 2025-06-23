import axios from "axios"

const url = 'http://localhost:3001/persons'

const GetAll = () => axios.get(url).then(response => response.data)

const Update = (id, newPerson) => {
  const request = axios.put(`${url}/${id}`, newPerson)
  return request.then(response => response.data)
}

const Create = (newPerson) => {
  const request = axios.post(url, newPerson)
  return request.then(response => response.data)
}

const Delete = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => response.data)
}

export default { GetAll, Create, Update, Delete}