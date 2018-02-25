export const addStyle = style => {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = style;
  document.head.appendChild(styleTag);
};
