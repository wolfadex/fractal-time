import React, { Component } from 'react';
import styled from 'react-emotion';

const Container = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default class MainMenu extends Component {
  render() {
    return (
      <Container>
        <button>Create Game</button>
        <label>
          <b>Import Game:</b>
          <br />
          <input type="file" accepts=".json" />
        </label>
      </Container>
    );
  }
}
