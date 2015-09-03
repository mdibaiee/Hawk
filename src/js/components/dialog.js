import React, { Component } from 'react';

export default class Dialog extends Component {
  render() {
    let conditionalInput = this.props.input ? <input ref='input' /> : '';
    let buttons = this.props.buttons.map((button, i) => {
      return <button className={button.className + ' btn'} key={i}
                     onClick={button.action.bind(this)}>
                      {button.text}
            </button>;
    });

    let className = this.props.active ? 'dialog active' : 'dialog';

    return (
      <div className={className}>
        <p className='regular-medium'>{this.props.title}</p>
        <p className='light-medium'>{this.props.description}</p>

        {conditionalInput}

        <div className='foot'>
          {buttons}
        </div>
      </div>
    )
  }
}
