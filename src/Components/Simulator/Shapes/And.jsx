import React from 'react'
import {Shape} from 'react-konva';
function And({Rx = 0, Ry = 0, Rw = 100, Rh = 100, Tfz = 40, text, focusElement = false, ...props}) {
  return (
    <Shape
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(0, 0);
              context.lineTo(Rw/2, 0);
              context.arc(Rw/2, Rh/2, Rw/2, -Math.PI /2, Math.PI /2, 0);
              context.lineTo(0, Rh);
              context.closePath();
              context.fillStrokeShape(shape);
            }}
            fill="white"
            stroke={focusElement ? 'green' : 'gray'}
            strokeWidth={4}
        />
  )
}

export default And