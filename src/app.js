import finder from "@medv/finder";
import debounce from "lodash/debounce";
import { addStyle } from "./addStyle";
import { initMessage, showMessage, hideMessage } from "./info";
import { copyToClipboard } from "./clipboard";

const clearEl = el => el && el.classList.remove("gs_hover");

export const toggle = global => {
  const state = !global.state;
  global.state = state;
  const action = state ? "addEventListener" : "removeEventListener";
  document[action]("mouseover", global.selectElement);
  document[action]("mouseout", global.clearElDebounce);

  if (!state) {
    clearEl(global.selectedEl);
    global.copiedEl && global.copiedEl.classList.remove("gs_copied");
    hideMessage(global);
  }
};

export const init = global => {
  global.isInit = true;
  global.selectedEl = null;

  global.clearElDebounce = debounce(
    () => clearEl(global.selectedEl) && hideMessage(global),
    200
  );

  global.selectElement = debounce(e => {
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

  global.copyToClipboard = () => {
    const { selectedEl } = global;
    if (!selectedEl) {
      return;
    }
    global.copiedEl && global.copiedEl.classList.remove("gs_copied");
    clearEl(selectedEl);
    const selector = finder(selectedEl);
    console.log("[GetSelector]: Copied to Clipboard: " + selector, selectedEl);
    copyToClipboard(selector);

    global.copiedEl = selectedEl;
    global.copiedEl.classList.add("gs_copied");
  };

  addStyle(`
    .gs_hover {
      background: repeating-linear-gradient( 135deg, rgba(225, 225, 226, 0.3), rgba(229, 229, 229, 0.3) 10px, rgba(173, 173, 173, 0.3) 10px, rgba(172, 172, 172, 0.3) 20px );
      box-shadow: inset 0px 0px 0px 1px #d7d7d7;
    }

    .gs_copied {
      background: repeating-linear-gradient( 135deg, rgba(183, 240, 200, 0.3), rgba(192, 231, 194, 0.3) 10px, rgba(124, 189, 126, 0.3) 10px, rgba(137, 180, 129, 0.3) 20px ) !important;
      box-shadow: inset 0px 0px 0px 1px #c4d9c2 !important;      
    }
  `);
  initMessage(global); 
};
