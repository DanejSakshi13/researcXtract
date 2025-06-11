// // import React, { createContext, useState } from 'react';

// // export const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [token, setToken] = useState(null);

// //   return (
// //     <AuthContext.Provider value={{ token, setToken }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };


// // AuthContext.jsx
// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem('token') || null);
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem('token', token);
//     } else {
//       localStorage.removeItem('token');
//     }
//     if (user) {
//       localStorage.setItem('user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('user');
//     }
//   }, [token, user]);

//   const login = async (email, password) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setToken(data.access_token);
//         setUser(data.user); // Store user details (email, name)

//         // Fetch latest user data to ensure consistency
//         const userResponse = await fetch('http://localhost:5000/api/user', {
//           headers: { 'Authorization': `Bearer ${data.access_token}` },
//         });
//         if (userResponse.ok) {
//           const userData = await userResponse.json();
//           setUser(userData.user); // Update with latest user data
//         } else {
//           console.error('Failed to fetch user data after login');
//         }
//         return true;
//       } else {
//         console.error('Login error:', data.error);
//         return false;
//       }
//     } catch (err) {
//       console.error('Login fetch error:', err);
//       return false;
//     }
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, setToken, user, setUser, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



// import React, { createContext, useState } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);

//   return (
//     <AuthContext.Provider value={{ token, setToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import API_URL from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.access_token);
        setUser(data.user); // Store user details (email, name)

        // Fetch latest user data to ensure consistency
        const userResponse = await fetch(`${API_URL}/user`, {
          headers: { 'Authorization': `Bearer ${data.access_token}` },
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData.user); // Update with latest user data
        } else {
          console.error('Failed to fetch user data after login');
        }
        return true;
      } else {
        console.error('Login error:', data.error);
        return false;
      }
    } catch (err) {
      console.error('Login fetch error:', err);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};