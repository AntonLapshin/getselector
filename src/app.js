import finder from "@medv/finder";
import throttle from "lodash/throttle";
import { addStyle } from "./addStyle";
import { initMessage, showMessage, hideMessage } from "./info";
import { copyToClipboard } from "./clipboard";

const clearEl = el => el && el.classList.remove("gs_hover");

export const toggle = global => {
  const state = !global.state;
  global.state = state;
  const action = state ? "addEventListener" : "removeEventListener";
  document[action]("mouseover", global.selectElement);
  document[action]("mouseout", global.clearElThrottle);
  document[action]("keyup", global.copyToClipboard);

  if (!state) {
    clearEl(global.selectedEl);
    hideMessage(global);
  }
};

export const init = global => {
  global.isInit = true;
  global.selectedEl = null;

  global.clearElThrottle = throttle(
    () => clearEl(global.selectedEl) && hideMessage(global),
    200
  );

  global.selectElement = throttle(e => {
    if (global.selectedEl !== e.target) {
      clearEl(global.selectedEl);
    }
    global.selectedEl = e.target;
    const selectedEl = global.selectedEl;
    selectedEl.classList.add("gs_hover");

    const name = selectedEl.nodeName.toLowerCase();
    const id = selectedEl.id ? "#" + selectedEl.id : "";
    const className = selectedEl.className.replace
      ? selectedEl.className
          .replace("gs_hover", "")
          .trim()
          .replace(/ /gi, ".")
      : "";
    const message = name + id + (className.length > 0 ? "." + className : "");
    showMessage(global, message);
  }, 200);

  global.copyToClipboard = e => {
    console.log(e);
    const { selectedEl } = global;
    if (e.keyCode !== 32 || !selectedEl) {
      return;
    }
    clearEl(selectedEl);
    const selector = finder(selectedEl);
    console.log("[GetSelector]: Copied to Clipboard: " + selector, selectedEl);
    copyToClipboard(selector);
  };

  addStyle(`
    .gs_hover {
      background: repeating-linear-gradient( 135deg, rgba(225, 225, 226, 0.3), rgba(229, 229, 229, 0.3) 10px, rgba(173, 173, 173, 0.3) 10px, rgba(172, 172, 172, 0.3) 20px );
      box-shadow: inset 0px 0px 0px 1px #d7d7d7;
    }
  `);
  initMessage(global);
};
