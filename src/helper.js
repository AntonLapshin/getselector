export const getOffset = e => {
    let top = 0, left = 0;
    do {
        top += e.offsetTop  || 0;
        left += e.offsetLeft || 0;
        e = e.offsetParent;
    } while(e);

    return {
        top: top,
        left: left
    };
};

export const addStyle = style => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    document.head.appendChild(styleTag);    
}