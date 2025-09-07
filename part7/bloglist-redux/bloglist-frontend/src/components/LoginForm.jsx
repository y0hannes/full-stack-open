const LoginForm = (props) => {
  const { username, password, setUsername, setPassword, handleLogin } = props
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