import React, { Component } from 'react';
import { css } from 'react-emotion';
import { connect } from 'react-redux';
import { GAME_MODE } from '../../store/game/types';
import {
  setTimelineVertical,
  initialize,
  connect as peerConnect,
  sendChat,
} from '../../store/app/actions';
import Header from '../Header';
// import NewSession from '../NewSession';
// import ListSessions from '../ListSessions';
// import Session from '../Session';
import MainMenu from '../MainMenu';
import UserMenu from '../UserMenu';
import NewGame from '../NewGame';

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
  app: { verticalTimeline, otherPeers, chat, peerId },
  game: {
    shared: { mode },
  },
}) => ({
  verticalTimeline,
  mode,
  otherPeers,
  chat,
  peerId,
});

const mapDispatchToProps = {
  setTimelineVertical,
  initialize,
  peerConnect,
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
    chatMessage: '',
  };

  render() {
    const { verticalTimeline, peerId, otherPeers, chat } = this.props;
    const { newPeerData, chatMessage } = this.state;

    return (
      <div
        className={appStyles}
        style={{ flexDirection: verticalTimeline ? 'row' : 'column' }}
      >
        <Header />
        {this.renderBody()}
        <UserMenu />
        {/* <textarea
          placeholder="Friend's Peer ID"
          value={newPeerData}
          onChange={({ target: { value } }) =>
            this.setState({ newPeerData: value })
          }
        />
        <button
          onClick={() => {
            this.setState({
              newPeerData: '',
            });
            this.props.peerConnect(newPeerData);
          }}
        >
          Join
        </button>
        <div>
          <b>Peer ID: </b>
          {peerId}
        </div>
        <input
          placeholder="Message to send"
          value={chatMessage}
          onChange={({ target: { value } }) =>
            this.setState({ chatMessage: value })
          }
        />
        <button
          onClick={() => {
            this.setState({
              chatMessage: '',
            });
            this.props.broadcastMessage(sendChat(chatMessage));
          }}
        >
          Chat Message
        </button>
        <b>Peers:</b>
        <ul>
          {Object.entries(otherPeers).map(([id, op]) => (
            <li key={id}>{id}: Friend</li>
          ))}
        </ul>
        <b>Messages: </b>
        <ul>
          {Object.keys(chat)
            .sort()
            .map((timestamp) => {
              const date = new Date(Number(timestamp));

              return (
                <li key={timestamp}>
                  Time: {date.toLocaleString()}
                  <br />
                  {chat[timestamp]}
                </li>
              );
            })}
        </ul> */}
      </div>
    );
  }

  renderBody = () => {
    const { verticalTimeline, mode } = this.props;
    console.log('mode', mode);
    switch (mode) {
      case GAME_MODE.MAIN_MENU:
        return <MainMenu />;
      case GAME_MODE.NEW_GAME:
        return <NewGame />;
      // case APP_MODE.NEW_SESSION:
      //   return <NewSession />;
      // case APP_MODE.JOIN_SESSION:
      //   return (
      //     <form>
      //       Join Session
      //       <input type="text" placeholder="Session Id" />
      //       <button onClick={this.handleModeChange(APP_MODE.MAIN_MENU)}>
      //         Cancel
      //       </button>
      //       <button onClick={this.handleModeChange(APP_MODE.PLAYING)}>
      //         Join Session
      //       </button>
      //     </form>
      //   );
      // case APP_MODE.LOAD_SESSION:
      //   return <ListSessions />;
      // case APP_MODE.IMPORT_SESSION:
      //   return (
      //     <form>
      //       <label>
      //         Import Sessions
      //         <input type="file" accept=".json" />
      //       </label>
      //       <button onClick={this.handleModeChange(APP_MODE.MAIN_MENU)}>
      //         Cancel
      //       </button>
      //       <button>Start New Session</button>
      //     </form>
      //   );
      // case APP_MODE.PLAYING:
      //   return <Session />;
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
}
