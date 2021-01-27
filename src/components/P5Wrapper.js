import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function (id) {
  let canvas = null;

  const P5Wrapper = ({ sketch = () => {}, state = {} }) => {
    console.log(`::: P5Wrapper(${id}) component has been re-rendered`);

    const sketchContainer = useRef(null);

    useEffect(() => {
      console.log(`::: P5Wrapper(${id})/useEffect()`);
      canvas = new window.p5(sketch, sketchContainer.current);
      canvas.state = state;

      return () => {
        console.log(`::: P5Wrapper(${id})/useEffect.return()`);
        canvas.remove();
      };
    }, [sketch, state]);

    return <div ref={sketchContainer} className="section"></div>;
  };

  P5Wrapper.propTypes = {
    state: PropTypes.object,

    dispatch: PropTypes.func,
    sketch: PropTypes.func,
  };

  P5Wrapper.defaultProps = {
    state: {},

    dispatch: () => {},
    sketch: () => {},
  };

  return memo(P5Wrapper, (_, nextProps) => {
    canvas.state = { ...nextProps.state };

    return true;
  });
}
