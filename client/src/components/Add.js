import React from 'react';

const Add = props => {
  if (!props.auth) {
    return false;
  }
  return (
    <div
      className="brown lighten-4"
      style={{
        margin: '10px',
        width: '85%',
        borderRadius: '10px',
        padding: '3px'
      }}
    >
      <a
        className="btn-floating btn-large waves-effect waves-light red"
        onClick={props.toggle}
      >
        <i className="material-icons">add</i>
      </a>
      <h5 className="left-align">Add new Pin?</h5>
    </div>
  );
};

export default Add;
