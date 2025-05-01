import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #2c2c2c;
  border: 1px solid #5f5f5f;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const PaperTitle = ({ title }) => (
  <Card>
    <Title>{title || "No title available"}</Title>
  </Card>
);

export default PaperTitle;