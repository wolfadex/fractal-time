import React, { Component } from 'react';
import { css } from 'react-emotion';
import { connect } from 'react-redux';
import { APP_MODE, CARL } from '../../store/app/types';
import {
  setTimelineVertical,
  setMode,
  initialize,
  connect as peerConnect,
  sendMessage,
} from '../../store/app/actions';
import Header from '../Header';
// import NewSession from '../NewSession';
// import ListSessions from '../ListSessions';
// import Session from '../Session';

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
  app: { verticalTimeline, mode, otherPeers, carl, peerId },
}) => ({
  verticalTimeline,
  mode,
  otherPeers,
  carl,
  peerId,
});

const mapDispatchToProps = {
  setTimelineVertical,
  setMode,
  initialize,
  peerConnect,
  sendMessage,
};

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class App extends Component {
  componentDidMount() {
    this.props.initialize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  state = {
    newPeerData: '',
    carlValue: '',
  };

  render() {
    const { verticalTimeline, peerId, otherPeers, carl } = this.props;
    const { newPeerData, carlValue } = this.state;

    return (
      <div
        className={appStyles}
        style={{ flexDirection: verticalTimeline ? 'row' : 'column' }}
      >
        <Header />
        <textarea
          value={newPeerData}
          onChange={({ target: { value } }) =>
            this.setState({ newPeerData: value })
          }
        />
        <button onClick={() => this.props.peerConnect(newPeerData)}>
          Join
        </button>
        <div>
          <b>Peer ID: </b>
          {peerId}
        </div>
        <input
          value={carlValue}
          onChange={({ target: { value } }) =>
            this.setState({ carlValue: value })
          }
        />
        <button
          onClick={() =>
            this.props.sendMessage({ body: carlValue, type: CARL })
          }
        >
          Carl It Now
        </button>
        <div>
          <b>Carl: </b>
          {carl}
        </div>
        <b>Peers:</b>
        <ul>
          {otherPeers.map((op) => (
            <li>{op.id}</li>
          ))}
        </ul>
      </div>
    );
  }

  // renderBody = () => {
  //   const { verticalTimeline, mode } = this.props;

  //   switch (mode) {
  //     case APP_MODE.MAIN_MENU:
  //       return (
  //         <>
  //           <button onClick={this.handleModeChange(APP_MODE.NEW_SESSION)}>
  //             New Session
  //           </button>
  //           <button onClick={this.handleModeChange(APP_MODE.JOIN_SESSION)}>
  //             Join Session
  //           </button>
  //           <button onClick={this.handleModeChange(APP_MODE.LOAD_SESSION)}>
  //             Load Session
  //           </button>
  //           <button onClick={this.handleModeChange(APP_MODE.IMPORT_SESSION)}>
  //             Import Session
  //           </button>
  //         </>
  //       );
  //     case APP_MODE.NEW_SESSION:
  //       return <NewSession />;
  //     case APP_MODE.JOIN_SESSION:
  //       return (
  //         <form>
  //           Join Session
  //           <input type="text" placeholder="Session Id" />
  //           <button onClick={this.handleModeChange(APP_MODE.MAIN_MENU)}>
  //             Cancel
  //           </button>
  //           <button onClick={this.handleModeChange(APP_MODE.PLAYING)}>
  //             Join Session
  //           </button>
  //         </form>
  //       );
  //     case APP_MODE.LOAD_SESSION:
  //       return <ListSessions />;
  //     case APP_MODE.IMPORT_SESSION:
  //       return (
  //         <form>
  //           <label>
  //             Import Sessions
  //             <input type="file" accept=".json" />
  //           </label>
  //           <button onClick={this.handleModeChange(APP_MODE.MAIN_MENU)}>
  //             Cancel
  //           </button>
  //           <button>Start New Session</button>
  //         </form>
  //       );
  //     case APP_MODE.PLAYING:
  //       return <Session />;
  //   }
  // };

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
