// // Home.jsx
// import React, { useState, useContext } from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const HomeContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background-color: rgb(37,37,37);
// `;

// const Title = styled.h1`
//   font-size: 4rem;
//   color: white;
//   font-weight: 900;
// `;

// const Tagline = styled.p`
//   font-size: 1.5rem;
//   color: white;
//   margin: 10px 200px;
// `;

// const Navbar = styled.div`
//   position: absolute;
//   top: 20px;
//   right: 20px;
//   display: flex;
//   gap: 15px;
// `;

// const NavButton = styled.button`
//   border: 2px solid #D2FF72;
//   color: #000000;
//   background-color: #D2FF72;
//   padding: 6px 20px;
//   border-radius: 5px;
//   font-size: 1rem;
//   cursor: pointer;
//   &:hover {
//     background-color: rgb(37,37,37);
//     color: rgb(255, 255, 255);
//     border: 2px solid #D2FF72;
//   }
// `;

// const FormContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background: rgb(37, 37, 37);
// `;

// const Card = styled.div`
//   background: white;
//   padding: 40px;
//   border-radius: 10px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   width: 450px;
//   text-align: center;
// `;

// const FormTitle = styled.h2`
//   font-size: 1.8rem;
//   margin-bottom: 20px;
//   color: #333;
// `;

// const FormInput = styled.input`
//   width: 97%;
//   padding: 10px;
//   margin-bottom: 15px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 1rem;
// `;

// const SubmitButton = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: #D2FF72;
//   color: #000;
//   border: 2px solid #D2FF72;
//   border-radius: 4px;
//   font-size: 1rem;
//   cursor: pointer;
//   margin-bottom: 10px;
//   &:hover {
//     background-color: #b8e65f;
//     border-color: #b8e65f;
//   }
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-size: 0.9rem;
//   margin-bottom: 10px;
// `;

// const LinkText = styled.p`
//   font-size: 0.9rem;
//   color: #000;
//   cursor: pointer;
//   text-decoration: underline;
//   &:hover {
//     color: #9b9b9b;
//   }
// `;

// const Home = () => {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext); // Use login from AuthContext

//   const [loginOpen, setLoginOpen] = useState(false);
//   const [signupOpen, setSignupOpen] = useState(false);

//   const [loginForm, setLoginForm] = useState({ email: '', password: '' });
//   const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

//   const [loginError, setLoginError] = useState('');
//   const [signupError, setSignupError] = useState('');

//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLoginForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSignupChange = (e) => {
//     const { name, value } = e.target;
//     setSignupForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     setLoginError('');
//     const { email, password } = loginForm;
//     if (!email || !password) {
//       setLoginError('Please fill in all fields.');
//       return;
//     }
//     // Use login function from AuthContext
//     const success = await login(email, password);
//     if (success) {
//       setLoginOpen(false);
//       navigate('/dashboard', { replace: true });
//     } else {
//       setLoginError('Login failed: Invalid credentials or network error.');
//     }
//   };

//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     setSignupError('');
//     const { email, password, confirmPassword, name } = signupForm;
//     if (!email || !password || !confirmPassword || !name) {
//       setSignupError('Please fill in all fields.');
//       return;
//     }
//     if (password !== confirmPassword) {
//       setSignupError('Passwords do not match.');
//       return;
//     }
//     try {
//       console.log('Sending signup request:', { email, password, name });
//       const response = await fetch('http://localhost:5000/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password, name }),
//       });
//       const data = await response.json();
//       console.log('Signup response:', { status: response.status, data });
//       if (response.ok) {
//         setSignupOpen(false);
//         alert(data.message);
//         setLoginOpen(true);
//       } else {
//         setSignupError(data.error || 'Signup failed');
//       }
//     } catch (error) {
//       console.error('Signup error:', error);
//       setSignupError('Network error: Please check your connection or server.');
//     }
//   };

//   return (
//     <HomeContainer>
//       {!loginOpen && !signupOpen && (
//         <>
//           <Title>ResearchXtract</Title>
//           <Tagline>Upload your papers...</Tagline>
//           <Navbar>
//             <NavButton onClick={() => setLoginOpen(true)}>Login</NavButton>
//             <NavButton onClick={() => setSignupOpen(true)}>Signup</NavButton>
//           </Navbar>
//         </>
//       )}

//       {loginOpen && (
//         <FormContainer>
//           <Card>
//             <FormTitle>Login</FormTitle>
//             {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
//             <form onSubmit={handleLoginSubmit}>
//               <FormInput
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={loginForm.email}
//                 onChange={handleLoginChange}
//                 required
//               />
//               <FormInput
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={loginForm.password}
//                 onChange={handleLoginChange}
//                 required
//               />
//               <SubmitButton type="submit">Login</SubmitButton>
//             </form>
//             <LinkText onClick={() => { setLoginOpen(false); setSignupOpen(true); }}>
//               New user? Signup
//             </LinkText>
//           </Card>
//         </FormContainer>
//       )}

//       {signupOpen && (
//         <FormContainer>
//           <Card>
//             <FormTitle>Signup</FormTitle>
//             {signupError && <ErrorMessage>{signupError}</ErrorMessage>}
//             <form onSubmit={handleSignupSubmit}>
//               <FormInput
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={signupForm.name}
//                 onChange={handleSignupChange}
//                 required
//               />
//               <FormInput
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={signupForm.email}
//                 onChange={handleSignupChange}
//                 required
//               />
//               <FormInput
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={signupForm.password}
//                 onChange={handleSignupChange}
//                 required
//               />
//               <FormInput
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 value={signupForm.confirmPassword}
//                 onChange={handleSignupChange}
//                 required
//               />
//               <SubmitButton type="submit">Signup</SubmitButton>
//             </form>
//             <LinkText onClick={() => { setSignupOpen(false); setLoginOpen(true); }}>
//               Already a user? Login
//             </LinkText>
//           </Card>
//         </FormContainer>
//       )}
//     </HomeContainer>
//   );
// };

// export default Home;











import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const HomeContainer = styled.div`
  background: linear-gradient(135deg, #2c2c2c, #4a4a4a);
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  text-align: center;
  padding: 60px 20px;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 900;
  margin: 0;
  color: #d2ff72;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  color: #e0e0e0;
`;

const CtaButton = styled.button`
  background-color: #d2ff72;
  color: #000;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #b8e65f;
  }
`;

const Navbar = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 15px;
`;

const NavButton = styled.button`
  border: 2px solid #d2ff72;
  color: #000;
  background-color: #d2ff72;
  padding: 6px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: transparent;
    color: #d2ff72;
  }
`;

const FeaturesSection = styled.section`
  padding: 40px 20px;
  background: #fff;
  color: #333;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
  color: black;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 10px;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

const HowItWorksSection = styled.section`
  padding: 40px 20px;
  background: #f4f4f4;
  text-align: center;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Step = styled.div`
  text-align: center;
`;

const StepTitle = styled.h4`
  font-size: 1.2rem;
  margin: 10px 0;
  color: #666;
`;

const StepDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

const FormContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(37, 37, 37, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Card = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  text-align: center;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
`;

const FormInput = styled.input`
  width: 97%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #d2ff72;
  color: #000;
  border: 2px solid #d2ff72;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background-color: #b8e65f;
    border-color: #b8e65f;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const LinkText = styled.p`
  font-size: 0.9rem;
  color: #000;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: #9b9b9b;
  }
`;

const Footer = styled.footer`
  background: #2c2c2c;
  color: white;
  text-align: center;
  padding: 20px;
`;

const FooterLink = styled.a`
  color: #d2ff72;
  text-decoration: none;
  margin: 0 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    const { email, password } = loginForm;
    if (!email || !password) {
      setLoginError('Please fill in all fields.');
      return;
    }
    try {
      await login(email, password);
      setLoginOpen(false);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setLoginError('Login failed: Invalid credentials or network error.');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError('');
    const { email, password, confirmPassword, name } = signupForm;
    if (!email || !password || !confirmPassword || !name) {
      setSignupError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setSignupError('Passwords do not match.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();
      if (response.ok) {
        setSignupOpen(false);
        alert(data.message);
        setLoginOpen(true);
      } else {
        setSignupError(data.error || 'Signup failed');
      }
    } catch (error) {
      setSignupError('Network error: Please check your connection or server.');
    }
  };

  return (
    <HomeContainer>
      <Navbar>
        <NavButton onClick={() => setLoginOpen(true)}>Login</NavButton>
        <NavButton onClick={() => setSignupOpen(true)}>Signup</NavButton>
      </Navbar>

      <Header>
        <Title>ResearchXtract</Title>
        <Tagline>Unlock the Power of Research Papers with AI-Powered Analysis</Tagline>
        <Tagline>Upload your research papers and get insights: summaries, keywords, citations, tables, and personalized paper recommendations.</Tagline>
        <CtaButton onClick={() => setSignupOpen(true)}>Get Started Now</CtaButton>
      </Header>

      <FeaturesSection>
        <SectionTitle>Features</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureTitle>Smart Summaries</FeatureTitle>
            <FeatureDescription>Get concise summaries of abstracts, introductions, or specific sections in just 150 words, tailored to your research needs.</FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Keyword Extraction</FeatureTitle>
            <FeatureDescription>Automatically extract or infer key technical terms and concepts to understand the core focus of any research paper.</FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Citation Conversion</FeatureTitle>
            <FeatureDescription>Extract all citations from the paper’s references section, preserving their exact formatting for easy use.</FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Table Extraction</FeatureTitle>
            <FeatureDescription>Effortlessly extract tables from PDFs, complete with captions and structured data, for quick analysis.</FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Image Extraction</FeatureTitle>
            <FeatureDescription>Seamlessly extract images from PDFs, preserving visual content for reference, analysis, or reuse.</FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Paper Recommendations</FeatureTitle>
            <FeatureDescription>Discover up to 5 recent, relevant open-access papers based on your uploaded document’s content.</FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Interactive Chat</FeatureTitle>
            <FeatureDescription>Ask questions about the paper and get precise answers based solely on its content, with full chat history support.</FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>PPT & PDF Downloads</FeatureTitle>
            <FeatureDescription>Download your analysis results, including summaries, keywords, & tables, in PPT & PDF formats for presentations & reports.</FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <HowItWorksSection>
        <SectionTitle>How It Works</SectionTitle>
        <StepsGrid>
          <Step>
            <StepTitle>1. Upload</StepTitle>
            <StepDescription>Upload your research paper in PDF format securely to our platform.</StepDescription>
          </Step>
          <Step>
            <StepTitle>2. Analyze</StepTitle>
            <StepDescription>Our AI processes the paper to extract summaries, keywords, citations, tables, and more.</StepDescription>
          </Step>
          <Step>
            <StepTitle>3. Explore</StepTitle>
            <StepDescription>View insights, interact with the paper via chat, and discover related research.</StepDescription>
          </Step>
          <Step>
            <StepTitle>4. Save & Share</StepTitle>
            <StepDescription>Save your analysis to your account and revisit or share it anytime.</StepDescription>
          </Step>
        </StepsGrid>
      </HowItWorksSection>

      {loginOpen && (
        <FormContainer>
          <Card>
            <FormTitle>Login</FormTitle>
            {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
            <form onSubmit={handleLoginSubmit}>
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={handleLoginChange}
                required
              />
              <FormInput
                type="password"
                name="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />
              <SubmitButton type="submit">Login</SubmitButton>
            </form>
            <LinkText onClick={() => { setLoginOpen(false); setSignupOpen(true); }}>
              New user? Signup
            </LinkText>
          </Card>
        </FormContainer>
      )}

      {signupOpen && (
        <FormContainer>
          <Card>
            <FormTitle>Signup</FormTitle>
            {signupError && <ErrorMessage>{signupError}</ErrorMessage>}
            <form onSubmit={handleSignupSubmit}>
              <FormInput
                type="text"
                name="name"
                placeholder="Name"
                value={signupForm.name}
                onChange={handleSignupChange}
                required
              />
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={signupForm.email}
                onChange={handleSignupChange}
                required
              />
              <FormInput
                type="password"
                name="password"
                placeholder="Password"
                Juliet
                value={signupForm.password}
                onChange={handleSignupChange}
                required
              />
              <FormInput
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={signupForm.confirmPassword}
                onChange={handleSignupChange}
                required
              />
              <SubmitButton type="submit">Signup</SubmitButton>
            </form>
            <LinkText onClick={() => { setSignupOpen(false); setLoginOpen(true); }}>
              Already a user? Login
            </LinkText>
          </Card>
        </FormContainer>
      )}

      <Footer>
        <p>© 2025 ResearchXtract. All rights reserved.</p>
        {/* <FooterLink href="/privacy">Privacy Policy</FooterLink> */}
        {/* <FooterLink href="/terms">Terms of Service</FooterLink> */}
      </Footer>
    </HomeContainer>
  );
};

export default Home;
