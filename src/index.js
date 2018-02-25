// import finder from '@medv/finder';
import throttle from 'lodash/throttle';
import { addStyle } from './helper';
import { showMessage } from './info';

// const throttle = function(fn, threshhold = 250, scope) {
//   let last, deferTimer;
//   return function() {
//     const now = +new Date(),
//       args = arguments;
//     if (last && now < last + threshhold) {
//       clearTimeout(deferTimer);
//       deferTimer = setTimeout(() => {
//         last = now;
//         fn.apply(scope, args);
//       }, threshhold);
//     } else {
//       last = now;
//       fn.apply(scope, args);
//     }
//   };
// };

const STYLES = `
    .gs_hover {
        background: repeating-linear-gradient(
            135deg,
            rgba(96,109,188,0.5),
            rgba(96,109,188,0.5) 10px,
            rgba(70,82,152,0.5) 10px,
            rgba(70,82,152,0.5) 20px
        );
        cursor: pointer;
    }
`;

addStyle(STYLES);

const items = new Set();

const onMouseOver = throttle(function(e) {
  items.add(e.target);
  e.target.classList.add('gs_hover');
  const id = e.target.id;
  const className = e.target.className;
  const message =
    (id && id.length > 0 ? `#${id}` : '') +
    (className && className.length > 0
      ? `.${className.replace(/ /gi, '.').replace('.gs_hover', '')} `
      : '');
  showMessage(message);
  // const selector = finder(e.target);
  // console.log(selector);
}, 200);

const onMouseOut = throttle(function(e) {
  items.forEach(e => e.classList.remove('gs_hover'));
  items.clear();
}, 200);

document.addEventListener('mouseover', onMouseOver);
document.addEventListener('mouseout', onMouseOut);

console.log('Get Selector: injected');
