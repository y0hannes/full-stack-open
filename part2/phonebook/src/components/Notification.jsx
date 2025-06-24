const Notification = ({ message }) => {
  const {value, error} = message

  const messageStyle = {
    color: error? 'red' : 'green',
    backgroundColor: 'lightgray',
    fontSize: '20px',
    borderStyle: 'solid',
    borderColor: error ? 'red' : 'green',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (!value) {
    return null
  }
  return (
    <p style={messageStyle}>{value}</p>
  )
}

export default Notification