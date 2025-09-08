import { Link } from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div style={padding}>
      <Link to='/' style={padding}>blog</Link>
      <Link to='/users' style={padding}>users</Link>
    </div>
  )
}

export default Menu