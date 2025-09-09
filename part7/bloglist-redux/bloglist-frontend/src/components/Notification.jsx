import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) return null;

  const isError = notification.startsWith('Error:');

  return (
    <div
      className={`max-w-lg mx-auto my-4 px-4 py-2 rounded border shadow-sm transition-all duration-300
        ${
          isError
            ? 'bg-red-100 text-red-800 border-red-200'
            : 'bg-green-100 text-green-800 border-green-200'
        }
      `}
    >
      {notification}
    </div>
  );
};

export default Notification;
