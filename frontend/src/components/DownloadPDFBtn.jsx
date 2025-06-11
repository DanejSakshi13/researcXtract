


import React from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import API_URL from '../config';

const Button = styled.button`
  padding: 10px 20px;
  background-color: #d2ff72;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 10px;

  &:hover {
    background-color: #b8e65a;
  }
`;

const DownloadPDFBtn = ({ analysisData }) => {
  const { token } = useContext(AuthContext);

  const handleDownload = async () => {
    try {
      const response = await fetch(`${API_URL}/generate-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ analysis_data: analysisData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${analysisData.title || 'report'}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF download error:', err);
      alert(`Failed to download PDF: ${err.message}`);
    }
  };

  return (
    <Button onClick={handleDownload}>
      Download PDF
    </Button>
  );
};

export default DownloadPDFBtn;
