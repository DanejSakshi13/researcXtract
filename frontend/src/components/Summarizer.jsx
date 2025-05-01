// import React, { useState, useEffect, useContext } from 'react';
// import styled from 'styled-components';
// import { AuthContext } from '../context/AuthContext';
// import CopyToClipboard from './CopyToClipboard';

// const Card = styled.div`
//   background-color: #2c2c2c;
//   border: 1px solid #5f5f5f;
//   color: white;
//   padding: 20px;
//   border-radius: 8px;
//   margin: 10px 0;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
// `;

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   margin-bottom: 10px;
// `;

// const Title = styled.h3`
//   margin: 0;
//   font-size: 1.2rem;
// `;

// const Select = styled.select`
//   background-color: #3a3a3a;
//   color: white;
//   border: 1px solid #555;
//   border-radius: 4px;
//   padding: 5px;
//   font-size: 0.9rem;
//   cursor: pointer;
//   &:hover {
//     background-color: #4a4a4a;
//   }
// `;

// const SummaryText = styled.p`
//   margin: 5px;
//   text-align: justify;
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-size: 0.9rem;
//   margin: 10px 0 0;
// `;

// const Summarizer = ({ summary, sessionId, sectionSummaries = {}, setAnalysisData }) => {
//   const [selectedSection, setSelectedSection] = useState('Entire Paper');
//   const [currentSummary, setCurrentSummary] = useState(summary);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { token } = useContext(AuthContext);

//   const sections = [
//     'Entire Paper',
//     'Introduction',
//     'Literature Review',
//     'Methodology',
//     'Results',
//     'Conclusion',
//   ];

//   useEffect(() => {
//     setCurrentSummary(summary);
//     setSelectedSection('Entire Paper');
//   }, [summary]);

//   const handleSectionChange = async (e) => {
//     const section = e.target.value;
//     setSelectedSection(section);
//     setError('');
//     setLoading(true);

//     if (!sessionId) {
//       setError('No valid session ID. Please upload a PDF or select a valid history item.');
//       setLoading(false);
//       return;
//     }

//     try {
//       if (sectionSummaries[section]) {
//         setCurrentSummary(sectionSummaries[section]);
//       } else if (section === 'Entire Paper') {
//         setCurrentSummary(summary);
//       } else {
//         const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/summarize-section`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify({ section, session_id: sessionId }),
//         });

//         if (!response.ok) {
//           throw new Error((await response.json()).error || 'Unknown error');
//         }

//         const data = await response.json();
//         const newSummary = data.summary || 'This section is not available in the paper.';

//         setAnalysisData(prev => ({
//           ...prev,
//           sectionSummaries: {
//             ...prev.sectionSummaries,
//             [section]: newSummary,
//           },
//         }));

//         setCurrentSummary(newSummary);
//       }
//     } catch (err) {
//       setError(`Failed to fetch summary: ${err.message}`);
//       console.error('Section summary error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card>
//       <Header>
//         <Title>{selectedSection} Summary</Title>
//         {summary !== 'No summary available' && sessionId ? (
//           <Select value={selectedSection} onChange={handleSectionChange}>
//             {sections.map(section => (
//               <option key={section} value={section}>
//                 {section}
//               </option>

//             ))}

//           </Select>
//         )
//           : (
//             <ErrorMessage>No valid session ID or summary available.</ErrorMessage>
//           )}
//         <CopyToClipboard text={currentSummary} />

//       </Header>
//       {loading ? (
//         <SummaryText>Loading...</SummaryText>
//       ) : (
//         <SummaryText>{currentSummary}</SummaryText>
//       )}
//       {error && <ErrorMessage>{error}</ErrorMessage>}
//     </Card>
//   );
// };

// export default Summarizer;






import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import CopyToClipboard from './CopyToClipboard';
import ReactMarkdown from 'react-markdown';

const Card = styled.div`
  background-color: #2c2c2c;
  border: 1px solid #5f5f5f;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const Select = styled.select`
  background-color: #3a3a3a;
  color: white;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    background-color: #4a4a4a;
  }
`;

const SummaryText = styled.div`
  margin: 5px;
  text-align: justify;
  ul {
    margin: 5px 0;
    padding-left: 20px;
    text-align: left;
  }
  li {
    margin: 5px 0;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 10px 0 0;
`;

const Summarizer = ({ summary, sessionId, sectionSummaries = {}, setAnalysisData }) => {
  const [selectedSection, setSelectedSection] = useState('Entire Paper');
  const [currentSummary, setCurrentSummary] = useState(summary);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  const sections = [
    'Entire Paper',
    'Introduction',
    'Literature Review',
    'Methodology',
    'Results',
    'Conclusion',
  ];

  useEffect(() => {
    setCurrentSummary(summary);
    setSelectedSection('Entire Paper');
  }, [summary]);

  const handleSectionChange = async (e) => {
    const section = e.target.value;
    setSelectedSection(section);
    setError('');
    setLoading(true);

    if (!sessionId) {
      setError('No valid session ID. Please upload a PDF or select a valid history item.');
      setLoading(false);
      return;
    }

    try {
      if (sectionSummaries[section]) {
        setCurrentSummary(sectionSummaries[section]);
      } else if (section === 'Entire Paper') {
        setCurrentSummary(summary);
      } else {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/summarize-section`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ section, session_id: sessionId }),
        });

        if (!response.ok) {
          throw new Error((await response.json()).error || 'Unknown error');
        }

        const data = await response.json();
        const newSummary = data.summary || 'This section is not available in the paper.';

        setAnalysisData(prev => ({
          ...prev,
          sectionSummaries: {
            ...prev.sectionSummaries,
            [section]: newSummary,
          },
        }));

        setCurrentSummary(newSummary);
      }
    } catch (err) {
      setError(`Failed to fetch summary: ${err.message}`);
      console.error('Section summary error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Header>
        <Title>{selectedSection} Summary</Title>
        {summary !== 'No summary available' && sessionId ? (
          <Select value={selectedSection} onChange={handleSectionChange}>
            {sections.map(section => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </Select>
        ) : (
          <ErrorMessage>No valid session ID or summary available.</ErrorMessage>
        )}
        <CopyToClipboard text={currentSummary} />
      </Header>
      {loading ? (
        <SummaryText>Loading...</SummaryText>
      ) : (
        <SummaryText>
          <ReactMarkdown>{currentSummary}</ReactMarkdown>
        </SummaryText>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Card>
  );
};

export default Summarizer;