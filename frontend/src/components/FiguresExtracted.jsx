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
  max-width: calc(100% - 100px); /* Account for arrows (40px each) + margins (10px each) */
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Prevent image overflow */
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 350px;
  object-fit: contain;
  border-radius: 4px;
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
    background-color: #1e90ff;
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

const FiguresExtracted = ({ figures }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isValidBase64 = (str) => {
    try {
      return str && typeof str === 'string' && str.length > 0 && !str.includes(' ') && btoa(atob(str)) === str;
    } catch {
      return false;
    }
  };

  const getImageSrc = (base64, type) => {
    if (!base64 || !isValidBase64(base64)) {
      console.log(`Invalid base64: length=${base64?.length}, type=${type}`); // Debug log
      return null;
    }
    const mimeMap = {
      'jpeg': 'image/jpeg',
      'png': 'image/png'
    };
    const mime = mimeMap[type] || 'image/jpeg'; // Default to JPEG
    return `data:${mime};base64,${base64}`;
  };

  const handleImageError = (e, index, base64, type) => {
    console.error(`Failed to load image ${index + 1} (${type}):`, e);
    console.log(`Base64 length: ${base64?.length}, Valid: ${isValidBase64(base64)}, Type: ${type}`);
  };

  const validFigures = figures ? figures.filter(figure => getImageSrc(figure.image, figure.type)) : [];
  const totalFigures = validFigures.length;
  const hasFigures = totalFigures > 0;

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? totalFigures - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === totalTables - 1 ? 0 : prev + 1));
  };

  console.log('FiguresExtracted props:', figures); // Debug log

  return (
    <Card>
      <Title>Extracted Figures</Title>
      {!figures || figures.length === 0 ? (
        <p>No figures available</p>
      ) : (
        <>
          {hasFigures ? (
            <>
              <CarouselContainer>
                {totalFigures > 1 && (
                  <LeftArrow onClick={handlePrev} disabled={currentIndex === 0}>
                    {/* <ArrowBackIcon /> */}
                  </LeftArrow>
                )}
                <ContentWrapper>
                  {getImageSrc(validFigures[currentIndex].image, validFigures[currentIndex].type) ? (
                    <Image
                      src={getImageSrc(validFigures[currentIndex].image, validFigures[currentIndex].type)}
                      alt={`Figure ${currentIndex + 1}`}
                      onError={(e) => handleImageError(e, currentIndex, validFigures[currentIndex].image, validFigures[currentIndex].type)}
                    />
                  ) : (
                    <ErrorMessage>
                      Invalid or unsupported image data for Figure {currentIndex + 1}. Type: {validFigures[currentIndex].type || 'unknown'}.
                    </ErrorMessage>
                  )}
                </ContentWrapper>
                {totalFigures > 1 && (
                  <RightArrow onClick={handleNext} disabled={currentIndex === totalFigures - 1}>
                    {/* <ArrowForwardIcon /> */}
                  </RightArrow>
                )}
              </CarouselContainer>
              {totalFigures > 1 && <Counter>Figure {currentIndex + 1} of {totalFigures}</Counter>}
            </>
          ) : (
            <ErrorMessage>No valid figures available. Check console for details.</ErrorMessage>
          )}
          {figures.some(figure => !getImageSrc(figure.image, figure.type)) && (
            <ErrorMessage>Some figures are invalid and were skipped.</ErrorMessage>
          )}
        </>
      )}
    </Card>
  );
};

export default FiguresExtracted;