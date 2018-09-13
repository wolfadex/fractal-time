import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css, cx } from 'react-emotion';
import { connect } from 'react-redux';
import TimeUnit from '../TimeUnit';
import InsertTime from '../InsertTime';
import { FOCUS_SCALE } from '../../store/timeline/types';
import { addPeriod, addScene, addEvent } from '../../store/timeline/actions';

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

const mapDispatchToProps = {
  addPeriod,
  addScene,
  addEvent,
};

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
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
          <TimeUnit isVertical={isVertical} />
          {timeline.map((period, i) => (
            <>
              {!(focusScale === FOCUS_SCALE.ALL_TIME && i === 0) && (
                <InsertTime onClick={this.handleInsert(i)} />
              )}
              <TimeUnit isVertical={isVertical} content={period} />
            </>
          ))}
          {focusScale !== FOCUS_SCALE.ALL_TIME && (
            <InsertTime onClick={this.handleInsert(timeline.length)} />
          )}
          <TimeUnit isVertical={isVertical} />
        </Timeline>
      </Container>
    );
  }

  handleInsert = (index) => () => {
    switch (this.props.focusScale) {
      case FOCUS_SCALE.ALL_TIME:
        // TODO: Don't pass in fake data
        this.props.addPeriod(index, {
          name: `carl-${index}`,
          description: 'sadly, carl',
        });
        break;
    }
  };
}
