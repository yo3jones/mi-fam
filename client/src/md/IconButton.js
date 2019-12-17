import React, { useRef } from 'react';
import './IconButton.css';

const _forceRedraw = ({ current: el }) => el.offsetHeight;

export default ({ icon: Icon }) => {
  const _button = useRef();
  const _handleClick = () => {
    const {
      current: { classList },
    } = _button;

    classList.remove('animate');

    _forceRedraw(_button);

    classList.add('animate');
  };
  return (
    <button ref={_button} className="MdIconButton" onClick={_handleClick}>
      <Icon />
    </button>
  );
};
