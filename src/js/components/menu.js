import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Hammer from 'react-hammerjs';

export const MENU_WIDTH = 245;

export default class Menu extends Component {
  render() {
    let { items, active, style, id } = this.props;
    items = items || [];

    let els = items.map((item, index) => {
      let enabled = typeof item.enabled === 'function' ? item.enabled() : true
      let className = enabled ? '' : 'disabled';

      return (
        <Hammer key={index} onTap={item.action.bind(this)}>
          <li className={className}>{item.name}</li>
        </Hammer>
      );
    });
    let className = 'menu ' + (active ? 'active' : '');

    return (
      <div className={className} style={style} id={id}>
        <ul>{els}</ul>
      </div>
    );
  }
}
