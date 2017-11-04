import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SignUpAction } from '../actions';

const validate = person => {
  const errors = {};

  if (!person.email) errors.email = 'Email is required';
  if (!person.password) errors.password = 'Password is required';
  if (person.password.length < 5)
    errors.password = 'Password must be at least 5 characters';
  if (person.password !== person.confirmation) {
    errors.password = 'Password must match confirmation';
    errors.confirmation = 'Password must match confirmation';
  }
  return errors;
};

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        email: '',
        password: '',
        confirmation: ''
      },
      fieldErrors: {}
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onInputChange(evt) {
    const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields });
  }
  handleSubmit(evt) {
    evt.preventDefault();

    const person = this.state.fields;
    const fieldErrors = validate(person);
    this.setState({ fieldErrors });
    //console.log(fieldErrors);
    if (Object.keys(fieldErrors).length) return;

    this.props.SignUpAction(this.state.fields, this.props.history);
  }
  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                value={this.state.fields.email}
                onChange={this.onInputChange}
                name="email"
                type="email"
                className="validate"
                placeholder="Email"
              />
              <span style={{ color: 'red' }}>
                {this.state.fieldErrors.email}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                value={this.state.fields.password}
                onChange={this.onInputChange}
                name="password"
                type="password"
                className="validate"
                placeholder="Password"
              />
              <span style={{ color: 'red' }}>
                {this.state.fieldErrors.password}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                value={this.state.fields.confirmation}
                onChange={this.onInputChange}
                name="confirmation"
                type="password"
                className="validate"
                placeholder="Confirm Password"
              />
              <span style={{ color: 'red' }}>
                {this.state.fieldErrors.confirmation}
              </span>
            </div>
          </div>
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Submit
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null, { SignUpAction })(Signup);
