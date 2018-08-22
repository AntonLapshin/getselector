import finder from "@medv/finder";
import throttle from "lodash/throttle";
import { addStyle } from "./addStyle";
import { showMessage, hideMessage } from "./info";
import { copy } from "./clipboard";

!(() => {
  if (window.__gs && window.__gs.initialized) {
    window.__gs.toggle();
    return;
  }

  const gs = (window.__gs = {
    state: false,
    items: new Set(),
    activeItem: null,
    finder,
    throttle,
    showMessage,
    hideMessage,
    copy
  });

  //
  // Clear the current state
  //
  gs.clear = () => {
    gs.items.forEach(e => e.classList.remove("gs_hover"));
    gs.items.clear();
  };

  //
  // Toggle the extension
  //
  gs.toggle = () => {
    gs.state = !gs.state;
    const action = gs.state ? "addEventListener" : "removeEventListener";
    document[action]("mouseover", gs.onMouseOver);
    document[action]("mouseout", gs.onMouseOut);
    document[action]("mousedown", gs.onMouseDown);
    if (!gs.state) {
      gs.clear();
      gs.hideMessage();
    }
  };

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

  gs.onMouseOver = throttle(function(e) {
    gs.activeItem = e.target;
    gs.items.add(gs.activeItem);
    gs.activeItem.classList.add("gs_hover");
    const name = gs.activeItem.nodeName.toLowerCase();
    const id = gs.activeItem.id ? "#" + gs.activeItem.id : "";
    const className = gs.activeItem.className.replace
      ? gs.activeItem.className
          .replace("gs_hover", "")
          .trim()
          .replace(/ /gi, ".")
      : "";
    const message = name + id + (className.length > 0 ? "." + className : "");
    gs.showMessage(message);
  }, 200);

  gs.onMouseOut = throttle(gs.clear, 200);

  gs.onMouseDown = e => {
    if (!gs.activeItem) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    gs.activeItem.classList.remove("gs_hover");
    const selector = gs.finder(gs.activeItem);
    console.log(
      "[GetSelector]: Copied to Clipboard: " + selector,
      gs.activeItem
    );
    gs.copy(selector);
    return false;
  };

  addStyle(STYLES);

  gs.initialized = true;
  gs.toggle();
})();
