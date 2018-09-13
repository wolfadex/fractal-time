import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APP_MODE } from '../../store/app/types';
import { setMode } from '../../store/app/actions';

const mapDispatchToProps = {
  setMode,
};

@connect(
  null,
  mapDispatchToProps,
)
export default class NewSession extends Component {
  render() {
    return (
      <form>
        New Session
        <label>
          Name: <input type="text" />
        </label>
        <label>
          History Start:
          <textarea />
        </label>
        <label>
          History End:
          <textarea />
        </label>
        <button onClick={this.handleModeChange(APP_MODE.MAIN_MENU)}>
          Cancel
        </button>
        <button onClick={this.handleModeChange(APP_MODE.PLAYING)}>
          Start New Session
        </button>
      </form>
    );
  }

  handleModeChange = (mode) => () => {
    this.props.setMode(mode);
  };
}
