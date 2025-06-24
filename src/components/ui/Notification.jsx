// src/components/ui/Notification.js
import React, { useEffect } from 'react';
import Icon from './Icon';

const Notification = ({ message, type, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className={`notification notification-${type}`}>
      <Icon type={type === 'error' ? 'warning' : 'info'} /> {message}
      <button onClick={onDismiss} className="notification-dismiss">×</button>
    </div>
  );
};

export default Notification;