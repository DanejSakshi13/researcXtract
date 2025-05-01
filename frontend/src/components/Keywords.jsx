// import React from 'react';
// import styled from 'styled-components';
// import CopyToClipboard from './CopyToClipboard';

// const Card = styled.div`
//   background-color: #2c2c2c;
//   border: 1px solid #5f5f5f;
//   color: white;
//   padding: 20px;
//   border-radius: 8px;
//   margin: 10px 0;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
// `;

// const Title = styled.h3`
// margin :0;
//   font-size: 1.2rem;
// `;

// const KeywordList = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;
// `;

// const KeywordItem = styled.li`
//   display: inline-block;
//   background-color: #444;
//   padding: 5px 10px;
//   margin: 5px;
//   border-radius: 4px;
  
//   &:hover {
//     box-shadow: 0 4px 8px rgba(10, 10, 10, 0.6);
//     cursor: pointer;
//   }
// `;

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   margin-bottom: 10px;
// `;

// const Keywords = ({ keywords }) => (
//   <Card>
//     <Header>
//     <Title>Keywords</Title>
//     <CopyToClipboard text={keywords} />
//     </Header>
    
//     <KeywordList>
//       {keywords && keywords.length > 0 ? (
//         keywords.map((keyword, index) => (
//           <KeywordItem key={index}  title="Ask AI">{keyword}</KeywordItem>
//         ))
//       ) : (
//         <p>No keywords available</p>
//       )}
//     </KeywordList>
//   </Card>
// );

// export default Keywords;










import React from 'react';
import styled from 'styled-components';
import CopyToClipboard from './CopyToClipboard';

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
  margin: 0;
  font-size: 1.2rem;
`;

const KeywordList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const KeywordItem = styled.li`
  display: inline-block;
  background-color: #444;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 4px;
  &:hover {
    box-shadow: 0 4px 8px rgba(10, 10, 10, 0.6);
    cursor: pointer;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const Keywords = ({ keywords, onKeywordClick }) => (
  <Card>
    <Header>
      <Title>Keywords</Title>
      <CopyToClipboard text={keywords} />
    </Header>
    <KeywordList>
      {keywords && keywords.length > 0 ? (
        keywords.map((keyword, index) => (
          <KeywordItem
            key={index}
            onClick={() => onKeywordClick(keyword)}
          >
            {keyword}
          </KeywordItem>
        ))
      ) : (
        <p>No keywords available</p>
      )}
    </KeywordList>
  </Card>
);

export default Keywords;