import type { NotificationProps } from '../types';

const Notification = ({ error }: NotificationProps) => {
  if (!error) {
    return null;
  }
  const errorStyle = {
    color: 'red',
  };
  return <p style={errorStyle}>{error}</p>;
};

export default Notification;
