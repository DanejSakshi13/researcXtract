import React, { useState } from 'react';
import styled from 'styled-components';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  max-height: 400px;
  margin: 10px 0;
`;

const ContentWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  max-height: 350px; /* Allow vertical scrolling within Card */
`;

const Table = styled.table`
  width: 100%;
  table-layout: auto; /* Dynamically size columns based on content */
  border-collapse: collapse;
  background-color: #3a3a3a;
`;

const Th = styled.th`
  border: 1px solid #555;
  padding: 8px;
  text-align: left;
  background-color: #4a4a4a;
  overflow-wrap: break-word;
  min-width: 50px; /* Minimum width for readability */
`;

const Td = styled.td`
  border: 1px solid #555;
  padding: 8px;
  overflow-wrap: break-word;
  min-width: 50px; /* Minimum width for readability */
`;

const Caption = styled.p`
  font-style: italic;
  margin: 5px 0;
`;

const Counter = styled.p`
  font-size: 0.9rem;
  color: #aaaaaa;
  margin: 5px 0;
  text-align: center;
`;

const ArrowButton = styled.button`
  background-color: #3a3a3a;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  opacity: 0.7;
  &:hover {
    opacity: 1;
    background-color: #d2ff72;
    color: black;
  }
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const LeftArrow = styled(ArrowButton)`
  margin-right: 10px;
  align-self: center;
`;

const RightArrow = styled(ArrowButton)`
  margin-left: 10px;
  align-self: center;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const TablesExtracted = ({ tables }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isValidTable = (table) => {
    return (
      table &&
      Array.isArray(table.rows) &&
      table.rows.length > 0 &&
      table.rows.every(row => Array.isArray(row) && row.length > 0)
    );
  };

  const validTables = tables ? tables.filter(isValidTable) : [];
  const totalTables = validTables.length;
  const hasTables = totalTables > 0;

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? totalTables - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === totalTables - 1 ? 0 : prev + 1));
  };

  return (
    <Card>
      <Title>Extracted Tables</Title>
      {!tables || tables.length === 0 ? (
        <p>No tables available</p>
      ) : (
        <>
          {hasTables ? (
            <>
              <CarouselContainer>
                {totalTables > 1 && (
                  <LeftArrow onClick={handlePrev} disabled={currentIndex === 0}>
                    {/* <ArrowBackIcon /> */}
                     ←
                  </LeftArrow>
                )}
                <ContentWrapper>
                  <TableWrapper>
                    <Caption>
                      Table {currentIndex + 1} from Page {validTables[currentIndex].page}: {validTables[currentIndex].caption}
                    </Caption>
                    <Table>
                      <tbody>
                        {validTables[currentIndex].rows.map((row, rowIdx) => (
                          <tr key={rowIdx}>
                            {row.map((cell, cellIdx) => (
                              rowIdx === 0 ? (
                                <Th key={cellIdx}>{cell}</Th>
                              ) : (
                                <Td key={cellIdx}>{cell}</Td>
                              )
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </TableWrapper>
                  {totalTables > 1 && <Counter>Table {currentIndex + 1} of {totalTables}</Counter>}
                </ContentWrapper>
                {totalTables > 1 && (
                  <RightArrow onClick={handleNext} disabled={currentIndex === totalTables - 1}>
                    {/* <ArrowForwardIcon /> */}
                    →
                  </RightArrow>
                )}
              </CarouselContainer>
            </>
          ) : (
            <ErrorMessage>No valid tables available. Check console for details.</ErrorMessage>
          )}
          {tables.some(table => !isValidTable(table)) && (
            <ErrorMessage>Some tables are malformed and were skipped.</ErrorMessage>
          )}
        </>
      )}
    </Card>
  );
};

export default TablesExtracted;