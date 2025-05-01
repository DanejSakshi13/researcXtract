import React from 'react';
import styled from 'styled-components';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  background-color: #2c2c2c;
  border: 1px solid #5f5f5f;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background-color: #d2ff72;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b8e65a;
  }
`;

const UploadText = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #1a1a1a;
`;

const UploadButton = ({ handleUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <UploadContainer>
      <UploadInput
        type="file"
        id="file-upload"
        accept=".pdf"
        onChange={handleFileChange}
      />
      <UploadLabel htmlFor="file-upload">
        <UploadText>Upload Your Research Paper & Unlock Powerful Insights Instantly!</UploadText>
      </UploadLabel>
    </UploadContainer>
  );
};

export default UploadButton;