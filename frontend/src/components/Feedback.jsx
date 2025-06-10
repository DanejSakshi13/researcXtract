import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';

const FeedbackContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  align-items: center;
`;

const FeedbackButton = styled.button`
  background-color: ${props => (props.active ? '#d2ff72' : '#3a3a3a')};
  color: ${props => (props.active ? '#000000' : '#ffffff')};
  border: 1px solid #5f5f5f;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  &:hover {
    background-color: ${props => (props.disabled ? '#3a3a3a' : '#4a4a4a')};
  }
`;

const FeedbackMessage = styled.p`
  color: #d2ff72;
  font-size: 14px;
  margin-left: 10px;
`;

const Feedback = ({ sessionId, initialFeedback }) => {
  const { token } = useContext(AuthContext);
  const [feedbackStatus, setFeedbackStatus] = useState(initialFeedback || null);
  const [error, setError] = useState('');

  console.log('Feedback props:', { sessionId, initialFeedback, token }); // Debug props
  console.log('Feedback state:', { feedbackStatus, error }); // Debug state

  // Reset feedbackStatus when sessionId changes
  useEffect(() => {
    console.log('useEffect triggered with sessionId:', sessionId, 'initialFeedback:', initialFeedback);
    setFeedbackStatus(initialFeedback || null);
  }, [sessionId, initialFeedback]);

  const handleFeedback = async (feedback) => {
    if (!token || !sessionId) {
      setError('Authentication or session ID missing.');
      console.warn('Feedback submission blocked:', { token, sessionId });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ session_id: sessionId, feedback }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error response:', errorData);
        throw new Error(errorData.error || 'Failed to submit feedback');
      }

      setFeedbackStatus(feedback);
      setError('');
    } catch (err) {
      console.error('Feedback submission error:', err);
      setError(`Error submitting feedback: ${err.message}`);
    }
  };

  return (
    <FeedbackContainer>
      <FeedbackButton
        onClick={() => handleFeedback('up')}
        active={feedbackStatus === 'up'}
        disabled={feedbackStatus !== null}
      >
        <FontAwesomeIcon icon={faThumbsUp} />
      </FeedbackButton>
      <FeedbackButton
        onClick={() => handleFeedback('down')}
        active={feedbackStatus === 'down'}
        disabled={feedbackStatus !== null}
      >
        <FontAwesomeIcon icon={faThumbsDown} />
      </FeedbackButton>
      {feedbackStatus && (
        <FeedbackMessage>
          Thank you for your {feedbackStatus === 'up' ? 'positive' : 'honest'} feedback!
        </FeedbackMessage>
      )}
      {error && <FeedbackMessage style={{ color: 'red' }}>{error}</FeedbackMessage>}
    </FeedbackContainer>
  );
};


export default Feedback;