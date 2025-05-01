// import React from 'react';
// import styled from 'styled-components';

// const Card = styled.div`
//   background-color: #2c2c2c;
//   border: 1px solid #5f5f5f;
//   color: white;
//   padding: 20px;
//   border-radius: 8px;
//   margin: 10px 0;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
// `;

// const Title = styled.h3`
//   margin: 0 0 10px;
//   font-size: 1.2rem;
// `;

// const CitationList = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;
// `;

// const CitationItem = styled.li`
//   margin: 5px 0;
// `;

// const Citations = ({ citations }) => (
//   <Card>
//     <Title>Citations</Title>
//     <CitationList>
//       {citations && citations.length > 0 ? (
//         citations.map((citation, index) => (
//           <CitationItem key={index}>{citation}`</CitationItem>
//         ))
//       ) : (
//         <p>No citations available</p>
//       )}
//     </CitationList>
//   </Card>
// );

// export default Citations;

















import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

const Card = styled.div`
  background-color: #2c2c2c;
  border: 1px solid #5f5f5f;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h3`
  margin: 0 0 10px;
  font-size: 1.2rem;
`;

const CitationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CitationItem = styled.li`
  margin: 5px 0;
  font-size: 0.9rem;
`;

const DropdownContainer = styled.div`
  margin-bottom: 10px;
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
        // Use raw citations directly
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

  return (
    <Card>
      <Title>Citations</Title>
      <DropdownContainer>
        <CitationStyleSelect value={selectedStyle} onChange={handleStyleChange} aria-label="Select citation style">
          <option value="Original">Original</option>
          <option value="APA">APA</option>
          <option value="MLA">MLA</option>
          <option value="Chicago">Chicago</option>
          <option value="IEEE">IEEE</option>
        </CitationStyleSelect>
      </DropdownContainer>
      {loading ? (
        <LoadingMessage aria-live="polite">Loading citations...</LoadingMessage>
      ) : error ? (
        <ErrorMessage aria-live="polite">{error}</ErrorMessage>
      ) : (
        <CitationList>
          {formattedCitations.length > 0 ? (
            formattedCitations.map((citation, index) => (
              <CitationItem key={index}>{citation}</CitationItem>
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