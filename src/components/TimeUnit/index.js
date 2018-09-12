import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css, cx } from 'react-emotion';

const Container = styled('div')`
  border: 1px solid ${({ theme }) => theme.black};
  border-radius: 0.5rem;
`;

const styleHorizontal = css`
  width: 30vw;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const styleVertical = css`
  height: 30vh;
  width: 3rem;
`;
const styleEmpty = css`
  border-style: none;
  border-radius: 0;
`;
const styleEmptyHorizontal = css`
  border-bottom-style: solid;
  border-bottom-width: 3px;
  height: 0;
`;
const styleEmptyVertical = css`
  border-left-style: solid;
  border-left-width: 3px;
  width: 0;
`;

export default class TimeUnit extends Component {
  static propTypes = {
    isVertical: PropTypes.bool,
    content: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = { isVertical: false };

  render() {
    const { isVertical, content } = this.props;
    return (
      <Container
        className={cx(
          isVertical ? styleVertical : styleHorizontal,
          content == null && styleEmpty,
          content == null &&
            (isVertical ? styleEmptyVertical : styleEmptyHorizontal),
        )}
      >
        {content && content.name}
      </Container>
    );
  }
}
