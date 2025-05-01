import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

const CopyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 1.3rem;
  padding: 5px;
  display: inline-flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: #b8e65f;
  }
`;

const FeedbackText = styled.span`
  color: #d2ff72;
  font-size: 0.9rem;
  margin-left: 5px;
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.3s;
`;

const CopyToClipboard = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide feedback after 2 seconds
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div>
      <CopyButton onClick={handleCopy} title="Copy to clipboard">
        <FontAwesomeIcon icon={faClipboard} />
        <FeedbackText visible={copied}>Copied!</FeedbackText>
      </CopyButton>
    </div>
  );
};

export default CopyToClipboard;