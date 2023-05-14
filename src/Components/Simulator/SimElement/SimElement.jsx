import React, { useState } from 'react'
import { Group, Line, Shape, Text} from 'react-konva';
import SimRect from '../SimRect/SimRect';
import Anchor from './Anchor/Anchor'; 
import Ms from '../Plexors/Ms';
import Dms from '../Plexors/Dms';
import Cd from '../Plexors/Cd';
import Dc from '../Plexors/Dc';

// function getMousePos(e) {
//   const position = e.target.position();
//   const stage = e.target.getStage();
//   const pointerPosition = stage.getPointerPosition();
//   return {
//     x: pointerPosition.x - position.x,
//     y: pointerPosition.y - position.y
//   };
// }

const SimElement = ({Rx = 0, Ry = 0, Rw = 100, Rh = 100, Tfz = 40, setFocusElement, prop, mutableProp, WIDTH, HEIGHT, ...props}) => {  
  const basicElements = ['Input', 'Output', 'And', 'Or', 'Xor', 'Nand', 'Nor', 'Xnor', 'Not']
  if(basicElements.indexOf(prop.type) !== -1) {
    return (
      <Group
        x={props.x}
        y={props.y}
        onDragMove={(e, id) => props.handleDragMove(e, id)}
        onDragEnd={(e, id) => props.handleDragMove(e, id)}
        draggable
        onPointerCancel={true}
      >
          <SimRect Rw={WIDTH} Rh={HEIGHT} {...props} {...prop} {...mutableProp}  setFocusElement={setFocusElement}/>
          {prop.type === 'Input' ?
              <Anchor x={WIDTH} y={HEIGHT/2} handleWire={() => props.handleWire('out')}/> 
            :
              (prop.type === 'Output' ? 
                <Anchor x={0} y={HEIGHT/2} handleWire={() => props.handleWire('in')}/>  
                :
                (prop.type === 'Not' ?
                (
                  <Group>
                    <Anchor x={WIDTH} y={HEIGHT/2} handleWire={() => props.handleWire('out')}/> 
                    <Anchor x={0} y={HEIGHT/2} handleWire={() => props.handleWire('in')}/>
                  </Group>
                ) : 
                  <Group>
                    <Anchor x={WIDTH} y={HEIGHT/2} handleWire={() => props.handleWire('out')}/> 
                    {
                      [...Array(mutableProp.inputSize).keys()].map(x => (
                        <Anchor 
                          x={0}
                          y={(x + 1) * (HEIGHT) / (mutableProp.inputSize + 1)}
                          handleWire={() => props.handleWire('in')}
                        /> 
                      ))
                    }
                  </Group>
                )
              )
            }
      </Group> 
    )
  }
  else if(prop.type === 'MS'){
    return (
      <Group
        x={props.x}
        y={props.y}
        onDragMove={(e, id) => props.handleDragMove(e, id)}
        onDragEnd={(e, id) => props.handleDragMove(e, id)}
        draggable
        onPointerCancel={true}
        onClick={() => setFocusElement(props.id)}
      >
        <Ms Rw={WIDTH} Rh={HEIGHT} {...props} {...prop} {...mutableProp}  setFocusElement={setFocusElement}/>
        

      </Group>
    ) 
  }
  else if(prop.type === 'DMS'){
    return (
      <Group
        x={props.x}
        y={props.y}
        onDragMove={(e, id) => props.handleDragMove(e, id)}
        onDragEnd={(e, id) => props.handleDragMove(e, id)}
        draggable
        onPointerCancel={true}
        onClick={() => setFocusElement(props.id)}
      >
        <Dms Rw={WIDTH} Rh={HEIGHT} {...props} {...prop} {...mutableProp}  setFocusElement={setFocusElement}/>
        

      </Group>
    ) 
  }
  else if(prop.type === 'CD'){
    return (
      <Group
        x={props.x}
        y={props.y}
        onDragMove={(e, id) => props.handleDragMove(e, id)}
        onDragEnd={(e, id) => props.handleDragMove(e, id)}
        draggable
        onPointerCancel={true}
        onClick={() => setFocusElement(props.id)}
      >
        <Cd Rw={WIDTH} Rh={HEIGHT} {...props} {...prop} {...mutableProp}  setFocusElement={setFocusElement}/>
        

      </Group>
    ) 
  }
  else if(prop.type === 'DC'){
    return (
      <Group
        x={props.x}
        y={props.y}
        onDragMove={(e, id) => props.handleDragMove(e, id)}
        onDragEnd={(e, id) => props.handleDragMove(e, id)}
        draggable
        onPointerCancel={true}
        onClick={() => setFocusElement(props.id)}
      >
        <Dc Rw={WIDTH} Rh={HEIGHT} {...props} {...prop} {...mutableProp}  setFocusElement={setFocusElement}/>
        

      </Group>
    ) 
  }
  
}
export default SimElement;