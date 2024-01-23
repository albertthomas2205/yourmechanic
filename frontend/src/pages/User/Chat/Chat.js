// Chat.js

import React, { useEffect, useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    // Set up WebSocket connection
    const socket = new WebSocket('ws://localhost:8000/ws/room/testing/');

    // Event listener for incoming messages
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    setWebSocket(socket);

    // Clean up WebSocket connection on component unmount
    return () => {
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (webSocket && messageInput.trim() !== '') {
      // Send message to the WebSocket server
      webSocket.send(JSON.stringify({ message: messageInput }));
      setMessageInput('');
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.messageContainer}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            {msg.message}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: 'auto',
  },
  messageContainer: {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
    overflowY: 'auto',
    maxHeight: '300px',
  },
  message: {
    backgroundColor: '#f0f0f0',
    padding: '8px',
    marginBottom: '5px',
    borderRadius: '5px',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '8px',
  },
  button: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '8px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Chat;
