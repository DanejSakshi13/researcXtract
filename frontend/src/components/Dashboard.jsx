// import React, { useState } from 'react';
// import styled from 'styled-components';
// import UploadButton from './UploadButton.jsx';
// import Features from './Features.jsx';
// import Summarizer from './Summarizer.jsx';
// import Keywords from './Keywords.jsx';
// import PaperTitle from './PaperTitle.jsx';
// import Author from './Author.jsx';
// import FiguresExtracted from './FiguresExtracted.jsx';
// import TablesExtracted from './TablesExtracted.jsx';
// import Citations from './Citations.jsx';
// import Recommendations from './Recommendations.jsx';
// import Graph from './Graph.jsx';
// import DownloadPDFBtn from './DownloadPDFBtn.jsx';
// import DownloadPPTBtn from './DownloadPPTBtn.jsx';
// import Chat from './Chat.jsx';

// const DashboardContainer = styled.div`
//   max-width: 80%;
//   margin-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "100px" : "100px")};
//   padding: 20px;
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-weight: 500;
// `;

// const Dashboard = ({ isSidebarOpen = false }) => {
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [analysisData, setAnalysisData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);

//   console.log('Dashboard rendering', { isSidebarOpen, uploadedFile, analysisData, loading, error, chatHistory });

//   const handleUpload = async (file) => {
//     setLoading(true);
//     setError('');
//     setAnalysisData(null);
//     setChatHistory([]); // Reset chat history for new PDF

//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       // Call main analysis, images, and tables endpoints
//       const [analysisResponse, imagesResponse, tablesResponse] = await Promise.all([
//         fetch(`${import.meta.env.VITE_API_BASE_URL}/api/analyze-pdf`, { method: 'POST', body: formData })
//           .catch(err => ({ ok: false, error: `Analysis fetch failed: ${err.message}` })),
//         fetch(`${import.meta.env.VITE_API_BASE_URL}/api/extract-images`, { method: 'POST', body: formData })
//           .catch(err => ({ ok: false, error: `Images fetch failed: ${err.message}` })),
//         fetch(`${import.meta.env.VITE_API_BASE_URL}/api/extract-tables`, { method: 'POST', body: formData })
//           .catch(err => ({ ok: false, error: `Tables fetch failed: ${err.message}` })),
//       ]);

//       // Collect errors and data
//       const errors = [];
//       const data = {
//         title: "Untitled",
//         authors: ["No authors found"],
//         summary: "No summary available",
//         keywords: [],
//         citations: [],
//         figures: [],
//         tables: [],
//         recommendations: [],
//         graphData: { nodes: [], edges: [] },
//         session_id: "",
//         sectionSummaries: {} // Initialize section summaries
//       };

//       // Process analysis response
//       if (analysisResponse.ok) {
//         const analysisData = await analysisResponse.json();
//         data.title = analysisData.title || "Untitled";
//         data.authors = analysisData.authors || ["No authors found"];
//         data.summary = analysisData.summary || "No summary available";
//         data.keywords = analysisData.keywords || [];
//         data.citations = analysisData.citations || [];
//         data.session_id = analysisData.session_id || "";
//       } else {
//         errors.push(analysisResponse.error || (await analysisResponse.json()).error);
//       }

//       // Process images response
//       if (imagesResponse.ok) {
//         const imagesData = await imagesResponse.json();
//         data.figures = imagesData.visuals || [];
//       } else {
//         errors.push(imagesResponse.error || (await imagesResponse.json()).error);
//       }

//       // Process tables response
//       if (tablesResponse.ok) {
//         const tablesData = await tablesResponse.json();
//         data.tables = tablesData.tables || [];
//       } else {
//         errors.push(tablesResponse.error || (await tablesResponse.json()).error);
//       }

//       // Call recommendations endpoint with keywords and summary
//       if (data.keywords.length > 0 || data.summary) {
//         const recommendationsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recommend`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ keywords: data.keywords, summary: data.summary }),
//         });

//         if (recommendationsResponse.ok) {
//           const recommendationsData = await recommendationsResponse.json();
//           data.recommendations = recommendationsData || [];
//         } else {
//           errors.push((await recommendationsResponse.json()).error);
//         }
//       } else {
//         errors.push("No keywords or summary available for recommendations");
//       }

//       // Set analysis data even if some calls failed
//       setAnalysisData(data);

//       // Set error if any API calls failed
//       if (errors.length > 0) {
//         setError(`Partial errors occurred: ${errors.join('; ')}`);
//         console.error('API errors:', errors);
//       }
//     } catch (err) {
//       setError('Error processing PDF: ' + err.message);
//       console.error('Upload error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <DashboardContainer $isSidebarOpen={isSidebarOpen}>
//       {console.log('Rendering Dashboard content')}
//       {loading && <p>Loading...</p>}
//       {error && <ErrorMessage>{error}</ErrorMessage>}
//       {!analysisData && !loading && (
//         <>
//           <h1>Paper Analysis Dashboard</h1>
//           <UploadButton setUploadedFile={setUploadedFile} handleUpload={handleUpload} />
//           <Features />
//         </>
//       )}
//       {analysisData && !loading && (
//         <>
//           <PaperTitle title={analysisData.title} />
//           <Author authors={analysisData.authors} />
//           <Summarizer
//             summary={analysisData.summary}
//             sessionId={analysisData.session_id}
//             sectionSummaries={analysisData.sectionSummaries}
//             setAnalysisData={setAnalysisData}
//           />
//           <Keywords keywords={analysisData.keywords} />
//           <FiguresExtracted figures={analysisData.figures} />
//           <TablesExtracted tables={analysisData.tables} />
//           <Citations citations={analysisData.citations} />
//           <Recommendations recommendations={analysisData.recommendations} />
//           <Graph data={analysisData.graphData} />
//           <Chat sessionId={analysisData.session_id} chatHistory={chatHistory} setChatHistory={setChatHistory} />
//           <DownloadPDFBtn />
//           <DownloadPPTBtn />
//         </>
//       )}
//     </DashboardContainer>
//   );
// };

// export default Dashboard;














// mongo
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import UploadButton from './UploadButton.jsx';
// import Features from './Features.jsx';
// import Summarizer from './Summarizer.jsx';
// import Keywords from './Keywords.jsx';
// import PaperTitle from './PaperTitle.jsx';
// import Author from './Author.jsx';
// import FiguresExtracted from './FiguresExtracted.jsx';
// import TablesExtracted from './TablesExtracted.jsx';
// import Citations from './Citations.jsx';
// import Recommendations from './Recommendations.jsx';
// import Graph from './Graph.jsx';
// import DownloadPDFBtn from './DownloadPDFBtn.jsx';
// import DownloadPPTBtn from './DownloadPPTBtn.jsx';
// import Chat from './Chat.jsx';
// import Sidebar from './Sidebar.jsx';

// const DashboardContainer = styled.div`
//   max-width: 80%;
//   margin-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "250px" : "0")};
//   padding: 20px;
//   transition: margin-left 0.3s;
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-weight: 500;
// `;

// const Dashboard = ({ isSidebarOpen = true }) => {
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [analysisData, setAnalysisData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [selectedHistory, setSelectedHistory] = useState(null);

//   console.log('Dashboard rendering', { isSidebarOpen, uploadedFile, analysisData, loading, error, chatHistory });

//   const handleUpload = async (file) => {
//     setLoading(true);
//     setError('');
//     setAnalysisData(null);
//     setChatHistory([]);
//     setSelectedHistory(null);

//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       const session_id = Date.now().toString();
//       formData.append('session_id', session_id);
//       const token = localStorage.getItem('token');

//       const [analysisResponse, imagesResponse, tablesResponse] = await Promise.all([
//         fetch('http://localhost:5000/api/analyze-pdf', { method: 'POST', body: formData, headers: { Authorization: `Bearer ${token}` } })
//           .catch(err => ({ ok: false, error: `Analysis fetch failed: ${err.message}` })),
//         fetch('http://localhost:5000/api/extract-images', { method: 'POST', body: formData, headers: { Authorization: `Bearer ${token}` } })
//           .catch(err => ({ ok: false, error: `Images fetch failed: ${err.message}` })),
//         fetch('http://localhost:5000/api/extract-tables', { method: 'POST', body: formData, headers: { Authorization: `Bearer ${token}` } })
//           .catch(err => ({ ok: false, error: `Tables fetch failed: ${err.message}` })),
//       ]);

//       const errors = [];
//       const data = {
//         title: "Untitled",
//         authors: ["No authors found"],
//         summary: "No summary available",
//         keywords: [],
//         citations: [],
//         figures: [],
//         tables: [],
//         recommendations: [],
//         graphData: { nodes: [], edges: [] },
//         session_id: session_id,
//         sectionSummaries: {}
//       };

//       if (analysisResponse.ok) {
//         const analysisData = await analysisResponse.json();
//         data.title = analysisData.title || "Untitled";
//         data.authors = analysisData.authors || ["No authors found"];
//         data.summary = analysisData.summary || "No summary available";
//         data.keywords = analysisData.keywords || [];
//         data.citations = analysisData.citations || [];
//         data.sectionSummaries = analysisData.sectionSummaries || {};
//         data.session_id = analysisData.session_id || session_id;
//       } else {
//         errors.push(analysisResponse.error || (await analysisResponse.json()).error);
//       }

//       if (imagesResponse.ok) {
//         const imagesData = await imagesResponse.json();
//         data.figures = imagesData.visuals || [];
//       } else {
//         errors.push(imagesResponse.error || (await imagesResponse.json()).error);
//       }

//       if (tablesResponse.ok) {
//         const tablesData = await tablesResponse.json();
//         data.tables = tablesData.tables || [];
//       } else {
//         errors.push(tablesResponse.error || (await tablesResponse.json()).error);
//       }

//       if (data.keywords.length > 0 || data.summary) {
//         const recommendationsResponse = await fetch('http://localhost:5000/api/recommend', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//           body: JSON.stringify({ keywords: data.keywords, summary: data.summary }),
//         });
//         if (recommendationsResponse.ok) {
//           const recommendationsData = await recommendationsResponse.json();
//           data.recommendations = recommendationsData || [];
//         } else {
//           errors.push((await recommendationsResponse.json()).error);
//         }
//       } else {
//         errors.push("No keywords or summary available for recommendations");
//       }

//       const saveResponse = await fetch('http://localhost:5000/api/paper-analysis', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ analysis_data: data })
//       });
//       if (!saveResponse.ok) {
//         const saveError = await saveResponse.json();
//         errors.push(`Save Analysis: ${saveError.error}`);
//       } else {
//         console.log('Analysis saved:', await saveResponse.json());
//       }

//       setAnalysisData(data);
//       if (errors.length > 0) {
//         setError(`Partial errors occurred: ${errors.join('; ')}`);
//         console.error('API errors:', errors);
//       }
//     } catch (err) {
//       setError('Error processing PDF: ' + err.message);
//       console.error('Upload error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelectHistory = (item) => {
//     setAnalysisData(item.analysis_data);
//     setChatHistory(item.chat_history || []);
//     setSelectedHistory(item);
//   };

//   return (
//     <>
//       <Sidebar onSelectHistory={handleSelectHistory} />
//       <DashboardContainer $isSidebarOpen={isSidebarOpen}>
//         {loading && <p>Loading...</p>}
//         {error && <ErrorMessage>{error}</ErrorMessage>}
//         {!analysisData && !loading && <p>Please select a history item or upload a new PDF.</p>}
//         {analysisData && !loading && (
//           <>
//             <PaperTitle title={analysisData.title} />
//             <Author authors={analysisData.authors} />
//             <Summarizer
//               summary={analysisData.summary}
//               sessionId={analysisData.session_id}
//               sectionSummaries={analysisData.sectionSummaries}
//               setAnalysisData={setAnalysisData}
//             />
//             <Keywords keywords={analysisData.keywords} />
//             <FiguresExtracted figures={analysisData.figures} />
//             <TablesExtracted tables={analysisData.tables} />
//             <Citations citations={analysisData.citations} />
//             <Recommendations recommendations={analysisData.recommendations} />
//             <Graph data={analysisData.graphData} />
//             <Chat sessionId={analysisData.session_id} chatHistory={chatHistory} setChatHistory={setChatHistory} />
//             <UploadButton setUploadedFile={setUploadedFile} handleUpload={handleUpload} />
//             <DownloadPDFBtn />
//             <DownloadPPTBtn />
//           </>
//         )}
//       </DashboardContainer>
//     </>
//   );
// };

// export default Dashboard;




// import React, { useState, useEffect, useContext } from 'react';
// import styled from 'styled-components';
// import UploadButton from './UploadButton.jsx';
// import PaperTitle from './PaperTitle.jsx';
// import Author from './Author.jsx';
// import Summarizer from './Summarizer.jsx';
// import Keywords from './Keywords.jsx';
// import FiguresExtracted from './FiguresExtracted.jsx';
// import TablesExtracted from './TablesExtracted.jsx';
// import Citations from './Citations.jsx';
// import Recommendations from './Recommendations.jsx';
// import Chat from './Chat.jsx';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const DashboardContainer = styled.div`
//   max-width: 75%;
//   margin-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "350px" : "0")};
//   padding: 20px;
//   transition: margin-left 0.3s;
//   min-height: 100vh;
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-weight: 500;
// `;

// const SidebarContainer = styled.div`
//   width: ${props => (props.open ? '250px' : '0')};
//   background-color: #2c2c2c;
//   color: white;
//   height: 100vh;
//   position: fixed;
//   top: 0;
//   left: 0;
//   padding: ${props => (props.open ? '20px' : '0')};
//   box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
//   transition: width 0.3s;
//   overflow: hidden;
//   overflow-y: auto; /* Enable vertical scrollbar when content overflows */
//   scrollbar-width: thin; /* For Firefox */
//   scrollbar-color: #4a4a4a #2c2c2c; /* For Firefox */
  
//   /* Custom scrollbar for WebKit browsers (Chrome, Safari) */
//   &::-webkit-scrollbar {
//     width: 8px;
//   }
  
//   &::-webkit-scrollbar-track {
//     background: #2c2c2c;
//   }
  
//   &::-webkit-scrollbar-thumb {
//     background: #4a4a4a;
//     border-radius: 4px;
//   }
  
//   &::-webkit-scrollbar-thumb:hover {
//     background: #5a5a5a;
//   }
// `;

// const ToggleButton = styled.button`
//   position: absolute;
//   top: 10px;
//   left: ${props => (props.open ? '250px' : '10px')};
//   z-index: 1;
//   background-color: #1e90ff;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   cursor: pointer;
//   &:hover {
//     background-color: #1c86ee;
//   }
// `;

// const UserName = styled.h3`
//   margin: 0 0 15px 0;
//   font-size: 1.2em;
//   text-align: center;
// `;

// const HistoryItem = styled.div`
//   padding: 10px;
//   margin: 5px 0;
//   background-color: #3a3a3a;
//   border-radius: 5px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   cursor: pointer;
//   &:hover {
//     background-color: #4a4a4a;
//   }
// `;

// const DeleteButton = styled.button`
//   background-color: #ff4444;
//   color: white;
//   border: none;
//   padding: 5px 10px;
//   border-radius: 4px;
//   cursor: pointer;
//   &:hover {
//     background-color: #cc0000;
//   }
// `;

// const SignOutButton = styled.button`
//   margin-top: 20px;
//   width: 100%;
//   background-color: #ff4444;
//   color: white;
//   border: none;
//   padding: 10px;
//   cursor: pointer;
//   &:hover {
//     background-color: #cc0000;
//   }
// `;

// const SidebarC = ({ open, onSelectHistory, history, onDeleteHistory, onSignOut }) => {
//   const { user } = useContext(AuthContext);
//   const displayName = user?.name || user?.email || 'Unknown User';

//   return (
//     <SidebarContainer open={open}>
//       <UserName>{displayName}</UserName>
//       <h2>History</h2>
//       <div>
//         {Array.isArray(history) && history.map((item, index) => (
//           <HistoryItem key={index} onClick={() => onSelectHistory(item)}>
//             {item.analysis_data?.title || `Paper ${index + 1}`}
//             <DeleteButton onClick={(e) => { e.stopPropagation(); onDeleteHistory(item._id); }}>
//               Delete
//             </DeleteButton>
//           </HistoryItem>
//         ))}
//       </div>
//       <SignOutButton onClick={onSignOut}>
//         Sign Out
//       </SignOutButton>
//     </SidebarContainer>
//   );
// };

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const { token, setToken, user } = useContext(AuthContext);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [analysisData, setAnalysisData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     if (!token) {
//       setError('No authentication token found. Please log in.');
//       navigate('/');
//       return;
//     }
//     fetch('http://localhost:5000/api/user-history', {
//       headers: { 'Authorization': `Bearer ${token}` },
//     })
//       .then(res => {
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         return res.json();
//       })
//       .then(data => {
//         console.log('History fetched:', data);
//         setHistory(data.history || []);
//       })
//       .catch(err => {
//         console.error('Error fetching history:', err);
//         setError(`Error fetching user history: ${err.message}`);
//       });
//   }, [token, navigate]);

//   const handleUpload = async (file) => {
//     setLoading(true);
//     setError('');
//     setAnalysisData(null);
  
//     if (!token) {
//       setError('No authentication token found. Please log in.');
//       setLoading(false);
//       navigate('/');
//       return;
//     }
  
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
  
//       const [analysisResponse, imagesResponse, tablesResponse] = await Promise.all([
//         fetch('http://localhost:5000/api/analyze-pdf', {
//           method: 'POST',
//           body: formData,
//           headers: { Authorization: `Bearer ${token}` },
//         }).catch(err => ({ ok: false, error: `Analysis fetch failed: ${err.message}` })),
//         fetch('http://localhost:5000/api/extract-images', {
//           method: 'POST',
//           body: formData,
//           headers: { Authorization: `Bearer ${token}` },
//         }).catch(err => ({ ok: false, error: `Images fetch failed: ${err.message}` })),
//         fetch('http://localhost:5000/api/extract-tables', {
//           method: 'POST',
//           body: formData,
//           headers: { Authorization: `Bearer ${token}` },
//         }).catch(err => ({ ok: false, error: `Tables fetch failed: ${err.message}` })),
//       ]);
  
//       const errors = [];
//       const data = {
//         title: "Untitled",
//         authors: ["No authors found"],
//         summary: "No summary available",
//         keywords: [],
//         citations: [],
//         figures: [],
//         tables: [],
//         recommendations: [],
//         sectionSummaries: {},
//         messages: [],
//         text: "", // Text will be populated from analysisResponse
//       };
  
//       if (analysisResponse.ok) {
//         const analysisData = await analysisResponse.json();
//         console.log('Received session_id from backend:', analysisData.session_id);
//         Object.assign(data, analysisData);
//       } else {
//         errors.push(analysisResponse.error || (await analysisResponse.json()).error || 'Unknown analysis error');
//       }
  
//       if (imagesResponse.ok) {
//         const imagesData = await imagesResponse.json();
//         data.figures = imagesData.visuals || [];
//       } else {
//         errors.push(imagesResponse.error || (await imagesResponse.json()).error || 'Unknown images error');
//       }
  
//       if (tablesResponse.ok) {
//         const tablesData = await tablesResponse.json();
//         data.tables = tablesData.tables || [];
//       } else {
//         errors.push(tablesResponse.error || (await tablesResponse.json()).error || 'Unknown tables error');
//       }
  
//       if (data.keywords.length > 0 || data.summary) {
//         try {
//           const recommendationsResponse = await fetch('http://localhost:5000/api/recommend', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//             body: JSON.stringify({ keywords: data.keywords, summary: data.summary }),
//           });
//           if (recommendationsResponse.ok) {
//             data.recommendations = await recommendationsResponse.json();
//           } else {
//             errors.push((await recommendationsResponse.json()).error || 'Unknown recommendations error');
//           }
//         } catch (err) {
//           errors.push(`Recommendations error: ${err.message}`);
//         }
//       }
  
//       try {
//         const saveResponse = await fetch('http://localhost:5000/api/paper-analysis', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//           body: JSON.stringify({ analysis_data: data }),
//         });
//         if (!saveResponse.ok) {
//           errors.push(`Save Analysis: ${(await saveResponse.json()).error || 'Unknown save error'}`);
//         }
//       } catch (err) {
//         errors.push(`Save error: ${err.message}`);
//       }
  
//       setAnalysisData(data);
//       console.log('Final analysis data set:', data);
  
//       try {
//         const historyResponse = await fetch('http://localhost:5000/api/user-history', {
//           headers: { 'Authorization': `Bearer ${token}` },
//         });
//         if (historyResponse.ok) {
//           const historyData = await historyResponse.json();
//           setHistory(historyData.history || []);
//         }
//       } catch (err) {
//         console.error('Error updating history after analysis:', err);
//       }
  
//       if (errors.length > 0) {
//         setError(`Partial errors occurred: ${errors.join('; ')}`);
//         console.error('API errors:', errors);
//       }
//     } catch (err) {
//       setError('Error processing PDF: ' + err.message);
//       console.error('Upload error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleHistorySelect = (item) => {
//     const selectedData = item.analysis_data || {};
//     const chatHistory = item.chat_history || [];
//     selectedData.title = selectedData.title || "Untitled";
//     selectedData.authors = selectedData.authors || ["No authors found"];
//     selectedData.summary = selectedData.summary || "No summary available";
//     selectedData.keywords = selectedData.keywords || [];
//     selectedData.citations = selectedData.citations || [];
//     selectedData.figures = selectedData.figures || [];
//     selectedData.tables = selectedData.tables || [];
//     selectedData.recommendations = selectedData.recommendations || [];
//     selectedData.sectionSummaries = selectedData.sectionSummaries || {};
//     selectedData.messages = chatHistory;
//     selectedData.session_id = item.session_id || selectedData.session_id || Date.now().toString();
//     selectedData.text = selectedData.text || ''; // Ensure text is included
//     setAnalysisData(selectedData);
//     console.log('Selected history item:', selectedData);
//   };

//   const handleDeleteHistory = async (id) => {
//     if (!token || !id) return;

//     try {
//       const response = await fetch(`http://localhost:5000/api/paper-analysis/${id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` },
//       });
//       if (response.ok) {
//         setHistory(prev => prev.filter(item => item._id !== id));
//         if (analysisData && analysisData.session_id === id) {
//           setAnalysisData(null);
//         }
//         console.log('History item deleted:', id);
//       } else {
//         const errorData = await response.json();
//         console.error('Delete error:', errorData.error);
//         setError(`Failed to delete history item: ${errorData.error}`);
//       }
//     } catch (err) {
//       console.error('Delete fetch error:', err);
//       setError(`Error deleting history item: ${err.message}`);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await fetch('http://localhost:5000/api/logout', {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` },
//       });
//     } catch (err) {
//       console.error('Logout error:', err);
//     }
//     setToken(null);
//     setAnalysisData(null);
//     setHistory([]);
//     navigate('/');
//   };

//   return (
//     <div>
//       <ToggleButton onClick={() => setSidebarOpen(!sidebarOpen)} open={sidebarOpen}>
//         {sidebarOpen ? 'Close' : 'Menu'}
//       </ToggleButton>
//       <SidebarC
//         open={sidebarOpen}
//         onSelectHistory={handleHistorySelect}
//         history={history}
//         onDeleteHistory={handleDeleteHistory}
//         onSignOut={handleSignOut}
//       />
//       <DashboardContainer $isSidebarOpen={sidebarOpen}>
//         <UploadButton handleUpload={handleUpload} />
//         {loading && <p>Loading...</p>}
//         {error && <ErrorMessage>{error}</ErrorMessage>}
//         {!analysisData && !loading && <p>Please upload a PDF or select a history item.</p>}
//         {analysisData && !loading && (
//           <div>
//             <PaperTitle title={analysisData.title || 'Untitled'} />
//             <Author authors={analysisData.authors || ['No authors found']} />
//             <Summarizer
//               summary={analysisData.summary || 'No summary available'}
//               sessionId={analysisData.session_id}
//               sectionSummaries={analysisData.sectionSummaries || {}}
//               setAnalysisData={setAnalysisData}
//             />
//             <Keywords keywords={analysisData.keywords || []} />
//             <FiguresExtracted figures={analysisData.figures || []} />
//             <TablesExtracted tables={analysisData.tables || []} />
//             <Citations citations={analysisData.citations || []} />
//             <Recommendations recommendations={analysisData.recommendations || []} />
//             <Chat sessionId={analysisData.session_id || ''} messages={analysisData.messages || []} />
//           </div>
//         )}
//       </DashboardContainer>
//     </div>
//   );
// };

// export default Dashboard;











// Dashboard.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import styled from 'styled-components';
// import UploadButton from './UploadButton.jsx';
// import PaperTitle from './PaperTitle.jsx';
// import Author from './Author.jsx';
// import Summarizer from './Summarizer.jsx';
// import Keywords from './Keywords.jsx';
// import TablesExtracted from './TablesExtracted.jsx';
// import Citations from './Citations.jsx';
// import Recommendations from './Recommendations.jsx';
// import Chat from './Chat.jsx';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
// import DownloadPDFBtn from './DownloadPDFBtn.jsx';
// import DownloadPPTBtn from './DownloadPPTBtn.jsx';

// const DashboardContainer = styled.div`
//   max-width: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "68%" : "90%")};
//   margin-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "350px" : "100px")};
//   padding: 20px;
//   transition: margin-left 0.3s;
//   min-height: 100vh;
//   background-color: transparent;
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-weight: 500;
// `;

// const SidebarContainer = styled.div`
//   width: ${props => (props.open ? '230px' : '0')};
//   background-color: #2c2c2c;
//   color: white;
//   height: 100vh;
//   position: fixed;
//   top: 0;
//   left: 0;
//   padding: ${props => (props.open ? '20px' : '0')};
//   box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
//   transition: width 0.3s;
//   overflow: hidden;
//   overflow-y: auto;
//   scrollbar-width: thin;
//   scrollbar-color: #4a4a4a #2c2c2c;
//   &::-webkit-scrollbar {
//     width: 8px;
//   }
//   &::-webkit-scrollbar-track {
//     background: #2c2c2c;
//   }
//   &::-webkit-scrollbar-thumb {
//     background: #4a4a4a;
//     border-radius: 4px;
//   }
//   &::-webkit-scrollbar-thumb:hover {
//     background: #5a5a5a;
//   }
// `;

// const ToggleButton = styled.button`
//   position: fixed;
//   top: 10px;
//   left: ${props => (props.open ? '250px' : '10px')};
//   z-index: 1;
//   background-color: #d2ff72;
//   color: #000000;
//   border: none;
//   padding: 10px 20px;
//   font-weight: bolder;
//   cursor: pointer;
//   &:hover {
//     background-color: #cfcfcf;
//   }
// `;

// const UserName = styled.h3`
//   margin: 0 0 15px 0;
//   font-size: 1.2em;
//   text-align: left;
//   color: #d2ff72;
// `;

// const HistoryItem = styled.div`
//   padding: 10px;
//   margin: 5px 0;
//   background-color: #3a3a3a;
//   border-radius: 5px;
//   display: flex;
//   font-size: 13px;
//   justify-content: space-between;
//   align-items: center;
//   cursor: pointer;
//   &:hover {
//     background-color: #4a4a4a;
//   }
// `;

// const DeleteButton = styled.button`
//   background-color: transparent;
//   color: #ff1d1d;
//   font-size: 13px;
//   border: none;
//   padding: 5px 10px;
//   border-radius: 100%;
//   cursor: pointer;
//   &:hover {
//     background-color: #383838;
//   }
// `;

// const SignOutButton = styled.button`
//   margin-top: 20px;
//   width: 100%;
//   background-color: #ff4444;
//   color: white;
//   border: none;
//   padding: 10px;
//   margin-bottom: 40px;
//   cursor: pointer;
//   &:hover {
//     background-color: #cc0000;
//   }
// `;

// const DownloadButtonsContainer = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-top: 20px;
// `;

// const SidebarC = ({ open, onSelectHistory, history, onDeleteHistory, onSignOut }) => {
//   const { user } = useContext(AuthContext);
//   const displayName = user?.name || user?.email || 'Unknown User';

//   return (
//     <SidebarContainer open={open}>
//       <UserName>{displayName}</UserName>
//       <h3>History</h3>
//       <div>
//         {Array.isArray(history) && history.map((item, index) => (
//           <HistoryItem key={item._id || index} onClick={() => onSelectHistory(item)}>
//             {item.analysis_data?.title || `Paper ${index + 1}`}
//             <DeleteButton onClick={(e) => { e.stopPropagation(); onDeleteHistory(item._id); }}>
//               <FontAwesomeIcon icon={faTrash} />
//             </DeleteButton>
//           </HistoryItem>
//         ))}
//       </div>
//       <SignOutButton onClick={onSignOut}>
//         Sign Out
//       </SignOutButton>
//     </SidebarContainer>
//   );
// };

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const { token, setToken, user, setUser } = useContext(AuthContext);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [analysisData, setAnalysisData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     if (!token) {
//       setError('No authentication token found. Please log in.');
//       navigate('/');
//       return;
//     }
//     fetch('http://localhost:5000/api/user-history', {
//       headers: { 'Authorization': `Bearer ${token}` },
//     })
//       .then(res => {
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         return res.json();
//       })
//       .then(data => {
//         console.log('History fetched:', data);
//         setHistory(data.history || []);
//       })
//       .catch(err => {
//         console.error('Error fetching history:', err);
//         setError(`Error fetching user history: ${err.message}`);
//       });
//   }, [token, navigate]);

//   const handleUpload = async (file) => {
//     setLoading(true);
//     setError('');
//     setAnalysisData(null);

//     if (!token) {
//       setError('No authentication token found. Please log in.');
//       setLoading(false);
//       navigate('/');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       // Fetch analysis and tables only
//       const [analysisResponse, tablesResponse] = await Promise.all([
//         fetch('http://localhost:5000/api/analyze-pdf', {
//           method: 'POST',
//           body: formData,
//           headers: { Authorization: `Bearer ${token}` },
//         }).catch(err => ({ ok: false, error: `Analysis fetch failed: ${err.message}` })),
//         fetch('http://localhost:5000/api/extract-tables', {
//           method: 'POST',
//           body: formData,
//           headers: { Authorization: `Bearer ${token}` },
//         }).catch(err => ({ ok: false, error: `Tables fetch failed: ${err.message}` })),
//       ]);

//       const errors = [];
//       const data = {
//         title: "Untitled",
//         authors: ["No authors found"],
//         summary: "No summary available",
//         keywords: [],
//         citations: [],
//         tables: [],
//         recommendations: [],
//         sectionSummaries: {},
//         messages: [],
//         text: "",
//         session_id: null,
//       };

//       if (analysisResponse.ok) {
//         const analysisData = await analysisResponse.json();
//         console.log('Received session_id from backend:', analysisData.session_id);
//         Object.assign(data, analysisData);
//       } else {
//         const errorData = await analysisResponse.json().catch(() => ({ error: 'Unknown analysis error' }));
//         errors.push(analysisResponse.error || errorData.error);
//       }

//       if (tablesResponse.ok) {
//         const tablesData = await tablesResponse.json();
//         data.tables = tablesData.tables || [];
//       } else {
//         const errorData = await tablesResponse.json().catch(() => ({ error: 'Unknown tables error' }));
//         errors.push(tablesResponse.error || errorData.error);
//       }

//       if (data.keywords.length > 0 || data.summary) {
//         try {
//           const recommendationsResponse = await fetch('http://localhost:5000/api/recommend', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//             body: JSON.stringify({ keywords: data.keywords, summary: data.summary }),
//           });
//           if (recommendationsResponse.ok) {
//             data.recommendations = await recommendationsResponse.json();
//           } else {
//             const errorData = await recommendationsResponse.json().catch(() => ({ error: 'Unknown recommendations error' }));
//             errors.push(errorData.error);
//           }
//         } catch (err) {
//           errors.push(`Recommendations error: ${err.message}`);
//         }
//       }

//       try {
//         const saveResponse = await fetch('http://localhost:5000/api/paper-analysis', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//           body: JSON.stringify({ analysis_data: data }),
//         });
//         if (!saveResponse.ok) {
//           const errorData = await saveResponse.json().catch(() => ({ error: 'Unknown save error' }));
//           errors.push(`Save Analysis: ${errorData.error}`);
//         }
//       } catch (err) {
//         errors.push(`Save error: ${err.message}`);
//       }

//       setAnalysisData(data);
//       console.log('Final analysis data set:', data);

//       try {
//         const historyResponse = await fetch('http://localhost:5000/api/user-history', {
//           headers: { 'Authorization': `Bearer ${token}` },
//         });
//         if (historyResponse.ok) {
//           const historyData = await historyResponse.json();
//           setHistory(historyData.history || []);
//         }
//       } catch (err) {
//         console.error('Error updating history after analysis:', err);
//       }

//       if (errors.length > 0) {
//         setError(`Partial errors occurred: ${errors.join('; ')}`);
//         console.error('API errors:', errors);
//       }
//     } catch (err) {
//       setError('Error processing PDF: ' + err.message);
//       console.error('Upload error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleHistorySelect = (item) => {
//     const selectedData = item.analysis_data || {};
//     const chatHistory = item.chat_history || [];
//     selectedData.title = selectedData.title || "Untitled";
//     selectedData.authors = selectedData.authors || ["No authors found"];
//     selectedData.summary = selectedData.summary || "No summary available";
//     selectedData.keywords = selectedData.keywords || [];
//     selectedData.citations = selectedData.citations || [];
//     selectedData.tables = selectedData.tables || [];
//     selectedData.recommendations = selectedData.recommendations || [];
//     selectedData.sectionSummaries = selectedData.sectionSummaries || {};
//     selectedData.text = selectedData.text || '';
//     selectedData.session_id = item.session_id || selectedData.session_id;
//     selectedData.messages = Array.isArray(chatHistory) ? chatHistory.map(msg => ({
//       user: msg.user || '',
//       assistant: msg.assistant || ''
//     })) : [];
//     console.log('Selected history item:', selectedData);
//     setAnalysisData(selectedData);
//   };

//   const handleDeleteHistory = async (id) => {
//     if (!token || !id) return;

//     try {
//       const response = await fetch(`http://localhost:5000/api/paper-analysis/${id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` },
//       });
//       if (response.ok) {
//         setHistory(prev => prev.filter(item => item._id !== id));
//         if (analysisData && analysisData.session_id === id) {
//           setAnalysisData(null);
//         }
//         console.log('History item deleted:', id);
//       } else {
//         const errorData = await response.json();
//         console.error('Delete error:', errorData.error);
//         setError(`Failed to delete history item: ${errorData.error}`);
//       }
//     } catch (err) {
//       console.error('Delete fetch error:', err);
//       setError(`Error deleting history item: ${err.message}`);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await fetch('http://localhost:5000/api/logout', {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` },
//       });
//     } catch (err) {
//       console.error('Logout error:', err);
//     }
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem('token'); // Explicitly clear
//     localStorage.removeItem('user'); // Explicitly clear
//     setAnalysisData(null);
//     setHistory([]);
//     navigate('/');
//   };

//   return (
//     <div>
//       <ToggleButton onClick={() => setSidebarOpen(!sidebarOpen)} open={sidebarOpen}>
//         <FontAwesomeIcon icon={sidebarOpen ? faArrowLeft : faArrowRight} />
//       </ToggleButton>
//       <SidebarC
//         open={sidebarOpen}
//         onSelectHistory={handleHistorySelect}
//         history={history}
//         onDeleteHistory={handleDeleteHistory}
//         onSignOut={handleSignOut}
//       />
//       <DashboardContainer $isSidebarOpen={sidebarOpen}>
//         <UploadButton handleUpload={handleUpload} />
//         {loading && <p>Loading...</p>}
//         {error && <ErrorMessage>{error}</ErrorMessage>}
//         {!analysisData && !loading && <p>Please upload a PDF or select a history item.</p>}
//         {analysisData && !loading && (
//           <div>
//             <PaperTitle title={analysisData.title || 'Untitled'} />
//             <Author authors={analysisData.authors || ['No authors found']} />
//             <Summarizer
//               summary={analysisData.summary || 'No summary available'}
//               sessionId={analysisData.session_id}
//               sectionSummaries={analysisData.sectionSummaries || {}}
//               setAnalysisData={setAnalysisData}
//             />
//             <Keywords keywords={analysisData.keywords || []} />
//             <TablesExtracted tables={analysisData.tables || []} />
//             <Citations citations={analysisData.citations || []} />
//             <Recommendations recommendations={analysisData.recommendations || []} />
//             <Chat sessionId={analysisData.session_id || ''} messages={analysisData.messages || []} />
//             {/* <DownloadButtonsContainer>
//               <DownloadPDFBtn analysisData={analysisData} />
//               <DownloadPPTBtn analysisData={analysisData} />
//             </DownloadButtonsContainer> */}
//           </div>
//         )}
//       </DashboardContainer>
//     </div>
//   );
// };

// export default Dashboard;





























import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import UploadButton from './UploadButton.jsx';
import PaperTitle from './PaperTitle.jsx';
import Author from './Author.jsx';
import Summarizer from './Summarizer.jsx';
import Keywords from './Keywords.jsx';
import TablesExtracted from './TablesExtracted.jsx';
import Citations from './Citations.jsx';
import Recommendations from './Recommendations.jsx';
import Chat from './Chat.jsx';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import DownloadPDFBtn from './DownloadPDFBtn.jsx';
import DownloadPPTBtn from './DownloadPPTBtn.jsx';

const DashboardContainer = styled.div`
  max-width: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "68%" : "90%")};
  margin-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "350px" : "100px")};
  padding: 20px;
  transition: margin-left 0.3s;
  min-height: 100vh;
  background-color: transparent;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: 500;
`;

const SidebarContainer = styled.div`
  width: ${props => (props.open ? '230px' : '0')};
  background-color: #2c2c2c;
  color: white;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: ${props => (props.open ? '20px' : '0')};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  transition: width 0.3s;
  overflow: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #4a4a4a #2c2c2c;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #2c2c2c;
  }
  &::-webkit-scrollbar-thumb {
    background: #4a4a4a;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #5a5a5a;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 10px;
  left: ${props => (props.open ? '250px' : '10px')};
  z-index: 1;
  background-color: #d2ff72;
  color: #000000;
  border: none;
  padding: 10px 20px;
  font-weight: bolder;
  cursor: pointer;
  &:hover {
    background-color: #cfcfcf;
  }
`;

const UserName = styled.h3`
  margin: 0 0 15px 0;
  font-size: 1.2em;
  text-align: left;
  color: #d2ff72;
`;

const HistoryItem = styled.div`
  padding: 10px;
  margin: 5px 0;
  background-color: #3a3a3a;
  border-radius: 5px;
  display: flex;
  font-size: 13px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #4a4a4a;
  }
`;

const DeleteButton = styled.button`
  background-color: transparent;
  color: #ff1d1d;
  font-size: 13px;
  border: none;
  padding: 5px 10px;
  border-radius: 100%;
  cursor: pointer;
  &:hover {
    background-color: #383838;
  }
`;

const SignOutButton = styled.button`
  margin-top: 20px;
  width: 100%;
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 10px;
  margin-bottom: 40px;
  cursor: pointer;
  &:hover {
    background-color: #cc0000;
  }
`;

const DownloadButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const SidebarC = ({ open, onSelectHistory, history, onDeleteHistory, onSignOut }) => {
  const { user } = useContext(AuthContext);
  const displayName = user?.name || user?.email || 'Unknown User';

  return (
    <SidebarContainer open={open}>
      <UserName>{displayName}</UserName>
      <h3>History</h3>
      <div>
        {Array.isArray(history) && history.map((item, index) => (
          <HistoryItem key={item._id || index} onClick={() => onSelectHistory(item)}>
            {item.analysis_data?.title || `Paper ${index + 1}`}
            <DeleteButton onClick={(e) => { e.stopPropagation(); onDeleteHistory(item._id); }}>
              <FontAwesomeIcon icon={faTrash} />
            </DeleteButton>
          </HistoryItem>
        ))}
      </div>
      <SignOutButton onClick={onSignOut}>
        Sign Out
      </SignOutButton>
    </SidebarContainer>
  );
};


  const Dashboard = () => {
    const navigate = useNavigate();
    const { token, setToken, user, setUser } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [analysisData, setAnalysisData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!token) {
      setError('No authentication token found. Please log in.');
      navigate('/');
      return;
    }
    fetch('http://localhost:5000/api/user-history', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('History fetched:', data);
        setHistory(data.history || []);
      })
      .catch(err => {
        console.error('Error fetching history:', err);
        setError(`Error fetching user history: ${err.message}`);
      });
  }, [token, navigate]);

  const handleUpload = async (file) => {
    setLoading(true);
    setError('');
    setAnalysisData(null);

    if (!token) {
      setError('No authentication token found. Please log in.');
      setLoading(false);
      navigate('/');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Fetch analysis and tables only
      const [analysisResponse, tablesResponse] = await Promise.all([
        fetch('http://localhost:5000/api/analyze-pdf', {
          method: 'POST',
          body: formData,
          headers: { Authorization: `Bearer ${token}` },
        }).catch(err => ({ ok: false, error: `Analysis fetch failed: ${err.message}` })),
        fetch('http://localhost:5000/api/extract-tables', {
          method: 'POST',
          body: formData,
          headers: { Authorization: `Bearer ${token}` },
        }).catch(err => ({ ok: false, error: `Tables fetch failed: ${err.message}` })),
      ]);

      const errors = [];
      const data = {
        title: "Untitled",
        authors: ["No authors found"],
        summary: "No summary available",
        keywords: [],
        citations: [],
        tables: [],
        recommendations: [],
        sectionSummaries: {},
        messages: [],
        text: "",
        session_id: null,
      };

      if (analysisResponse.ok) {
        const analysisData = await analysisResponse.json();
        console.log('Received session_id from backend:', analysisData.session_id);
        Object.assign(data, analysisData);
      } else {
        const errorData = await analysisResponse.json().catch(() => ({ error: 'Unknown analysis error' }));
        errors.push(analysisResponse.error || errorData.error);
      }

      if (tablesResponse.ok) {
        const tablesData = await tablesResponse.json();
        data.tables = tablesData.tables || [];
      } else {
        const errorData = await tablesResponse.json().catch(() => ({ error: 'Unknown tables error' }));
        errors.push(tablesResponse.error || errorData.error);
      }

      if (data.keywords.length > 0 || data.summary) {
        try {
          const recommendationsResponse = await fetch('http://localhost:5000/api/recommend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ keywords: data.keywords, summary: data.summary }),
          });
          if (recommendationsResponse.ok) {
            data.recommendations = await recommendationsResponse.json();
          } else {
            const errorData = await recommendationsResponse.json().catch(() => ({ error: 'Unknown recommendations error' }));
            errors.push(errorData.error);
          }
        } catch (err) {
          errors.push(`Recommendations error: ${err.message}`);
        }
      }

      try {
        const saveResponse = await fetch('http://localhost:5000/api/paper-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ analysis_data: data }),
        });
        if (!saveResponse.ok) {
          const errorData = await saveResponse.json().catch(() => ({ error: 'Unknown save error' }));
          errors.push(`Save Analysis: ${errorData.error}`);
        }
      } catch (err) {
        errors.push(`Save error: ${err.message}`);
      }

      setAnalysisData(data);
      console.log('Final analysis data set:', data);

      try {
        const historyResponse = await fetch('http://localhost:5000/api/user-history', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (historyResponse.ok) {
          const historyData = await historyResponse.json();
          setHistory(historyData.history || []);
        }
      } catch (err) {
        console.error('Error updating history after analysis:', err);
      }

      if (errors.length > 0) {
        setError(`Partial errors occurred: ${errors.join('; ')}`);
        console.error('API errors:', errors);
      }
    } catch (err) {
      setError('Error processing PDF: ' + err.message);
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (item) => {
    const selectedData = item.analysis_data || {};
    const chatHistory = item.chat_history || [];
    selectedData.title = selectedData.title || "Untitled";
    selectedData.authors = selectedData.authors || ["No authors found"];
    selectedData.summary = selectedData.summary || "No summary available";
    selectedData.keywords = selectedData.keywords || [];
    selectedData.citations = selectedData.citations || [];
    selectedData.tables = selectedData.tables || [];
    selectedData.recommendations = selectedData.recommendations || [];
    selectedData.sectionSummaries = selectedData.sectionSummaries || {};
    selectedData.text = selectedData.text || '';
    selectedData.session_id = item.session_id || selectedData.session_id;
    selectedData.messages = Array.isArray(chatHistory) ? chatHistory.map(msg => ({
      user: msg.user || '',
      assistant: msg.assistant || ''
    })) : [];
    console.log('Selected history item:', selectedData);
    setAnalysisData(selectedData);
  };

  const handleDeleteHistory = async (id) => {
    if (!token || !id) return;

    try {
      const response = await fetch(`http://localhost:5000/api/paper-analysis/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        setHistory(prev => prev.filter(item => item._id !== id));
        if (analysisData && analysisData.session_id === id) {
          setAnalysisData(null);
        }
        console.log('History item deleted:', id);
      } else {
        const errorData = await response.json();
        console.error('Delete error:', errorData.error);
        setError(`Failed to delete history item: ${errorData.error}`);
      }
    } catch (err) {
      console.error('Delete fetch error:', err);
      setError(`Error deleting history item: ${err.message}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAnalysisData(null);
    setHistory([]);
    navigate('/');
  };

  return (
    <div>
      <ToggleButton onClick={() => setSidebarOpen(!sidebarOpen)} open={sidebarOpen}>
        <FontAwesomeIcon icon={sidebarOpen ? faArrowLeft : faArrowRight} />
      </ToggleButton>
      <SidebarC
        open={sidebarOpen}
        onSelectHistory={handleHistorySelect}
        history={history}
        onDeleteHistory={handleDeleteHistory}
        onSignOut={handleSignOut}
      />
      <DashboardContainer $isSidebarOpen={sidebarOpen}>
        <UploadButton handleUpload={handleUpload} />
        {loading && <p>Loading...</p>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!analysisData && !loading && <p>Please upload a PDF or select a history item.</p>}
        {analysisData && !loading && (
          <div>
            <PaperTitle title={analysisData.title || 'Untitled'} />
            <Author authors={analysisData.authors || ['No authors found']} />
            <Summarizer
              summary={analysisData.summary || 'No summary available'}
              sessionId={analysisData.session_id}
              sectionSummaries={analysisData.sectionSummaries || {}}
              setAnalysisData={setAnalysisData}
            />
            <Keywords keywords={analysisData.keywords || []} />
            <TablesExtracted tables={analysisData.tables || []} />
            <Citations citations={analysisData.citations || []} />
            <Recommendations recommendations={analysisData.recommendations || []} />
            <Chat sessionId={analysisData.session_id || ''} messages={analysisData.messages || []} />
            <DownloadButtonsContainer>
              <DownloadPDFBtn analysisData={analysisData} />
              <DownloadPPTBtn analysisData={analysisData} />
            </DownloadButtonsContainer>
          </div>
        )}
      </DashboardContainer>
    </div>
  );
};

export default Dashboard;
