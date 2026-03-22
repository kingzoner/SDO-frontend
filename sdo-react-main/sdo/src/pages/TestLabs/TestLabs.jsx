import React from 'react';
import styled from 'styled-components';
import TestResultsGrid from './components/TestResult';
import AttemptsList from './components/AttemptsList';
import NavigationButtons from './components/NavigationButtons';

const PageContainer = styled.div`
  background-color: #fff;
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  max-width: 100%;
  padding: 20px 20px 60px;
  flex: 1;
`;

const TestLabs = () => {
  return (
    <PageContainer>
      <ContentWrapper>
        <TestResultsGrid />
        <AttemptsList />
        <NavigationButtons />
      </ContentWrapper>
    </PageContainer>
  );
};

export default TestLabs;
