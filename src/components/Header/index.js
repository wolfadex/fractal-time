import React, { Component } from 'react';
import styled, { css, cx } from 'react-emotion';
import { connect } from 'react-redux';

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

const mapStateToProps = ({ app: { verticalTimeline } }) => ({
  verticalTimeline,
});

@connect(mapStateToProps)
export default class Header extends Component {
  render() {
    const { verticalTimeline } = this.props;

    return (
      <StyledHeader
        className={cx(verticalTimeline ? verticalStyle : horizontalStyle)}
      >
        Menu Logo
      </StyledHeader>
    );
  }

  handleChangeVertical = (e) => {
    this.props.setTimelineVertical(e.target.checked);
  };
}
