import React, { Component } from 'react';
import { connect } from 'react-redux';

import MyPins from './MyPins';
import { fetchMyPins } from '../actions';

class MyPinsContainer extends Component {
  componentDidMount() {
    this.props.fetchMyPins();
  }
  render() {
    return <MyPins history={this.props.history} />;
  }
}

export default connect(null, { fetchMyPins })(MyPinsContainer);
