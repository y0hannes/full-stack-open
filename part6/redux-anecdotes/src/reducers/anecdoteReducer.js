import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdotes'

const initialAnecdotes = []
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []

initialAnecdotes.map((anecdote) => {
  const newAnecdote = asObject(anecdote)
  initialState.push(newAnecdote)
})

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = asObject(action.payload)
      state.push(newAnecdote)
      anecdoteServices.create(newAnecdote)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    loadAnecdote(state, action) {
      return action.payload
    }
  }
})


export const { createAnecdote, voteAnecdote, loadAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer