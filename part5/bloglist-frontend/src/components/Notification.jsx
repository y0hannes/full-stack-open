const error = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderColor: 'red',
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const success = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderColor: 'green',
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const Notification = ({ errorMessage, successMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null
  } else if (successMessage){
    return (
      <div id='success' style={success}>
        {successMessage}
      </div>
    )
  } else {
    return (
      <div id='error' style={error}>
        {errorMessage}
      </div>
    )
  }
}

export default Notification