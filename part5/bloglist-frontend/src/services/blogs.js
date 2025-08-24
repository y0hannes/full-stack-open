import axios from 'axios'
const baseUrl = '/api/blogs'

let config
let token = null

const setToken = token => {
  token = `Bearer ${token}`
  config = {
    Headers: {
      Authorization: token
    }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, setToken }