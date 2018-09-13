import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APP_MODE } from '../../store/app/types';
import { setMode } from '../../store/app/actions';
import { createHistory } from '../../store/timeline/actions';

const mapDispatchToProps = {
  setMode,
  createHistory,
};

@connect(
  null,
  mapDispatchToProps,
)
export default class NewSession extends Component {
  state = {
    name: '',
    startTone: true,
    startDescription: '',
    endTone: true,
    endDescription: '',
  };

  render() {
    const {
      name,
      startTone,
      startDescription,
      endTone,
      endDescription,
    } = this.state;

    return (
      <form>
        New Session
        <label>
          Name:{' '}
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleFormChange}
          />
        </label>
        <label>
          Start:
          <label>
            Description:
            <textarea
              name="startDescription"
              value={startDescription}
              onChange={this.handleFormChange}
            />
          </label>
          <label>
            Tone:
            <input
              type="checkbox"
              name="startTone"
              checked={startTone}
              onChange={this.handleCheckboxChange}
            />
          </label>
        </label>
        <label>
          End:
          <label>
            Description:
            <textarea
              name="endDescription"
              value={endDescription}
              onChange={this.handleFormChange}
            />
          </label>
          <label>
            Tone:
            <input
              type="checkbox"
              name="endTone"
              checked={endTone}
              onChange={this.handleCheckboxChange}
            />
          </label>
        </label>
        <button type="button" onClick={this.handleModeChange(APP_MODE.MAIN_MENU)}>
          Cancel
        </button>
        <button type="button" onClick={this.handleHistoryCreate}>Start New Session</button>
      </form>
    );
  }

  handleFormChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleCheckboxChange = ({ target: { name, checked } }) => {
    this.setState({
      [name]: checked,
    });
  };

  handleModeChange = (mode) => () => {
    this.props.setMode(mode);
  };

  handleHistoryCreate = () => {
    const {
      name,
      startTone,
      startDescription,
      endTone,
      endDescription,
    } = this.state;

    this.props.createHistory({
      name,
      start: {
        description: startDescription,
        tone: startTone,
      },
      end: {
        description: endDescription,
        tone: endTone,
      },
    });
  };
}
