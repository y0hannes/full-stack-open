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
      state.push(action.payload)
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
    setAnedotes(state, action) {
      return action.payload
    }
  }
})

export const initializaAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnedotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdoteObj = asObject(content)
    const newAnecdote = await anecdoteServices.create(newAnecdoteObj)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const updateVote = (id) => {
  return async (dispatch) => {
    const response = await anecdoteServices.update(id)
    dispatch(voteAnecdote(id))
  }
}

export const { createAnecdote, voteAnecdote, setAnedotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer