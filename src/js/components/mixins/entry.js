export default {
  contextMenu(e) {
    e.preventDefault();

    let file = store.getState().get('files')[this.props.index];
    let rect = React.findDOMNode(this.refs.container).getBoundingClientRect();
    let {x, y, width, height} = rect;

    let left = x + width / 2 - MENU_WIDTH / 2,
        top  = y + height / 2 + MENU_TOP_SPACE;
    store.dispatch(show('fileMenu', {style: {left, top}}));
    store.dispatch(active([file]));
  },

  select() {
    let current = store.getState().get('activeFile').slice(0);
    let file = store.getState().get('files')[this.props.index];

    if (current.indexOf(file) > -1) {
      current.splice(current.indexOf(file), 1);
    } else {
      current.push(file)
    }
    store.dispatch(active(current));
  }
}
