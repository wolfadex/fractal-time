import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { initializeNewHistory } from '../../store/game/actions';

const Container = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const mapDispatchToProps = {
  initializeNewHistory,
};

@connect(
  null,
  mapDispatchToProps,
)
export default class MainMenu extends Component {
  render() {
    return (
      <Container>
        <button onClick={this.props.initializeNewHistory}>Create Game</button>
        <label>
          <b>Import Game:</b>
          <br />
          <input type="file" accepts=".json" />
        </label>
      </Container>
    );
  }
}
