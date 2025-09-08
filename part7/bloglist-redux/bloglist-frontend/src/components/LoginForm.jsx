import { useState } from "react"
import { useDispatch } from "react-redux"
import {useNavigate} from 'react-router-dom'
import { createNotification } from "../reducers/notificationReducer"
import { loginUser } from "../reducers/authReducer"

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    try {
      const user = dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
      dispatch(createNotification(`welcome back ${user.username}`))
      navigate('/')
    }
    catch (exception) {
      dispatch(createNotification('Error: wrong credentials'))
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>

        <label>
          username
          <input
            type="text"
            id="name"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <br />
        <label>
          password
          <input
            type="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)} />
        </label>
        <br />
        <button
          id='login-login-btn'
          type="submit"
        >
          login
        </button>
      </form>

    </div >
  )
}

export default LoginForm