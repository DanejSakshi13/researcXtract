import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #2c2c2c;
  border: 1px solid #5f5f5f;
  
  padding: 20px;
  border-radius: 8px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.4rem;
  color: #d2ff72;
  padding-left: 1%;
`;

const SectionHeading = styled.h2`
  margin: 2px 0 10px;
  font-size: 1.2rem;
  color: white;
`;

const PaperTitle = ({ title }) => (
  <Card>
   <SectionHeading>Title:  </SectionHeading> 
    <Title>{title || "No title available"}</Title>
  </Card>
);

export default PaperTitle;