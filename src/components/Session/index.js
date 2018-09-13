import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadHistory } from '../../store/timeline/actions';
import Line from '../Line';

const mapDispatchToProps = { loadHistory };

@connect(
  null,
  mapDispatchToProps,
)
export default class Session extends Component {
  componentDidMount() {
    this.props.loadHistory();
  }

  render() {
    return <Line />;
  }
}
