import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #2c2c2c;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Features = () => (
  <Card>
    <h3>Features</h3>
    <p>Analyze research papers with powerful insights.</p>
  </Card>
);

export default Features;