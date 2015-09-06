const MESSAGES = {
  'icon-plus': 'Create Files and Folders',
  'icon-refresh': 'Refresh File List',
  'icon-select': 'Select files for batch actions',
  'icon-more': 'Actions used on selected files such as Copy, Delete, Move, …',
  'drawer': 'Extra options, tools and links are here',
  'icon-search': 'Search your storage for a certain file',
  'swipe-instruction': 'Swipe from left to right to go to parent folder'
}

const DIALOG_HIDE_DELAY = 2000;

export default function() {
  let tourRan = localStorage.getItem('tourRan');
  let wrapper = document.querySelector('#wrapper');
  let tour = document.querySelector('.tour-dialog');

  let timeout;
  let shown = 0;

  if (!tourRan) {
    wrapper.classList.add('tour');

    let items = [...document.querySelectorAll('.tour-item')].sort((a, b) => {
      return (+a.dataset.index) - (+b.dataset.index);
    });

    let listeners = [];

    for (let item of items) {

      let firstClass = item.className.slice(0, item.className.indexOf(' '));
      let ev = firstClass === 'drawer' ? 'touchstart' : 'click';

      item.addEventListener(ev, function listener(e) {
        e.preventDefault();
        e.stopPropagation();

        clearTimeout(timeout);
        listeners.push({item, listener, ev});

        shown++;

        tour.innerHTML = MESSAGES[firstClass];

        timeout = setTimeout(() => {
          if (shown >= items.length) {
            wrapper.classList.remove('tour');
            localStorage.setItem('tourRan', 'true');

            for (let {item, listener, ev} of listeners) {
              console.log(item, listener);
              item.removeEventListener(ev, listener);
            }
          }
        }, DIALOG_HIDE_DELAY);
      });
    }
  }
}
