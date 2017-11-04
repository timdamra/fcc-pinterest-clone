import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import MyWrapper from './MyWrapper';
import Add from './Add';
import Modal from './Modal';

import { fetchMyPins } from '../actions';

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      fields: {
        title: '',
        link: '',
        image: ''
      },
      pins: []
    };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchMyPins();
    axios
      .get('/api/allpins')
      .then(pins => {
        console.log(pins);
        this.setState({ pins: pins.data });
      })
      .catch(err => console.log(err));
  }
  onInputChange(evt) {
    const { fields } = this.state;
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields });
  }
  toggle(event) {
    //event.preventDefault();
    if (!this.state.show) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.toggle();

    axios
      .post('/api/addpin', this.state.fields)
      .then(response => {
        console.log(response.data);
        this.setState({ pins: response.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { show } = this.state;
    let bool = null;

    if (show) {
      bool = (
        <Modal
          fields={this.state.fields}
          toggle={this.toggle}
          handleSubmit={this.handleSubmit}
          show={this.state.show}
          onInputChange={this.onInputChange}
        />
      );
    } else {
      bool = null;
    }
    return (
      <div>
        <Add auth={this.props.auth} toggle={this.toggle} />
        {bool}
        <MyWrapper pins={this.state.pins} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pins: state.myPins,
    auth: state.auth.auth
  };
}

export default withRouter(
  connect(mapStateToProps, { fetchMyPins })(HomeContainer)
);
