import { addStyle } from "./addStyle";

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

export const showMessage = (global, html) => {
  global.message.innerHTML = `You hovered: <b>${html}</b> Press [Space] to find Unique Selector and copy it to Clipboard`;
  global.message.classList.toggle("gs_show", true);
};

export const hideMessage = global => {
  global.message.classList.toggle("gs_show", false);
};

export const initMessage = global => {
  addStyle(STYLES);
  global.message = document.createElement("div");
  global.message.className = "gs_message";
  document.body.appendChild(global.message);
};
