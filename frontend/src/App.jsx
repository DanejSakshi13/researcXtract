// import React from 'react';
// import Dashboard from './components/Dashboard.jsx';

// function App() {
//   return <Dashboard isSidebarOpen={false} />;
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;