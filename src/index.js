import { init, toggle } from "./app";

!(() => {
  console.log("GetSelector inject");
  const global = window.__gs = window.__gs || {};

  if (global.isInit){
    toggle(global);
  } else {
    init(global);
    toggle(global);
  }
})();