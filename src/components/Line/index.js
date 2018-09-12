import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css, cx } from 'react-emotion';
import { connect } from 'react-redux';
import TimeUnit from '../TimeUnit';
import InsertTime from '../InsertTime';
import { FOCUS_SCALE } from '../../store/timeline/types';

const Container = styled('div')`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
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
  let timeline = [];

  switch (focusScale) {
    case FOCUS_SCALE.ALL_TIME:
      timeline = periods;
      break;
    case FOCUS_SCALE.PERIOD:
      timeline = scenes.filter(({ period }) => period === focusId);
      break;
    case FOCUS_SCALE.SCENE:
      timeline = events.filter(({ scene }) => scene === focusId);
      break;
    case FOCUS_SCALE.EVENT:
      timeline = events[focusId];
      break;
  }

  return {
    focusScale,
    timeline,
  };
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
    const { isVertical, timeline, focusScale } = this.props;
    return (
      <Container>
        <Timeline
          className={cx(
            isVertical ? styleTimelineVertical : styleTimelineHorizontal,
          )}
        >
          {timeline.map((period, i) => (
            <>
              {i !== 0 && <InsertTime />}
              <TimeUnit isVertical={isVertical} content={period} />
            </>
          ))}
          {timeline.length === 0 && <InsertTime />}
        </Timeline>
      </Container>
    );
  }
}
