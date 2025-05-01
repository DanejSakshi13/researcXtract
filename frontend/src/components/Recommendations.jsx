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

const RecommendationItem = styled.div`
  margin: 10px 0;
`;

const RecommendationTitle = styled.p`
  font-weight: 500;
  margin: 5px 0;
`;

const RecommendationMeta = styled.p`
  font-size: 0.9rem;
  margin: 5px 0;
  color: #aaaaaa;
`;

const RecommendationLink = styled.a`
  color: #1e90ff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Recommendations = ({ recommendations }) => {
  return (
    <Card>
      <Title>Recommended Papers</Title>
      {recommendations && recommendations.length > 0 ? (
        recommendations.map((rec, index) => (
          <RecommendationItem key={rec.arxiv_id}>
            <RecommendationTitle>
              {index + 1}. {rec.title}
            </RecommendationTitle>
            <RecommendationMeta>Date: {rec.published}</RecommendationMeta>
            <RecommendationLink href={rec.link} target="_blank" rel="noopener noreferrer">
              Link: {rec.link}
            </RecommendationLink>
          </RecommendationItem>
        ))
      ) : (
        <p>No recommendations available</p>
      )}
    </Card>
  );
};

export default Recommendations;