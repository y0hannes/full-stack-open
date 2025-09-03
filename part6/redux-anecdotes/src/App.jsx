import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializaAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispach = useDispatch()

  useEffect(() => {
    dispach(initializaAnecdotes())
  }, [dispach])

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
