import React, { useState, useRef } from 'react';
import './TextField.css';

// const isMeta = e => e.altKey || e.ctrlKey || e.metaKey;
//
// const isPrintableKeyboardEvent = e =>
//   !e.defaultPrevented && !isMeta(e) && [...e.key].length === 1;

export default ({
  className,
  value,
  label,
  type = 'text',
  helpText,
  handleChange,
}) => {
  const [focus, setFocus] = useState(false);

  const inputRef = useRef(null);

  const labelPostion = value || focus ? 'condensed' : 'prominent';

  const onChange = () => {
    handleChange({ value: inputRef.current.value });
  };

  return (
    <div className={`TextField ${className}`}>
      <div className="TextField-input-wrapper">
        <span className={`TextField-label ${labelPostion}`}>{label}</span>
        <input
          className="TextField-input"
          type={type}
          ref={inputRef}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={value}
          onChange={onChange}
        />
      </div>
      <span className="TextField-helper-text">{helpText}</span>
    </div>
  );
};
