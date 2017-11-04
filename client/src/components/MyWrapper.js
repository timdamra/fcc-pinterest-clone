import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import Like from './Like';

class MyWrapper extends React.Component {
  render() {
    if (this.props.pins.length === 0) {
      return <h3>No pins to display yet</h3>;
    }
    return (
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {this.props.pins.map((val, i) => (
            <div className="row">
              <div className="col s12 m7">
                <div className="card">
                  <div className="card-image">
                    <img
                      key={i}
                      alt="NA"
                      src={val.image}
                      style={{ width: '100%', display: 'block' }}
                    />
                    <span className="card-title">{val.title}</span>
                  </div>
                  <Like id={val._id} likes={val.likes.length} />
                  <div className="card-action">
                    <a href={val.link}>Visit</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    );
  }
}

export default MyWrapper;
