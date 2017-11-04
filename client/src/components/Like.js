import React, { Component } from 'react';
import axios from 'axios';

class Like extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numOfLikes: this.props.likes,
      liked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (!this.state.liked) {
      this.setState({ numOfLikes: this.state.numOfLikes + 1, liked: true });
    }
    if (this.state.liked) {
      this.setState({ numOfLikes: this.state.numOfLikes - 1, liked: false });
    }

    axios
      .get(`/api/pin/likes/${this.props.id}`)
      .then(pin => console.log(pin))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="card-content">
        <div className="row">
          <div className="col s6">
            <i
              style={{ cursor: 'pointer' }}
              className="medium material-icons left-align"
              onClick={this.handleClick}
            >
              thumb_up
            </i>
          </div>
          <div className="col s6">
            <h5
              style={{
                fontWeight: 'bold',
                color: '#7cacf9',
                textAlign: 'right'
              }}
            >
              {this.state.numOfLikes}
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default Like;
