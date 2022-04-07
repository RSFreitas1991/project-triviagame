import React from 'react';
import Header from '../components/header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          Text de feedback
        </p>
      </div>
    );
  }
}

export default Feedback;
