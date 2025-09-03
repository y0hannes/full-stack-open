import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = async (id) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`)
  const newAnecdote = { ...anecdote.data, votes: anecdote.data.votes + 1 }
  const response = await axios.put(`${baseUrl}/${id}`, newAnecdote)
  return response.data
}

export default { getAll, create, update }