import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(props)
export default class Spinner extends Component {
  render() {
    let className = 'sk-cube-grid ' + (this.props.active ? ' show' : '');
    return (
      <div className={className}>
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
        <div className="sk-cube sk-cube3"></div>
        <div className="sk-cube sk-cube4"></div>
        <div className="sk-cube sk-cube5"></div>
        <div className="sk-cube sk-cube6"></div>
        <div className="sk-cube sk-cube7"></div>
        <div className="sk-cube sk-cube8"></div>
        <div className="sk-cube sk-cube9"></div>
      </div>
    );
  }
}

function props(state) {
  return {
    active: state.get('spinner')
  }
}
