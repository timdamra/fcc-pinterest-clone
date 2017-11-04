import React, { Component } from 'react';
import axios from 'axios';

class EditPin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        title: props.val.title,
        image: props.val.image,
        link: props.val.link
      },
      show: false
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  onInputChange(evt) {
    const { fields } = this.state;
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields });
  }
  handleEdit(e) {
    e.preventDefault();

    this.setState(prevState => {
      return { show: !prevState.show };
    });
  }
  handleDelete(e) {
    e.preventDefault();

    axios
      .get(`/api/deletepin/${this.props.id}`)
      .then(response => {
        if (response.status === 200) {
          this.props.history.push('/');
        }
      })
      .catch(err => console.log(err));
  }
  handleSubmit(e) {
    e.preventDefault();
    const { fields } = this.state;

    this.setState({ fields });

    axios
      .post(`/api/editpin/${this.props.id}`, fields)
      .then(pin => {
        console.log(pin);
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }
  render() {
    let bool = null;
    const { show } = this.state;
    if (show) {
      bool = (
        <form onSubmit={this.handleSubmit} className="col s11">
          <div className="input-field col s10">
            <input
              name="title"
              value={this.state.fields.title}
              onChange={this.onInputChange}
              placeholder="Title"
              type="text"
              className="validate"
            />
          </div>
          <div className="input-field col s10">
            <input
              name="image"
              value={this.state.fields.image}
              onChange={this.onInputChange}
              placeholder="Image"
              type="text"
              className="validate"
            />
          </div>
          <div className="input-field col s10">
            <input
              name="link"
              value={this.state.fields.link}
              onChange={this.onInputChange}
              placeholder="Link"
              type="text"
              className="validate"
            />
          </div>
          <div className="input-field col s4">
            <button className="btn waves-effect waves-light" type="submit">
              Submit
              <i className="material-icons right">send</i>
            </button>
            <button
              onClick={this.handleEdit}
              className="btn waves-effect waves-light"
            >
              Cancel
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      );
    }

    return (
      <li key={this.props.i} className="collection-item avatar">
        <img src={this.state.fields.image} alt="NA" className="circle" />
        <span className="title">{this.state.fields.title}</span>
        <br />
        <a onClick={this.handleEdit}>Edit</a>
        <a onClick={this.handleDelete} className="secondary-content">
          Delete
        </a>
        {bool}
      </li>
    );
  }
}

export default EditPin;
