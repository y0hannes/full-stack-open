const Notification = (props) => {
  const { successMessage, errorMessage } = props
  const message = successMessage ? successMessage : errorMessage

  const messageStyle = {
    color: errorMessage ? 'red' : 'green',
    backgroundColor: 'lightgray',
    fontSize: '20px',
    borderStyle: 'solid',
    borderColor: errorMessage ? 'red' : 'green',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  if (successMessage || errorMessage) {
    return(
      <p style={messageStyle}> {message} </p>
    )
  }
  else {
    return null
  }
}

export default Notification