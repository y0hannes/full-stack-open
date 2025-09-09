import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div className="max-w-md mx-auto my-4 p-4 border border-gray-200 rounded shadow-sm bg-white">
      {!visible && (
        <button
          onClick={toggleVisibility}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          {props.buttonLabel}
        </button>
      )}

      {visible && (
        <div className="space-y-4">
          <div>{props.children}</div>
          <button
            onClick={toggleVisibility}
            className="px-3 py-1 bg-gray-300 text-gray-800 text-sm rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
});

export default Togglable;
