import React, { useRef } from 'react';
import './Button.css';

export default ({ className, label, handleClick }) => {
  const buttonRef = useRef();
  const rippleRef = useRef();

  const handleButtonClick = e => {
    const { current: button } = buttonRef;
    const { current: ripple } = rippleRef;

    ripple.classList.remove('animate');

    const dimension = Math.min(button.offsetWidth, button.offsetHeight);

    ripple.style.width = `${dimension}px`;
    ripple.style.height = `${dimension}px`;

    const x = e.pageX - button.offsetLeft - dimension / 2;
    const y = e.pageY - button.offsetTop - dimension / 2;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    ripple.classList.add('animate');

    if (handleClick) {
      handleClick();
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`Button ${className}`}
      onClick={handleButtonClick}
    >
      <span className="Button-label">{label}</span>
      <span className="Button-ripple" ref={rippleRef} />
    </button>
  );
};
