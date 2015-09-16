import React, { Component } from 'react';
import { template } from 'utils';

export default class Dialog extends Component {
  render() {
    let { input, title, description, active, value } = this.props;
    let conditionalInput = input ? <input ref='input' value={value} /> : '';

    let buttons = this.props.buttons.map((button, i) => {
      return (
        <button className={button.className + ' btn'} key={i}
                onClick={button.action.bind(this)}>
          {button.text}
        </button>
      )
    });

    let groupButtons = [];

    for (let i = 0; i < buttons.length; i++) {
      if (i % 2 === 0) {
        groupButtons.push(
          <div className='foot'>
            {buttons[i]}
            {buttons[i+1]}
          </div>
        )
      }
    }

    let className = active ? 'dialog active' : 'dialog';

    return (
      <div className={className}>
        <p className='regular-medium'>{title}</p>
        <p className='light-medium'>{description}</p>

        {conditionalInput}

        {groupButtons}
      </div>
    )
  }
}
