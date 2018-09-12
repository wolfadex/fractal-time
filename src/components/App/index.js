import React, { Component } from 'react';
import { css } from 'react-emotion';
import { connect } from 'react-redux';
import { setTimelineVertical } from '../../store/app/actions';
import Header from '../Header';
import Line from '../Line';

const appStyles = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  display: flex;
`;

const mapStateToProps = ({ app: { verticalTimeline } }) => ({
  verticalTimeline,
});

const mapDispatchToProps = {
  setTimelineVertical,
};

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class App extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { verticalTimeline } = this.props;

    return (
      <div
        className={appStyles}
        style={{ flexDirection: verticalTimeline ? 'row' : 'column' }}
      >
        <Header />
        <Line vertical={verticalTimeline} />
      </div>
    );
  }

  handleResize = () => {
    const { innerHeight, innerWidth } = window;

    if (innerWidth > innerHeight) {
      this.props.setTimelineVertical(false);
    } else {
      this.props.setTimelineVertical();
    }
  };
}