import React, { Component } from 'react';

export const MENU_WIDTH = 245;

export default class Menu extends Component {
  render() {
    let { items, active, style, id } = this.props;
    items = items || [];

    let els = items.map((item, index) => {
      let enabled = typeof item.enabled === 'function' ? item.enabled() : true
      let className = enabled ? '' : 'disabled';

      return <li key={index} className={className} onClick={item.action.bind(this)}>{item.name}</li>
    });
    let className = 'menu ' + (active ? 'active' : '');

    return (
      <div className={className} style={style} id={id}>
        <ul>{els}</ul>
      </div>
    );
  }
}