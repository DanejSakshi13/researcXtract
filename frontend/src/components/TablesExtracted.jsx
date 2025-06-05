// import React, { useState } from 'react';
// import styled from 'styled-components';
// // import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// // import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

// const CarouselContainer = styled.div`
//   display: flex;
//   align-items: center;
//   max-height: 400px;
//   margin: 10px 0;
// `;

// const ContentWrapper = styled.div`
//   flex: 1;
//   min-width: 0;
// `;

// const TableWrapper = styled.div`
//   overflow-x: auto;
//   overflow-y: auto;
//   max-height: 350px; /* Allow vertical scrolling within Card */
// `;

// const Table = styled.table`
//   width: 100%;
//   table-layout: auto; /* Dynamically size columns based on content */
//   border-collapse: collapse;
//   background-color: #3a3a3a;
// `;

// const Th = styled.th`
//   border: 1px solid #555;
//   padding: 8px;
//   text-align: left;
//   background-color: #4a4a4a;
//   overflow-wrap: break-word;
//   min-width: 50px; /* Minimum width for readability */
// `;

// const Td = styled.td`
//   border: 1px solid #555;
//   padding: 8px;
//   overflow-wrap: break-word;
//   min-width: 50px; /* Minimum width for readability */
// `;

// const Caption = styled.p`
//   font-style: italic;
//   margin: 5px 0;
// `;

// const Counter = styled.p`
//   font-size: 0.9rem;
//   color: #aaaaaa;
//   margin: 5px 0;
//   text-align: center;
// `;

// const ArrowButton = styled.button`
//   background-color: #3a3a3a;
//   border: none;
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   color: white;
//   opacity: 0.7;
//   &:hover {
//     opacity: 1;
//     background-color: #d2ff72;
//     color: black;
//   }
//   &:disabled {
//     opacity: 0.3;
//     cursor: not-allowed;
//   }
// `;

// const LeftArrow = styled(ArrowButton)`
//   margin-right: 10px;
//   align-self: center;
// `;

// const RightArrow = styled(ArrowButton)`
//   margin-left: 10px;
//   align-self: center;
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-size: 0.9rem;
// `;

// const TablesExtracted = ({ tables }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const isValidTable = (table) => {
//     return (
//       table &&
//       Array.isArray(table.rows) &&
//       table.rows.length > 0 &&
//       table.rows.every(row => Array.isArray(row) && row.length > 0)
//     );
//   };

//   const validTables = tables ? tables.filter(isValidTable) : [];
//   const totalTables = validTables.length;
//   const hasTables = totalTables > 0;

//   const handlePrev = () => {
//     setCurrentIndex(prev => (prev === 0 ? totalTables - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex(prev => (prev === totalTables - 1 ? 0 : prev + 1));
//   };

//   return (
//     <Card>
//       <Title>Extracted Tables</Title>
//       {!tables || tables.length === 0 ? (
//         <p>No tables available</p>
//       ) : (
//         <>
//           {hasTables ? (
//             <>
//               <CarouselContainer>
//                 {totalTables > 1 && (
//                   <LeftArrow onClick={handlePrev} disabled={currentIndex === 0}>
//                     {/* <ArrowBackIcon /> */}
//                      ←
//                   </LeftArrow>
//                 )}
//                 <ContentWrapper>
//                   <TableWrapper>
//                     <Caption>
//                       Table {currentIndex + 1} from Page {validTables[currentIndex].page}: {validTables[currentIndex].caption}
//                     </Caption>
//                     <Table>
//                       <tbody>
//                         {validTables[currentIndex].rows.map((row, rowIdx) => (
//                           <tr key={rowIdx}>
//                             {row.map((cell, cellIdx) => (
//                               rowIdx === 0 ? (
//                                 <Th key={cellIdx}>{cell}</Th>
//                               ) : (
//                                 <Td key={cellIdx}>{cell}</Td>
//                               )
//                             ))}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </Table>
//                   </TableWrapper>
//                   {totalTables > 1 && <Counter>Table {currentIndex + 1} of {totalTables}</Counter>}
//                 </ContentWrapper>
//                 {totalTables > 1 && (
//                   <RightArrow onClick={handleNext} disabled={currentIndex === totalTables - 1}>
//                     {/* <ArrowForwardIcon /> */}
//                     →
//                   </RightArrow>
//                 )}
//               </CarouselContainer>
//             </>
//           ) : (
//             <ErrorMessage>No valid tables available. Check console for details.</ErrorMessage>
//           )}
//           {tables.some(table => !isValidTable(table)) && (
//             <ErrorMessage>Some tables are malformed and were skipped.</ErrorMessage>
//           )}
//         </>
//       )}
//     </Card>
//   );
// };

// export default TablesExtracted;








import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Bar, Pie, Line } from 'react-chartjs-2'; // Import chart components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'; // Import Chart.js components

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Card = styled.div`
  background-color: #2c2c2c;
  border: 1px solid #5f5f5f;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Heading = styled.h3`
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
  max-height: 350px;
`;

const Table = styled.table`
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
  background-color: #3a3a3a;
`;

const Th = styled.th`
  border: 1px solid #555;
  padding: 8px;
  text-align: left;
  background-color: #4a4a4a;
  overflow-wrap: break-word;
  min-width: 50px;
`;

const Td = styled.td`
  border: 1px solid #555;
  padding: 8px;
  overflow-wrap: break-word;
  min-width: 50px;
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

const SelectWrapper = styled.div`
  margin-bottom: 10px;
  text-align: center;
`;

const VisualizationSelect = styled.select`
  padding: 5px;
  background-color: #3a3a3a;
  color: white;
  border: 1px solid #5f5f5f;
  border-radius: 5px;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #d2ff72;
  }
`;

const ChartWrapper = styled.div`
  max-height: 350px;
  overflow-y: auto;
  position: relative;
  width: 100%;
  height: 300px; /* Set a fixed height for the chart */
`;

const UnsupportedMessage = styled.p`
  color: #aaaaaa;
  font-style: italic;
  text-align: center;
`;

const TablesExtracted = ({ tables }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [validTables, setValidTables] = useState([]);
  const [visualizationTypes, setVisualizationTypes] = useState([]);

  const isValidTable = (table) => {
    return (
      table &&
      Array.isArray(table.rows) &&
      table.rows.length > 0 &&
      table.rows.every(row => Array.isArray(row) && row.length > 0)
    );
  };

  useEffect(() => {
    const newValidTables = tables ? tables.filter(isValidTable) : [];
    setValidTables(newValidTables);
    const newTotalTables = newValidTables.length;

    setVisualizationTypes(new Array(newTotalTables).fill('Table'));

    if (newTotalTables === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= newTotalTables) {
      setCurrentIndex(newTotalTables - 1);
    }
  }, [tables, currentIndex]);

  const totalTables = validTables.length;
  const hasTables = totalTables > 0;

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? totalTables - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === totalTables - 1 ? 0 : prev + 1));
  };

  const handleVisualizationChange = (index, value) => {
    const newVisualizationTypes = [...visualizationTypes];
    newVisualizationTypes[index] = value;
    setVisualizationTypes(newVisualizationTypes);
  };

  const getSuitableChartTypes = (table) => {
    if (!isValidTable(table)) return { suitableTypes: [], data: null };

    const { rows } = table;
    const header = rows[0];
    const dataRows = rows.slice(1);
    const numColumns = header.length;

    if (numColumns < 2 || dataRows.length === 0) {
      return { suitableTypes: [], data: null };
    }

    const columnTypes = header.map((_, colIdx) => {
      const columnData = dataRows.map(row => row[colIdx]);
      const isNumeric = columnData.every(cell => {
        const num = parseFloat(cell);
        return !isNaN(num) && cell !== '';
      });
      return isNumeric ? 'numeric' : 'categorical';
    });

    let suitableTypes = [];
    let chartData = null;

    if (numColumns === 2 && columnTypes[0] === 'categorical' && columnTypes[1] === 'numeric') {
      const labels = dataRows.map(row => row[0]);
      const values = dataRows.map(row => parseFloat(row[1])).filter(val => !isNaN(val));

      if (labels.length === values.length && values.length > 0) {
        suitableTypes = ['Bar', 'Pie'];

        chartData = {
          labels,
          datasets: [{
            label: header[1],
            data: values,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            borderWidth: 1,
          }],
        };
      }
    }

    if (columnTypes[0] === 'categorical') {
      const firstColumn = dataRows.map(row => row[0]);
      const isTimeLike = firstColumn.every(cell => {
        return /^\d{4}$/.test(cell) ||
               /^\d{4}-\d{2}$/.test(cell) ||
               /^\d{4}-\d{2}-\d{2}$/.test(cell);
      });

      if (isTimeLike && columnTypes.slice(1).every(type => type === 'numeric')) {
        const labels = firstColumn;
        const datasets = header.slice(1).map((colName, idx) => {
          const colIdx = idx + 1;
          const values = dataRows.map(row => parseFloat(row[colIdx])).filter(val => !isNaN(val));
          return {
            label: colName,
            data: values,
            fill: false,
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'][idx % 5],
            tension: 0.1,
          };
        });

        if (datasets.length > 0 && datasets[0].data.length === labels.length) {
          suitableTypes.push('Line');
          chartData = { labels, datasets };
        }
      }
    }

    if (numColumns > 2 && columnTypes[0] === 'categorical' && columnTypes.slice(1).every(type => type === 'numeric')) {
      const labels = dataRows.map(row => row[0]);
      const datasets = header.slice(1).map((colName, idx) => {
        const colIdx = idx + 1;
        const values = dataRows.map(row => parseFloat(row[colIdx])).filter(val => !isNaN(val));
        return {
          label: colName,
          data: values,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'][idx % 5],
          borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'][idx % 5],
          borderWidth: 1,
        };
      });

      if (datasets.length > 0 && datasets[0].data.length === labels.length) {
        suitableTypes.push('Bar');
        chartData = { labels, datasets };
      }
    }

    return { suitableTypes, data: chartData };
  };

  const renderVisualization = (table, index) => {
    if (!table) {
      return <UnsupportedMessage>No table data available at this index.</UnsupportedMessage>;
    }

    const vizType = visualizationTypes[index] || 'Table';
    const { suitableTypes, data } = getSuitableChartTypes(table);

    if (vizType === 'Table') {
      return (
        <TableWrapper>
          <Caption>
            Table {index + 1} from Page {table.page}: {table.caption}
          </Caption>
          <Table>
            <tbody>
              {table.rows.map((row, rowIdx) => (
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
      );
    }

    if (!suitableTypes.includes(vizType)) {
      return (
        <UnsupportedMessage>
          {`This table cannot be visualized as a ${vizType.toLowerCase()} chart. Suitable types: ${suitableTypes.length > 0 ? suitableTypes.join(', ') : 'None'}.`}
        </UnsupportedMessage>
      );
    }

    if (!data) {
      return <UnsupportedMessage>Error preparing chart data.</UnsupportedMessage>;
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { color: '#FFFFFF' } },
      },
      layout: {
        padding: 10,
      },
      scales: vizType === 'Pie' ? {} : {
        x: { ticks: { color: '#FFFFFF' }, grid: { color: '#555' } },
        y: { ticks: { color: '#FFFFFF' }, grid: { color: '#555' } },
      },
    };

    const chartDataWithBackground = {
      ...data,
      backgroundColor: '#3a3a3a', // Apply background color to the chart data
    };

    const ChartComponent = vizType === 'Bar' ? Bar : vizType === 'Pie' ? Pie : Line;

    return (
      <ChartWrapper>
        <Caption>
          Chart {index + 1} from Page {table.page}: {table.caption}
        </Caption>
        <ChartComponent data={chartDataWithBackground} options={chartOptions} />
      </ChartWrapper>
    );
  };

  return (
    <Card>
      <Heading>Extracted Tables</Heading>
      {!tables || tables.length === 0 ? (
        <p>No tables available</p>
      ) : (
        <>
          {hasTables ? (
            <>
              <SelectWrapper>
                <VisualizationSelect
                  value={visualizationTypes[currentIndex] || 'Table'}
                  onChange={(e) => handleVisualizationChange(currentIndex, e.target.value)}
                >
                  <option value="Table">Table</option>
                  <option value="Bar">Bar Chart</option>
                  <option value="Pie">Pie Chart</option>
                  <option value="Line">Line Chart</option>
                </VisualizationSelect>
              </SelectWrapper>
              <CarouselContainer>
                {totalTables > 1 && (
                  <LeftArrow onClick={handlePrev} disabled={currentIndex === 0}>
                    ←
                  </LeftArrow>
                )}
                <ContentWrapper>
                  {renderVisualization(validTables[currentIndex], currentIndex)}
                  {totalTables > 1 && <Counter>Table {currentIndex + 1} of {totalTables}</Counter>}
                </ContentWrapper>
                {totalTables > 1 && (
                  <RightArrow onClick={handleNext} disabled={currentIndex === totalTables - 1}>
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