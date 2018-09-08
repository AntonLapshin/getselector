import { init, toggle } from "./app";

!(() => {
  const global = window.__gs = window.__gs || {};

  if (global.isInit){
    toggle(global);
  } else {
    init(global);
    toggle(global);
  }
})();
/*
!(() => {


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
})();
*/