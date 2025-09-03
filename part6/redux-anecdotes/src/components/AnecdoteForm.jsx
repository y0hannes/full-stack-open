import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreateAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(addAnecdote(content))
    dispatch(setNotification(`You added anecdote ${content}`, 5))
  }

  return (
    <form onSubmit={handleCreateAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  )
}

export default AnecdoteForm