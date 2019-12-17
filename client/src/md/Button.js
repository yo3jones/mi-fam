import React, { useRef } from 'react';
import './Button.css';

export default ({ handleClick, children }) => {
  const _button = useRef();
  const _span = useRef();

  const _handleClick = e => {
    _span.current.classList.remove('animate');
    const x = e.pageX - _button.current.offsetLeft;
    const y = e.pageY - _button.current.offsetTop;

    _span.current.style.left = `${x}px`;
    _span.current.style.top = `${y}px`;

    _span.current.classList.add('animate');

    if (handleClick) {
      handleClick();
    }
  };

  return (
    <button ref={_button} className="Button" onClick={_handleClick}>
      {children}
      <span ref={_span} />
    </button>
  );
};
