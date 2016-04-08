import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { template } from 'utils';
import Hammer from 'react-hammerjs';

export default class Dialog extends Component {
  render() {
    let { input, title, description, active } = this.props;
    let conditionalInput = input ? <input ref='input' /> : '';

    let buttons = this.props.buttons.map((button, i) => {
      return (
        <Hammer onTap={button.action.bind(this)}>
          <button className={button.className + ' btn'} key={i}>
            {button.text}
          </button>
        </Hammer>
      )
    });

    let groupButtons = [];

    for (let i = 0; i < buttons.length; i++) {
      if (i % 2 === 0) {
        groupButtons.push(
          <div className='foot' key={i / 2}>
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

  componentDidUpdate() {
    if (!this.props.value) return;

    let input = this.refs.input;

    input.value = this.props.value;
  }
}
