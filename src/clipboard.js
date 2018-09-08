const prepareFake = text => {
  // This approach was inspired by https://clipboardjs.com/
  const isRTL = document.documentElement.getAttribute('dir') == 'rtl';

  const fakeEl = document.createElement('textarea');
  fakeEl.style.fontSize = '12pt';
  fakeEl.style.border = '0';
  fakeEl.style.padding = '0';
  fakeEl.style.margin = '0';
  fakeEl.style.position = 'absolute';
  fakeEl.style[isRTL ? 'right' : 'left'] = '-9999px';
  fakeEl.style.top =
    (window.pageYOffset || document.documentElement.scrollTop) + 'px';
  fakeEl.setAttribute('readonly', '');

  fakeEl.value = text;
  document.body.appendChild(fakeEl);

  fakeEl.focus();
  fakeEl.setSelectionRange(0, fakeEl.value.length);

  return fakeEl;
};

const copyText = () => {
  let result;
  try {
    result = document.execCommand('copy');
  } catch (e) {
    result = false;
  }
  return result;
};

export const copyToClipboard = text => {
  const fake = prepareFake(text);
  const result = copyText();
  document.body.removeChild(fake);
  return result;
};
