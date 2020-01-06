import React, { useState, useRef, useEffect } from 'react';
import './TextField.css';

export default ({ className, label, helpText, children }) => {
  const [labelPosition, setLabelPosition] = useState('prominent');
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef();

  useEffect(
    () =>
      setHasValue(!!inputRef.current.value) ||
      setLabelPosition(focused || hasValue ? 'condensed' : 'prominent')
  );

  return (
    <div
      className={`TextField ${className}`}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className="TextField-input-wrapper">
        <span className={`TextField-label ${labelPosition}`}>{label}</span>
        {React.Children.map(children, child =>
          React.cloneElement(child, { ref: inputRef })
        )}
      </div>
      <span className="TextField-helper-text">{helpText}</span>
    </div>
  );
};
