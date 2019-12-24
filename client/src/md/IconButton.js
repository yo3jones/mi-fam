import React, { useRef } from 'react';
import './IconButton.css';

const forceRedraw = ({ current: el }) => el.offsetHeight;

export default ({ icon: Icon }) => {
  const button = useRef();
  const handleClick = () => {
    const {
      current: { classList },
    } = button;

    classList.remove('animate');

    forceRedraw(button);

    classList.add('animate');
  };
  return (
    <button
      ref={button}
      className="MdIconButton"
      onClick={handleClick}
      type="button"
    >
      <Icon />
    </button>
  );
};
