import React from 'react'
import {Circle, Group, Rect, Shape, Text} from 'react-konva';
import Triangle from '../Shapes/Triangle';
import And from '../Shapes/And';
import Nand from '../Shapes/Nand';
import Or from '../Shapes/Or';
import Nor from '../Shapes/Nor';
import Xor from '../Shapes/Xor';
import Xnor from '../Shapes/Xnor';
const SimRect = ({Rx = 0, Ry = 0, Rw = 100, Rh = 100, Tfz = 40, text, focusElement = false, ...props}) => {
  return (
    <Group onClick={() => props.setFocusElement(props.id)}>
        <Rect
            x={Rx}
            y={Ry}
            width={Rw}
            height={Rh}
            fill={focusElement ? "yellow" : "white"}
            stroke={focusElement ? 'green' : (props.type === 'Output' ? 'pink' : 'gray') }
            strokeWidth={5}
        />
        {
          props.type === 'Output' || props.type === 'Input' ?
            <Text 
                x={Rx + 0.4 * Rw/( Math.ceil(props.bitWidth / 3) === 0 ? 1 : Math.ceil(props.bitWidth / 1.5))}
                y={Ry + 0.35 * Rh}
                fontSize={Tfz/( Math.ceil(props.bitWidth / 3) === 0 ? 1 : Math.ceil(props.bitWidth / 4))}
                text={(props.type === 'Output' || props.type === 'Input') ? 
                  '0'.repeat(props.bitWidth - Number(props.value).toString(2).length > 0 && props.value >= 0 ? props.bitWidth - Number(props.value).toString(2).length : 0) + Number(props.value).toString(2) 
                  : 
                  text
                }
                align= {'center'}
            /> 
          :
            <Text 
              x={Rx + 40}
              y={Ry + 0.35 * Rh}
              fontSize={Tfz}
              text={(props.type === 'Output' || props.type === 'Input') ? 
                '0'.repeat(props.bitWidth - Number(props.value).toString(2).length > 0 && props.value >= 0 ? props.bitWidth - Number(props.value).toString(2).length : 0) + Number(props.value).toString(2) 
                : 
                text
              }
              align= {'center'}
            />
        }
        { (props.type === 'Not' || props.type === 'Nand' || props.type === 'Nor' || props.type === 'Not' || props.type === 'Xnor') ? 
        <Circle
            x={Rw}
            y={Rh / 2}
            radius={10}
            fill="white"
            stroke={focusElement ? 'green' : 'gray'}
            strokeWidth={4}
        />
        : null
        }

        {/* <Xnor {...{Rx, Ry, Rw, Rh, Tfz, text, focusElement, props}}/> */}
    </Group>
  )
}

export default SimRect