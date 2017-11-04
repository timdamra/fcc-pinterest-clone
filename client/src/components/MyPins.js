import React from 'react';
import { connect } from 'react-redux';

import EditPin from './EditPin';

const MyPins = props => {
  if (props.pins.length === 0) {
    return <h3>No pins to display yet</h3>;
  }
  const list = props.pins.map((val, i) => {
    return <EditPin history={props.history} val={val} i={i} id={val._id} />;
  });
  return (
    <div>
      <ul className="collection">{list}</ul>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    pins: state.myPins
  };
}

export default connect(mapStateToProps)(MyPins);
