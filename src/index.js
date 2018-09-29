import { init, toggle } from "./app";

!(() => {
  const global = window.__gs = window.__gs || {};

  if (global.isInit){
    toggle(global);
  } else {
    console.log("[GetSelector]: Injected");
    init(global);
    toggle(global);
  }
})();