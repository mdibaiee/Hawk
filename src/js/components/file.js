import React, { Component } from 'react';
import store from 'store';
import changedir from 'actions/changedir';

export default class File extends Component {
  render() {
    return (
      <div onClick={this.peekInside.bind(this)}>
        <p>{this.props.index}. {this.props.name}</p>
      </div>
    );
  }

  peekInside() {
    let file = store.getState().get('files')[this.props.index];

    console.log(file);
    store.dispatch(changedir(file.path.slice(1) + file.name));
  }
}
