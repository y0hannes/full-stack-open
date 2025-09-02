import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteServices from './services/anecdotes'
import { loadAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const dispach = useDispatch()

  useEffect(() => {
    anecdoteServices.getAll()
      .then(
        (anecdotes) => dispach(loadAnecdote(anecdotes)))
  }, [])

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
