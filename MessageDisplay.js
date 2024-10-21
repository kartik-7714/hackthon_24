import React from 'react';

const MessageDisplay = ({ message }) => {
  if (!message) return null;
  
  const messageClass = message.includes('successful') ? 'success' : 'error';
  return <p className={messageClass}>{message}</p>;
};

export default MessageDisplay;
