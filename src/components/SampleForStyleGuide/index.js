import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SampleForStyleGuide extends Component {
  static propTypes = {
    name: PropTypes.string,
  };

  static defaultProps = {
    name: 'Carl',
  };

  render() {
    const { name } = this.props;

    return <div>{name}</div>;
  }
}
