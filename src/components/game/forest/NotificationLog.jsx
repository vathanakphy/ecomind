// src/components/game/forest/NotificationLog.js
import React, { useRef, useEffect } from 'react';

const NotificationLog = ({ notifications }) => {
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [notifications]);

  return (
    <div className="notification-log-container">
      <ul className="notification-log">
        {notifications.map(note => (
          <li key={note.id} className={`log-entry log-${note.type}`}>
            {note.message}
          </li>
        ))}
        <div ref={logEndRef} />
      </ul>
    </div>
  );
};

export default NotificationLog;