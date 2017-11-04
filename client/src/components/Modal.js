import React from 'react';

const Modal = props => {
  return (
    <div className="row">
      <form className="col 12">
        <div className="input-field col s12">
          <input
            value={props.fields.title}
            onChange={props.onInputChange}
            placeholder="Title"
            name="title"
            type="text"
            className="validate"
          />
        </div>
        <div className="input-field col s12">
          <input
            value={props.fields.image}
            placeholder="Image"
            type="text"
            name="image"
            className="validate"
            onChange={props.onInputChange}
          />
        </div>
        <div className="input-field col s12">
          <input
            value={props.fields.link}
            placeholder="Link"
            type="text"
            name="link"
            className="validate"
            onChange={props.onInputChange}
          />
        </div>
        <div>
          <a
            className="waves-effect waves-teal btn-flat"
            onClick={props.handleSubmit}
          >
            ADD PIN
          </a>
        </div>
      </form>
    </div>
  );
};

export default Modal;
