
; (function (name, definition) {
    if (typeof module !== 'undefined') module.exports = definition();
    else if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
    else this[name] = definition();
}('ElemJS', function () {
    function wrapCurry(func, thisArg) {
        return function (...params) {
            return (func(thisArg, ...params), wrap(thisArg));
        }
    }

    function setClasses(elem, classlist) {
        return ((elem.classList.value = classlist), elem);
    }

    function setText(elem, text) {
        return ((elem.textContent = text), elem);
    }

    function createElem(name) {
        return document.createElement(name);
    }

    function setStyle(elem, name, value) {
        return (elem.style.setProperty(name, value), elem);
    }

    function setStyles(elem, styles) {
        return (Object.entries(styles).forEach(entrie => setStyle(elem, ...entrie)), elem);
    }

    function setAttr(elem, name, value) {
        return (elem.setAttribute(name, value), elem);
    }

    function setAttrs(elem, attrs) {
        return (Object.entries(attrs).forEach(entrie => setAttr(elem, ...entrie)), elem);
    }

    function removeElem(elem) {
        return elem.parentElement.removeChild(elem);
    }

    function removeElems(elems) {
        return Array.from(elems).forEach(removeElem);
    }

    function setHTML(elem, html) {
        return (elem.innerHTML = html, elem);
    }

    function wrap(elem) {
        const wrapper = [setClasses, setText, setStyle, setStyles, setAttr, setAttrs, removeElem, setHTML].reduce((wrapper, func) => (wrapper[func.name] = wrapCurry(func, elem), wrapper), {});

        wrapper.return = function () {
            return elem;
        }

        return wrapper;
    }

    return {
        setClasses,
        setText,
        createElem,
        setStyle,
        setStyles,
        setAttr,
        setAttrs,
        removeElem,
        removeElems,
        wrap
    }
}));