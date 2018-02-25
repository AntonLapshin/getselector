import { addStyle } from './helper';

const STYLES = `
    .gs_message {
        position: fixed;
        left: 10px;
        bottom: 10px;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25);
        padding: 8px 10px;
        display: none;
        background-color: #fff !important;
        border: 4px solid #eee;
        z-index: 999999;
    }

    .gs_message.gs_show {
        display: inline-block;
    }
`;

export const showMessage = html => {
  if (!message) {
    throw 'Call init method before';
  }
  message.innerHTML = '[click to find and copy unique css selector] for the selected dom element: ' + html;
  message.classList.toggle('gs_show', true);
};

export const hideMessage = () => {
  message.classList.toggle('gs_show', false);
};

let message = null;

(() => {
  if (message) {
    return;
  }
  addStyle(STYLES);
  message = document.createElement('div');
  message.className = 'gs_message';
  document.body.appendChild(message);
})();
