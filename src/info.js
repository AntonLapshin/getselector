import { addStyle } from './helper';

const STYLES = `
    .gs_message {
        position: fixed;
        left: 10px;
        bottom: 10px;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25);
        padding: 10px;
        display: none;
        background-color: #fff;
    }

    .gs_message.gs_show {
        display: inline-block;
    }
`;

addStyle(STYLES);

const message = document.createElement('div');
message.className = 'gs_message';
document.body.appendChild(message);

export const showMessage = html => {
  message.innerHTML = html;
  message.classList.toggle('gs_show', true);
};
