import React, { memo, useEffect, useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import p5 from 'p5';

import css from './P5Wrapper.module.css';

let canvas = null;

const P5Wrapper = ({ sketch = () => {}, responsive }) => {
  const wrapper = useRef(null);

  useEffect(() => {
    canvas = new p5(sketch, wrapper.current);
    if (responsive === true && canvas && canvas.redrawWithProps) {
      canvas.redrawWithProps({
        width: wrapper.current.offsetWidth,
        height: wrapper.current.offsetHeight,
      });
    }

    return () => {
      canvas.remove();
    };
  }, [sketch, responsive]);

  return (
    <div
      className={classnames(css.root, { [css.responsive]: responsive })}
      ref={wrapper}></div>
  );
};

P5Wrapper.propTypes = {
  sketch: PropTypes.func,
};

P5Wrapper.defaultProps = {
  dispatch: () => {},
  sketch: () => {},
};

export default P5Wrapper;
