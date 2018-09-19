import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeName } from '../../store/game/actions';

const mapStateToProps = ({
  app: { peerId },
  game: {
    shared: {
      initializingNewHistory,
      newHistory: {
        name,
        start: { description: startDescription, tone: startTone },
        end: { description: endDescription, tone: endTone },
      },
    },
  },
}) => ({
  name,
  startDescription,
  startTone,
  endDescription,
  endTone,
  readOnly: initializingNewHistory !== peerId,
});

const mapDispatchToProps = {
  changeName,
};

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class NewGame extends Component {
  render() {
    const {
      readOnly,
      name,
      startDescription,
      startTone,
      endDescription,
      endTone,
    } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <b>Name: </b>
          <input
            type="text"
            value={name}
            onChange={this.handleNameChange}
            disabled={readOnly}
          />
        </label>
      </form>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleNameChange = ({ target: { value } }) => {
    this.props.changeName(value);
  };
}
