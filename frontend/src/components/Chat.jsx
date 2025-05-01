







// import React, { useState, useEffect, useContext } from 'react';
// import styled from 'styled-components';
// import ReactMarkdown from 'react-markdown';
// import { AuthContext } from '../context/AuthContext';

// const ChatContainer = styled.div`
//   margin-top: 20px;
//   padding: 20px;
//   background-color: #2c2c2c;
//   border: 1px solid #5f5f5f;
//   color: white;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const MessageList = styled.div`
//   max-height: 300px;
//   overflow-y: auto;
//   margin-bottom: 20px;
// `;

// const Message = styled.div`
//   padding: 10px;
//   margin: 5px 0;
//   background-color: ${props => (props.$isUser ? '#1e90ff' : '#e0e0e0')};
//   color: ${props => (props.$isUser ? 'white' : 'black')};
//   border-radius: 8px;
//   max-width: 80%;
//   align-self: ${props => (props.$isUser ? 'flex-end' : 'flex-start')};
//   word-wrap: break-word;
// `;

// const InputContainer = styled.div`
//   display: flex;
//   gap: 10px;
// `;

// const ChatInput = styled.input`
//   flex: 1;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 1rem;
// `;

// const SendButton = styled.button`
//   padding: 10px 20px;
//   background-color: #1e90ff;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   &:hover {
//     background-color: #1c86ee;
//   }
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-size: 0.9rem;
//   margin: 10px 0;
// `;

// const Chat = ({ sessionId, messages = [] }) => {
//   const [chatMessages, setChatMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [error, setError] = useState('');
//   const { token } = useContext(AuthContext);

//   useEffect(() => {
//     const validatedMessages = Array.isArray(messages) ? messages.filter(msg => msg.user && msg.assistant) : [];
//     console.log('Chat received messages:', validatedMessages);
//     setChatMessages(validatedMessages);
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim()) {
//       setError('Please enter a message.');
//       return;
//     }
//     if (!sessionId) {
//       setError('No valid session ID. Please upload a PDF or select a valid history item.');
//       console.error('No valid session ID.');
//       return;
//     }

//     const newMessage = { user: input, assistant: '' };
//     setChatMessages(prev => [...prev, newMessage]);
//     setInput('');
//     setError('');

//     try {
//       const response = await fetch('http://localhost:5000/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ message: input, session_id: sessionId }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setChatMessages(prev => {
//           const updated = [...prev];
//           updated[updated.length - 1].assistant = data.response;
//           return updated;
//         });
//       } else {
//         setError(`Chat error: ${data.error}`);
//         console.error('Chat error:', data.error);
//       }
//     } catch (err) {
//       setError(`Chat fetch error: ${err.message}`);
//       console.error('Chat fetch error:', err);
//     }
//   };

//   return (
//     <ChatContainer>
//       <h3>Chat</h3>
//       {sessionId ? (
//         <>
//           <MessageList>
//             {chatMessages.length > 0 ? (
//               chatMessages.map((msg, index) => (
//                 <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
//                   <Message $isUser={true}>{msg.user}</Message>
//                   {msg.assistant && (
//                     <Message $isUser={false}>
//                       <ReactMarkdown>{msg.assistant}</ReactMarkdown>
//                     </Message>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p>No chat history available.</p>
//             )}
//           </MessageList>
//           <InputContainer>
//             <ChatInput
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask a question..."
//             />
//             <SendButton onClick={handleSend}>Send</SendButton>
//           </InputContainer>
//           {error && <ErrorMessage>{error}</ErrorMessage>}
//         </>
//       ) : (
//         <ErrorMessage>No valid session ID. Please upload a PDF or select a valid history item.</ErrorMessage>
//       )}
//     </ChatContainer>
//   );
// };

// export default Chat;











import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { AuthContext } from '../context/AuthContext';

const ChatContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #2c2c2c;
  border: 1px solid #5f5f5f;
  color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MessageList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const Message = styled.div`
  padding: 10px;
  margin: 5px 0;
  background-color: ${props => (props.$isUser ? '#1e90ff' : '#e0e0e0')};
  color: ${props => (props.$isUser ? 'white' : 'black')};
  border-radius: 8px;
  max-width: 80%;
  align-self: ${props => (props.$isUser ? 'flex-end' : 'flex-start')};
  word-wrap: break-word;
`;

const LoadingAnimation = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  margin: 5px 0;
  color: #e0e0e0;
  font-size: 1rem;

  span {
    animation: dots 1.5s infinite;
    margin-right: 3px;
  }

  span:nth-child(2) {
    animation-delay: 0.2s;
  }

  span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes dots {
    0%, 20% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
    80%, 100% {
      opacity: 0.2;
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #1c86ee;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 10px 0;
`;

const Chat = ({ sessionId, messages = [] }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const validatedMessages = Array.isArray(messages) ? messages.filter(msg => msg.user && msg.assistant) : [];
    console.log('Chat received messages:', validatedMessages);
    setChatMessages(validatedMessages);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) {
      setError('Please enter a message.');
      return;
    }
    if (!sessionId) {
      setError('No valid session ID. Please upload a PDF or select a valid history item.');
      console.error('No valid session ID.');
      return;
    }

    const newMessage = { user: input, assistant: '' };
    setChatMessages(prev => [...prev, newMessage]);
    setInput('');
    setError('');
    setLoading(true); // Start loading animation

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input, session_id: sessionId }),
      });
      const data = await response.json();
      if (response.ok) {
        setChatMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].assistant = data.response;
          return updated;
        });
      } else {
        setError(`Chat error: ${data.error}`);
        console.error('Chat error:', data.error);
      }
    } catch (err) {
      setError(`Chat fetch error: ${err.message}`);
      console.error('Chat fetch error:', err);
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  return (
    <ChatContainer>
      <h3>Chat</h3>
      {sessionId ? (
        <>
          <MessageList>
            {chatMessages.length > 0 || loading ? (
              <>
                {chatMessages.map((msg, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                    <Message $isUser={true}>{msg.user}</Message>
                    {msg.assistant && (
                      <Message $isUser={false}>
                        <ReactMarkdown>{msg.assistant}</ReactMarkdown>
                      </Message>
                    )}
                  </div>
                ))}
                {loading && (
                  <LoadingAnimation>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </LoadingAnimation>
                )}
              </>
            ) : (
              <p>No chat history available.</p>
            )}
          </MessageList>
          <InputContainer>
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
            />
            <SendButton onClick={handleSend}>Send</SendButton>
          </InputContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </>
      ) : (
        <ErrorMessage>No valid session ID. Please upload a PDF or select a valid history item.</ErrorMessage>
      )}
    </ChatContainer>
  );
};

export default Chat;