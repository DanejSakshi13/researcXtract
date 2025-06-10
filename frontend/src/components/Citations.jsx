import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faClipboard } from '@fortawesome/free-solid-svg-icons';

const Card = styled.div`
  background-color: #2c2c2c;
  border: 1px solid #5f5f5f;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; /* Space between title and dropdown */
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.2rem;
`;

const CitationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: ${props => (props.$isExpanded ? 'none' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const CitationItem = styled.li`
  margin: 5px 0;
  font-size: 0.9rem;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3c3c3c;
  }
`;

const CitationText = styled.span`
  flex: 1;
`;

const FeedbackText = styled.span`
  color: #d2ff72;
  font-size: 0.9rem;
  margin-left: 5px;
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.3s;
`;

const CitationStyleSelect = styled.select`
  padding: 8px;
  border: 1px solid #5f5f5f;
  border-radius: 4px;
  background-color: #3c3c3c;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #1e90ff;
  }
`;

const CopyAllButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 1.3rem;
  padding: 5px;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: #b8e65f;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 10px 0;
`;

const LoadingMessage = styled.p`
  color: #e0e0e0;
  font-size: 0.9rem;
  margin: 10px 0;
`;

const Citations = ({ citations }) => {
  const [selectedStyle, setSelectedStyle] = useState('Original'); // Default to Original
  const [formattedCitations, setFormattedCitations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); // Default collapsed state
  const [copiedStates, setCopiedStates] = useState({}); // Track "Copied!" state for each citation
  const [copiedAll, setCopiedAll] = useState(false); // Track "Copied!" state for Copy All
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const convertCitations = async () => {
      if (!citations || citations.length === 0) {
        setFormattedCitations([]);
        setError('');
        setLoading(false);
        return;
      }

      if (selectedStyle === 'Original') {
        setFormattedCitations(citations);
        setError('');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await fetch('http://localhost:5000/api/convert-citations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            citations,
            style: selectedStyle,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setFormattedCitations(data.converted_citations || []);
          setError('');
        } else {
          setError(`Failed to convert citations: ${data.error}`);
          setFormattedCitations(citations); // Fallback to original citations
        }
      } catch (err) {
        setError(`Error fetching citations: ${err.message}`);
        setFormattedCitations(citations); // Fallback to original citations
      } finally {
        setLoading(false);
      }
    };

    convertCitations();
  }, [citations, selectedStyle, token]);

  const handleStyleChange = (e) => {
    setSelectedStyle(e.target.value);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCopy = async (citation, index) => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopiedStates(prev => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [index]: false }));
      }, 2000); // Hide feedback after 2 seconds
    } catch (err) {
      console.error('Failed to copy citation:', err);
    }
  };

  const handleCopyAll = async () => {
    if (formattedCitations.length === 0) return;

    try {
      const allCitationsText = formattedCitations.join('\n');
      await navigator.clipboard.writeText(allCitationsText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000); // Hide feedback after 2 seconds
    } catch (err) {
      console.error('Failed to copy all citations:', err);
    }
  };

  return (
    <Card>
      <TitleContainer onClick={toggleExpanded}>
        <LeftSection>
          <Title>Citations</Title>
          <CitationStyleSelect value={selectedStyle} onChange={handleStyleChange} aria-label="Select citation style">
            <option value="Original">Original</option>
            <option value="APA">APA</option>
            <option value="MLA">MLA</option>
            <option value="Chicago">Chicago</option>
            <option value="IEEE">IEEE</option>
          </CitationStyleSelect>
        </LeftSection>
        <RightSection>
          {formattedCitations.length > 0 && (
            <CopyAllButton onClick={(e) => { e.stopPropagation(); handleCopyAll(); }} title="Copy all citations" aria-label="Copy all citations">
              <FontAwesomeIcon icon={faClipboard} />
              <FeedbackText visible={copiedAll}>Copied!</FeedbackText>
            </CopyAllButton>
          )}
          <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
        </RightSection>
      </TitleContainer>
      {loading ? (
        <LoadingMessage aria-live="polite">Loading citations...</LoadingMessage>
      ) : error ? (
        <ErrorMessage aria-live="polite">{error}</ErrorMessage>
      ) : (
        <CitationList $isExpanded={isExpanded}>
          {formattedCitations.length > 0 ? (
            formattedCitations.map((citation, index) => (
              <CitationItem
                key={index}
                onClick={() => handleCopy(citation, index)}
                title="Click to copy citation"
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleCopy(citation, index)}
              >
                <CitationText>{citation}</CitationText>
                <FeedbackText visible={copiedStates[index] || false}>Copied!</FeedbackText>
              </CitationItem>
            ))
          ) : (
            <p>No citations available</p>
          )}
        </CitationList>
      )}
    </Card>
  );
};

export default Citations;