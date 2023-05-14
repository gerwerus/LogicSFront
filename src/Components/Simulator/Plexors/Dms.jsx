import React from 'react'
import { Group, Shape, Text } from 'react-konva'
import Anchor from '../SimElement/Anchor/Anchor';

function Dms({Rw = 100, Rh = 100, ...props}) {
  return (
    <Group>
        <Shape
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(0, 0);
              context.lineTo(Rw, 0);
              context.lineTo(Rw, Rh * 2);
              context.lineTo(0, Rh * 2);
              context.closePath();
              context.moveTo(Rw/4, 0);
              context.lineTo(Rw/4, Rh * 2);
              context.moveTo(Rw/4 * 3, 0);
              context.lineTo(Rw/4 * 3, Rh * 2);
              context.moveTo(0, Rh/4 * 6)
              context.lineTo(Rw/4, Rh/4 * 6);
              context.fillStrokeShape(shape);
            }}
            fill={props.focusElement ? "yellow" : "white"}
            stroke={props.focusElement ? 'green' : 'gray'}
            strokeWidth={4}
        />
        {
          [...Array(Math.pow(2, props.controlSize)).keys()].map(x => (
            <Text 
              x={Rw - 20}
              y={(x + 1) * ((Rh/4 * 6) / (Math.pow(2, props.controlSize) + 1)) - 7}
              fontSize={15}
              text={'x' + x}
            /> 
          ))
        }
        <Text
          x={7}
          y={Rh/4 * 7 - 5}
          fontSize={15}
          text={'A'}
        />
        <Text
          x={7}
          y={Rh/2 - 5}
          fontSize={15}
          text={'F'}
        />
        <Text
          x={Rw/2 - 15}
          y={5}
          fontSize={15}
          text={'DMS'}
        />
        <Group>
          <Anchor x={0} y={Rh/2} handleWire={() => props.handleWire('in')}/> 
          {
            [...Array(Math.pow(2, props.controlSize)).keys()].map(x => (
              <Anchor 
                x={Rw}
                y={(x + 1) * ((Rh/4 * 6) / (Math.pow(2, props.controlSize) + 1)) }
                handleWire={() => props.handleWire('out')}
              /> 
            ))
          }
          <Anchor x={0} y={Rh/4 * 7} handleWire={() => props.handleWire('cin')}/> 
        </Group>
    </Group>
  )
}

export default Dms