
// // // // // SocketTest.js
// // // // import React, { useEffect } from 'react';
// // // // import io from 'socket.io-client';

// // // // const SocketTest = () => {
// // // //   useEffect(() => {
// // // //     const socket = io('http://localhost:3002'); // Replace with your backend URL
// // // //     socket.on('connect', () => {
// // // //       console.log('Connected to server');
// // // //     });

// // // //     // Clean up the effect
// // // //     return () => {
// // // //       socket.disconnect();
// // // //     };
// // // //   }, []);

// // // //   return <div>Testing Socket Connection...</div>;
// // // // };

// // // // export default SocketTest;
// // // import React, { useState, useEffect } from 'react';
// // // import  io from 'socket.io-client' 


// // // const SocketTest = () => {
// // //   const [message, setMessage] = useState('');
// // //   const [receivedMessage, setReceivedMessage] = useState('');

// // //   useEffect(() => {
// // //     const socket = io.connect('http://localhost:3002'); // Replace with your backend URL

// // //     socket.on('connect', () => {
// // //       console.log('Connected to server');
// // //     });

// // //     socket.on('response', (response) => {
// // //       console.log('Received response:', response);
// // //       setReceivedMessage(response);
// // //     });

// // //     // Clean up the effect
// // //     return () => {
// // //       socket.disconnect();
// // //     };
// // //   }, []);

// // //   const sendMessage = () => {
// // //     const socket = io.connect('http://localhost:3002');
// // //     socket.emit('message', message);
// // //     setMessage(''); // Clear the message field after sending
// // //   };

// // //   return (
// // //     <div>
// // //       <div>Testing Socket Connection...</div>
// // //       <input
// // //         type="text"
// // //         value={message}
// // //         onChange={(e) => setMessage(e.target.value)}
// // //         placeholder="Enter message"
// // //       />
// // //       <button onClick={sendMessage}>Send</button>
// // //       <div>Received Message: {receivedMessage}</div>
// // //     </div>
// // //   );
// // // };

// // // export default SocketTest;
// // import React, { useState, useEffect } from 'react';
// // import io from 'socket.io-client';

// // const SocketTest = () => {
// //   const [receivedMessage, setReceivedMessage] = useState('');
// //   const [sendMessage, setSendMessage] = useState('');

// //   useEffect(() => {
// //     const socket = io('http://localhost:3002'); // Replace with your backend URL

// //     socket.on('connect', () => {
// //       console.log('Connected to server');
// //     });

// //     socket.on('message', (message) => {
// //       console.log('Received message from server:', message);
// //       setReceivedMessage(message);
// //     });

// //     // Clean up the effect
// //     return () => {
// //       socket.disconnect();
// //     };
// //   }, []);

// //   const sendMessageToServer = () => {
// //     const socket = io('http://localhost:3002');
// //     socket.emit('message', sendMessage); // Send message to server
// //     setSendMessage(''); // Clear message input field after sending
// //   };

// //   return (
// //     <div>
// //       <div>Testing Socket Connection...</div>
// //       <input
// //         type="text"
// //         value={sendMessage}
// //         onChange={(e) => setSendMessage(e.target.value)}
// //         placeholder="Enter message"
// //       />
// //       <button onClick={sendMessageToServer}>Send Message</button>
// //       <div>Received Message from other client: {receivedMessage}</div>
// //     </div>
// //   );
// // };

// // export default SocketTest;
// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const SocketTest = () => {
//   const [receivedMessage, setReceivedMessage] = useState('');
//   const [sendMessage, setSendMessage] = useState('');
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // Establish a single socket connection
//     const newSocket = io('http://localhost:3002'); // Replace with your backend URL

//     newSocket.on('connect', () => {
//       console.log('Connected to server');
//     });

//     newSocket.on('message', (message) => {
//       console.log('Received message from server:', message);
//       setReceivedMessage(message);
//     });

//     // Save the socket instance to state
//     setSocket(newSocket);

//     // Clean up the effect
//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   const sendMessageToServer = () => {
//     if (socket) {
//       socket.emit('message', sendMessage); // Send message to server
//       setSendMessage(''); // Clear message input field after sending
//     }
//   };

//   return (
//     <div>
//       <div>Testing Socket Connection...</div>
//       <input
//         type="text"
//         value={sendMessage}
//         onChange={(e) => setSendMessage(e.target.value)}
//         placeholder="Enter message"
//       />
//       <button onClick={sendMessageToServer}>Send Message</button>
//       <div>Received Message from other clients: {receivedMessage}</div>
//     </div>
//   );
// };

// export default SocketTest;
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const SocketTest = () => {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3002'); // Replace with your backend URL

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('message', (message) => {
      console.log('Received message from server:', message);
      setReceivedMessages((prevMessages) => [...prevMessages, message]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessageToServer = () => {
    if (socket) {
      socket.emit('message', message); // Send message to server
      setMessage(''); // Clear message input field after sending
    }
  };

  return (
    <div>
      <div>Testing Socket Connection...</div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={sendMessageToServer}>Send Message</button>
      <div>
        <h3>Received Messages:</h3>
        {receivedMessages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default SocketTest;
