import React, { Component } from 'react';

class Card extends Component {
  render() {
    return(
      <div className="card">
        <div className="card-body">
          <h2>{this.props.category}</h2>
          <p>{this.props.value}</p>
          <h5>{this.props.created_at}</h5>
        </div>
      </div>
    )
  }
}
export default Card;