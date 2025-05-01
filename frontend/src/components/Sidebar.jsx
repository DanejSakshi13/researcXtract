import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: ${props => (props.open ? '250px' : '0')};
  background-color: #2c2c2c;
  color: white;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: ${props => (props.open ? '20px' : '0')};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  transition: width 0.3s;
  overflow-y: auto;
  overflow: hidden;
`;

const HistoryItem = styled.div`
  padding: 10px;
  margin: 5px 0;
  background-color: #3a3a3a;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #4a4a4a;
  }
`;

const Sidebar = ({ open, onSelectHistory }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/user-history', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setHistory(data.history || []))
      .catch(err => console.error('Error fetching history:', err));
  }, []);

  return (
    <SidebarContainer open={open}>
      <h3>Analysis History</h3>
      {history.map((item) => (
        <HistoryItem key={item._id || item.session_id} onClick={() => onSelectHistory(item)}>
          {item.analysis_data?.title || `Analysis ${item._id || item.session_id}`}
        </HistoryItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;




