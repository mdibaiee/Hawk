import React, { Component } from 'react';

export const MENU_WIDTH = 245;

export default class Menu extends Component {
  render() {
    let { items, active, style } = this.props;
    items = items || [];

    let els = items.map((item, index) => {
      let disabled = !(typeof item.enabled === 'function' ? item.enabled() : true)
      let className = disabled ? 'disabled' : '';

      return <li key={index} className={className} onClick={item.action.bind(this)}>{item.name}</li>
    });
    let className = 'menu ' + (active ? 'active' : '');

    return (
      <div className={className} style={style}>
        <ul>{els}</ul>
      </div>
    );
  }
}
