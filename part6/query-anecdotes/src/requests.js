import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = async(id) => {
  const anecdote = (await axios.get(`${baseUrl}/${id}`)).data
  const newAnecdote = {...anecdote, votes : anecdote.votes + 1}
  const response = await axios.put(`${baseUrl}/${id}`, newAnecdote)
  return response.data
}

export { getAnecdotes, create , update}