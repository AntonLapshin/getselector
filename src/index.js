import finder from '@medv/finder';
import throttle from 'lodash/throttle';
import { addStyle } from './helper';
import { showMessage, hideMessage } from './info';
import { copy } from './clipboard';

const STYLES = `
    .gs_hover {
        background: repeating-linear-gradient(
            135deg,
            rgba(126,139,218,0.3),
            rgba(126,139,218,0.3) 10px,
            rgba(70,82,152,0.3) 10px,
            rgba(70,82,152,0.3) 20px
        );
        cursor: pointer;
    }
`;

let initialized = false;
let items = null;
let activeItem = null;

const onMouseOver = throttle(function(e) {
  activeItem = e.target;
  items.add(activeItem);
  activeItem.classList.add('gs_hover');
  const name = activeItem.nodeName.toLowerCase();
  const id = activeItem.id ? '#' + activeItem.id : '';
  const className = activeItem.className.replace
    ? activeItem.className
        .replace('gs_hover', '')
        .trim()
        .replace(/ /gi, '.')
    : '';
  const message = name + id + (className.length > 0 ? '.' + className : '');
  showMessage(message);
}, 200);

const clear = () => {
  items.forEach(e => e.classList.remove('gs_hover'));
  items.clear();
};

const onMouseOut = throttle(clear, 200);

const onMouseDown = e => {
  if (!activeItem) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  activeItem.classList.remove('gs_hover');
  const selector = finder(activeItem);
  console.log('[GetSelector]: Copied to Clipboard: ' + selector, activeItem);
  copy(selector);
  return false;
};

let state = false;
window.GetSelectorToggle = () => {
  state = !state;
  const action = state ? 'addEventListener' : 'removeEventListener';
  document[action]('mouseover', onMouseOver);
  document[action]('mouseout', onMouseOut);
  document[action]('mousedown', onMouseDown);
  console.log('[GetSelector]: ' + state);
  if (!state) {
    clear();
    hideMessage();
  }
};

(() => {
  if (initialized) {
    return;
  }
  addStyle(STYLES);
  items = new Set();
  console.log('[GetSelector]: injected');

  //window.GetSelectorToggle();
  initialized = true;
})();
