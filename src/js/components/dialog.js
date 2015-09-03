import React, { Component } from 'react';
import { template } from 'utils';

export default class Dialog extends Component {
  render() {
    let { input, title, description, active } = this.props;
    let conditionalInput = input ? <input ref='input' /> : '';

    let buttons = this.props.buttons.map((button, i) => {
      return <button className={button.className + ' btn'} key={i}
                     onClick={button.action.bind(this)}>
                      {button.text}
            </button>;
    });

    let className = active ? 'dialog active' : 'dialog';

    return (
      <div className={className}>
        <p className='regular-medium'>{title}</p>
        <p className='light-medium'>{description}</p>

        {conditionalInput}

        <div className='foot'>
          {buttons}
        </div>
      </div>
    )
  }
}
