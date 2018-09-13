import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSession } from '../../store/timeline/actions';
import { listSessions, setMode } from '../../store/app/actions';
import { APP_MODE } from '../../store/app/types';

const mapStateToProps = ({ app: { sessions } }) => ({
  sessions,
});

const mapDispatchToProps = {
  loadSession,
  listSessions,
  setMode,
};

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class ListSessions extends Component {
  componentDidMount() {
    this.props.listSessions();
  }

  render() {
    const { sessions } = this.props;

    return (
      <>
        <ul>
          {sessions.map(({ name, id }) => (
            <li key={id}>
              {name} <button>Load Session</button>
            </li>
          ))}
        </ul>
        <button onClick={this.handleModeChange(APP_MODE.MAIN_MENU)}>
          Cancel
        </button>
      </>
    );
  }

  handleModeChange = (mode) => () => {
    this.props.setMode(mode);
  };
}
