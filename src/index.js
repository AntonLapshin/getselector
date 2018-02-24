//import debounce from 'lodash/debounce';

const throttle = function(fn, threshhold = 250, scope) {
  let last, deferTimer;
  return function() {
    const now = +new Date(),
      args = arguments;
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(scope, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(scope, args);
    }
  };
};

const STYLES = `
    .gs_hover {
        background: repeating-linear-gradient(
            45deg,
            #606dbc,
            #606dbc 10px,
            #465298 10px,
            #465298 20px
        );
        opacity: 0.7;
        transition: all ease 200ms;
        cursor: pointer;
    }
`;

const styleTag = document.createElement('style');
styleTag.innerHTML = STYLES;
document.head.appendChild(styleTag);

const items = new Set();

const onMouseOver = throttle(function(e) {
  items.add(e.target);
  e.target.classList.add('gs_hover');
}, 200);

const onMouseOut = throttle(function(e) {
  items.forEach(e => e.classList.remove('gs_hover'));
  items.clear();
}, 200);

document.addEventListener('mouseover', onMouseOver);
document.addEventListener('mouseout', onMouseOut);
