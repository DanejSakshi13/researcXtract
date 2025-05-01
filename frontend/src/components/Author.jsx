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

const Title = styled.h3`
  margin: 0 0 10px;
  font-size: 1.2rem;
`;

const AuthorList = styled.div`  /* Changed from ul to div */
color: #555;
font-size:0.80rem;
display: flex;            /* Use flexbox for horizontal layout */
flex-wrap: wrap;          /* Allow wrapping if authors exceed container width */
gap: 15px;                /* Space between authors */
padding: 0;
`;

const AuthorItem = styled.span`  /* Changed from li to span */
color: #ffffff;     
border: 0.1px #cacaca solid;
padding: 5px;
border-radius: 5px;

`;

const Author = ({ authors }) => (
  <Card>
    <Title>Authors</Title>
    <AuthorList>
      {authors && authors.length > 0 ? (
        authors.map((author, index) => (
          <AuthorItem key={index}>{author}</AuthorItem>
        ))
      ) : (
        <p>No authors available</p>
      )}
    </AuthorList>
  </Card>
);

export default Author;