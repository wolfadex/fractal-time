import React, { Component } from 'react';
import styled, { css, cx } from 'react-emotion';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../store/user/actions';

const StyledHeader = styled('header')`
  background-color: ${({ theme }) => theme.accent};
`;
const horizontalStyle = css`
  width: 100%;
  height: 3rem;
`;
const verticalStyle = css`
  width: 5rem;
  height: 100%;
`;

const mapStateToProps = ({
  app: { verticalTimeline },
  user: { authenticated },
}) => ({
  authenticated,
  verticalTimeline,
});

const mapDispatchToProps = {
  signIn,
  signOut,
};

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class Header extends Component {
  render() {
    const { verticalTimeline, authenticated } = this.props;

    return (
      <StyledHeader
        className={cx(verticalTimeline ? verticalStyle : horizontalStyle)}
      >
        Menu Logo
        {authenticated && (
          <button onClick={this.props.signOut}>Sign Out</button>
        )}
        {!authenticated && <button onClick={this.props.signIn}>Sign In</button>}
      </StyledHeader>
    );
  }

  handleChangeVertical = (e) => {
    this.props.setTimelineVertical(e.target.checked);
  };
}
