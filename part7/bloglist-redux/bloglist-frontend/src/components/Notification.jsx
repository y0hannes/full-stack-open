import { useSelector } from 'react-redux';

const error = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderColor: 'red',
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};

const success = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderColor: 'green',
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) {
    return null;
  }

  if (notification.startsWith('Error:')) {
    return (
      <div id="error" style={error}>
        {notification}
      </div>
    );
  } else {
    return (
      <div id="success" style={success}>
        {notification}
      </div>
    );
  }
};

export default Notification;
