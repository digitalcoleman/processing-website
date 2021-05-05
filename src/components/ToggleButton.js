import React from 'react';
import classnames from 'classnames';

import css from './ToggleButton.module.css';

const ToggleButton = ({
  className,
  onToggle,
  defaultLabel,
  pressedLabel,
  ariaLabel,
  toggle = false
}) => {
  const style = classnames(css.root, className);
  const states = {
    default: defaultLabel ? defaultLabel : 'off',
    pressed: pressedLabel ? pressedLabel : 'on'
  };

  const toggleButton = (e) => {
    onToggle(!toggle);
  };

  return (
    <button
      aria-label={ariaLabel}
      aria-pressed={toggle}
      className={style}
      onClick={(e) => toggleButton(e)}>
      <div>
        <span className={classnames({ [css.pressedText]: toggle })}>
          {states.default}
        </span>
        <span className={classnames({ [css.pressedText]: !toggle })}>
          {states.pressed}
        </span>
      </div>
      <div className={classnames(css.pressed, css[`slide${toggle ? 0 : 1}`])} />
    </button>
  );
};

export default ToggleButton;
