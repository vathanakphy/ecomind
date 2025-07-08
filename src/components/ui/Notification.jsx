// src/components/ui/Notification.js
import React, { useEffect } from 'react';
import Icon from './Icon';

// The 'isStatic' prop is added. It defaults to 'false'.
const Notification = ({ message, type, onDismiss, isStatic = false }) => {

  // This effect will only run for pop-up toasts (when isStatic is false)
  useEffect(() => {
    // If the notification is static (in the history list), do nothing.
    if (isStatic) {
      return;
    }

    // For pop-up toasts, set a timer to automatically dismiss them.
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer); // Cleanup the timer

  }, [onDismiss, isStatic]); // Effect depends on these props

  // A helper to show a relevant icon based on the notification type
  const getIconType = () => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'x-circle';
      case 'warning':
        return 'alert-triangle';
      default:
        return 'info';
    }
  };

  return (
    <div className={`notification notification-${type}`}>
      <Icon type={getIconType()} /> {message}

      {/* The dismiss button will only show for pop-up toasts */}
      {!isStatic && (
        <button onClick={onDismiss} className="notification-dismiss" title="Dismiss">
          &times;
        </button>
      )}
    </div>
  );
};

export default Notification;