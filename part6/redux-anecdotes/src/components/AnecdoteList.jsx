import { useDispatch, useSelector } from "react-redux"
import { updateVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const filteredAnecdotes = anecdotes
    .filter(
      (anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.votes - a.votes)

  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(updateVote(id))
    dispatch(setNotification(`you voted '${content}'`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList