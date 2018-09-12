import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css, cx } from 'react-emotion';
import { connect } from 'react-redux';
import TimeUnit from '../TimeUnit';
import { FOCUS_SCALE } from '../../store/timeline/types';

const Container = styled('div')`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: flex-start;
  overflow: auto;
`;

const Timeline = styled('div')`
  align-items: center;
  display: flex;
  justify-content: center;
`;
const styleTimelineHorizontal = css`
  flex-direction: row;
`;
const styleTimelineVertical = css`
  flex-direction: column;
`;

const mapStateToProps = ({
  timeline: { focusScale, focusId, periods, scenes, events },
}) => {
  switch (focusScale) {
    case FOCUS_SCALE.ALL_TIME:
      return {
        periods,
      };
    case FOCUS_SCALE.PERIOD:
      return {
        scenes: scenes.filter(({ period }) => period === focusId),
      };
    case FOCUS_SCALE.SCENE:
      return {
        events: events.filter(({ scene }) => scene === focusId),
      };
    case FOCUS_SCALE.EVENT:
      return {
        event: events[focusId],
      };
  }

  return {};
};

@connect(mapStateToProps)
export default class Line extends Component {
  static propTypes = {
    isVertical: PropTypes.bool,
    periods: PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }),
    ),
  };

  static defaultProps = {
    isVertical: false,
  };

  render() {
    const { isVertical } = this.props;
    return (
      <Container>
        <Timeline
          className={cx(
            isVertical ? styleTimelineVertical : styleTimelineHorizontal,
          )}
        >
          <TimeUnit
            content={{
              name: `Carl's Event`,
              description: `You don't want to know.`,
            }}
          />
          <TimeUnit isVertical={isVertical} />
          <TimeUnit isVertical={isVertical} />
          <TimeUnit isVertical={isVertical} />
        </Timeline>
      </Container>
    );
  }
}
