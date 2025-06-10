import React, { Component } from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  color: red;
  padding: 10px;
  border: 1px solid red;
  border-radius: 5px;
  margin: 10px 0;
`;

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage>
          <h3>Something went wrong in {this.props.componentName}.</h3>
          <p>{this.state.error?.message || 'Unknown error'}</p>
        </ErrorMessage>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;