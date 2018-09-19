import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect as peerConnect } from '../../store/app/actions';
import { setPlayerName } from '../../store/game/actions';

const MenuButton = styled('button')`
  border-radius: 100rem;
  bottom: 2rem;
  cursor: pointer;
  font-size: 2rem;
  height: 3rem;
  position: absolute;
  right: 2rem;
  width: 3rem;
`;

const MenuList = styled('ul')`
  border: 1px solid black;
  bottom: 6rem;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 2rem;
`;

const MenuItem = styled('li')`
  border-bottom: 1px solid black;
  padding: 0.5rem;
`;

const FriendsList = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Friend = styled('li')`
  border-bottom: 1px solid black;
  padding: 0.25rem;
`;

const mapStateToProps = ({
  app: { otherPeers, peerId },
  game: { playerNames },
}) => ({
  otherPeers,
  peerId,
  playerNames,
});

const mapDispatchToProps = {
  peerConnect,
  setPlayerName,
};

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class UserMenu extends Component {
  state = {
    menuOpen: false,
    friendId: '',
    displayName: '',
  };

  render() {
    const { peerId, otherPeers, playerNames } = this.props;
    const { menuOpen, friendId, displayName } = this.state;

    return (
      <>
        <MenuButton onClick={this.handleMenuToggleOpen}>
          <FontAwesomeIcon icon={menuOpen ? 'times' : 'bars'} />
        </MenuButton>
        {menuOpen && (
          <MenuList>
            <MenuItem>
              <b>My ID: </b>
              {peerId}
            </MenuItem>
            <MenuItem>
              <b>Display Name: </b>
              <input
                type="text"
                value={displayName}
                onChange={this.handleNameChange}
                onBlur={this.handleSharingName}
              />
            </MenuItem>
            <MenuItem>
              <form onSubmit={this.handleAddFriend}>
                <b>Friend ID: </b>
                <input
                  type="text"
                  value={friendId}
                  onChange={this.handleFriendIdChange}
                />
                <button disabled={friendId.length < 1}>Add Friend</button>
              </form>
            </MenuItem>
            <MenuItem>
              <b>Friends:</b>
              <br />
              <FriendsList>
                {Object.keys(otherPeers).map((id) => (
                  <Friend key={id}>
                    <b>{playerNames[id]}</b>
                    <br />
                    <b>ID: </b> {id}
                  </Friend>
                ))}
              </FriendsList>
            </MenuItem>
          </MenuList>
        )}
      </>
    );
  }

  handleMenuToggleOpen = () => {
    this.setState(({ menuOpen }) => ({
      menuOpen: !menuOpen,
    }));
  };

  handleFriendIdChange = ({ target: { value } }) => {
    this.setState({
      friendId: value,
    });
  };

  handleAddFriend = (e) => {
    e.preventDefault();

    this.props.peerConnect(this.state.friendId);

    this.setState({
      friendId: '',
    });
  };

  handleNameChange = ({ target: { value } }) => {
    this.setState({
      displayName: value,
    });
  };

  handleSharingName = () => {
    this.props.setPlayerName({
      id: this.props.peerId,
      name: this.state.displayName,
    });
  };
}
