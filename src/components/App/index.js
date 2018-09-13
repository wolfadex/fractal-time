import React, { Component } from 'react';
import { css } from 'react-emotion';
import { connect } from 'react-redux';
import { APP_MODE } from '../../store/app/types';
import { setTimelineVertical, setMode } from '../../store/app/actions';
import { authStateChange } from '../../store/user/actions';
import Header from '../Header';
import { auth } from '../../firebase';
import NewSession from '../NewSession';
import ListSessions from '../ListSessions';
import Session from '../Session';

const appStyles = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  display: flex;
`;

const mapStateToProps = ({
  app: { verticalTimeline, mode },
  user: { user },
}) => ({
  verticalTimeline,
  mode,
  authenticated: !!user,
});

const mapDispatchToProps = {
  setTimelineVertical,
  authStateChange,
  setMode,
};

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class App extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);

    auth.onAuthStateChanged((user) => {
      this.props.authStateChange(user);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { verticalTimeline, authenticated } = this.props;

    return (
      <div
        className={appStyles}
        style={{ flexDirection: verticalTimeline ? 'row' : 'column' }}
      >
        <Header />
        {authenticated && this.renderBody()}
      </div>
    );
  }

  renderBody = () => {
    const { verticalTimeline, mode } = this.props;

    switch (mode) {
      case APP_MODE.MAIN_MENU:
        return (
          <>
            <button onClick={this.handleModeChange(APP_MODE.NEW_SESSION)}>
              New Session
            </button>
            <button onClick={this.handleModeChange(APP_MODE.JOIN_SESSION)}>
              Join Session
            </button>
            <button onClick={this.handleModeChange(APP_MODE.LOAD_SESSION)}>
              Load Session
            </button>
            <button onClick={this.handleModeChange(APP_MODE.IMPORT_SESSION)}>
              Import Session
            </button>
          </>
        );
      case APP_MODE.NEW_SESSION:
        return <NewSession />;
      case APP_MODE.JOIN_SESSION:
        return (
          <form>
            Join Session
            <input type="text" placeholder="Session Id" />
            <button onClick={this.handleModeChange(APP_MODE.MAIN_MENU)}>
              Cancel
            </button>
            <button onClick={this.handleModeChange(APP_MODE.PLAYING)}>
              Join Session
            </button>
          </form>
        );
      case APP_MODE.LOAD_SESSION:
        return <ListSessions />;
      case APP_MODE.IMPORT_SESSION:
        return (
          <form>
            <label>
              Import Sessions
              <input type="file" accept=".json" />
            </label>
            <button onClick={this.handleModeChange(APP_MODE.MAIN_MENU)}>
              Cancel
            </button>
            <button>Start New Session</button>
          </form>
        );
      case APP_MODE.PLAYING:
        return <Session />;
    }
  };

  handleResize = () => {
    const { innerHeight, innerWidth } = window;

    if (innerWidth > innerHeight) {
      this.props.setTimelineVertical(false);
    } else {
      this.props.setTimelineVertical();
    }
  };

  handleModeChange = (mode) => () => {
    this.props.setMode(mode);
  };
}
