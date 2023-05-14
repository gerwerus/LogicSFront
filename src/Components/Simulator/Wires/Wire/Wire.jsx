import React, { useRef, useState } from 'react'
import {Group, Line} from 'react-konva';
import { v4 as uuid } from 'uuid';
import {getXById, getYById, getX1Add, getY1Add, getX2Add, getY2Final, getFinalY1} from './CordsMath';


function Wire({simElements, id, ...props}) {
  const line = useRef([])
  const startMousePos = [0]
  const element = simElements.find(x => x.id === id) || []
  const wires = element.out || []
  const [finalDlt, setFinalDlt] = useState(
    wires.map((wireId) => {
        return {
          id: wireId,
          dltX: simElements.find(x => x.id === id).x  + 150,
        }
      }
    )
  )
  const getFinalDlt = (id) => {
    if(finalDlt.find(x => x.id === id))
      return finalDlt.find(x => x.id === id).dltX
    return 0
  }
  let ind = 0
  let prev = ''
  const controlWire = {controlChek: false}
  // const wires = allWires.filter(w => simElements.find(x => x.id === w)) || []
  return (
    <Group
      x={0}
      draggable
    >
    {
      wires.map((wireId, index) => 
        {
          if(prev === wireId) {
                ind += 1
            }
          else ind = 0
          prev = wireId

          let y2 = getY2Final(simElements, wireId, id, ind, controlWire) 
          return (<Line
          ref={el => line.current[index] = el}
          key={uuid().slice(0,8)}
          points={
            [
              getXById(simElements, id) + getX1Add(simElements, id), 
              getFinalY1(simElements, wireId, id, index),
              getFinalDlt(wireId) || Math.floor((getXById(simElements, id) + getX1Add(simElements, id) + getXById(simElements, wireId) + getX2Add(simElements, wireId)) / 2), 
              getFinalY1(simElements, wireId, id, index),
              getFinalDlt(wireId) || Math.floor((getXById(simElements, id) + getX1Add(simElements, id) + getXById(simElements, wireId) + getX2Add(simElements, wireId)) / 2), 
              y2,
              getXById(simElements, wireId) + getX2Add(simElements, wireId),
              y2,             
            ]
          }
          stroke='red'
          strokeWidth={5}
          onDblClick={() => props.removeWire(id, wireId, index, ind)}

          draggable
          onDragStart={(e) => startMousePos[0] = e.target.getStage().getPointerPosition().x}
          onDragMove={(e) => startMousePos[0] = e.target.getStage().getPointerPosition().x}
          onDragEnd={(e) => {
            const dlt =finalDlt.slice()
            if(dlt.find(x => x.id === wireId)){
              dlt.find(x => x.id === wireId).dltX = e.target.points()[2]
            }
            else{
              dlt.push({id: wireId, dltX: e.target.points()[2]})
            }
            setFinalDlt(dlt)
          }}
          dragBoundFunc={
            () =>{
              const p = line.current[index].points()
              p[2] += Math.sign(line.current[index].getStage().getPointerPosition().x - startMousePos[0]) * 2 
              p[4] = p[2]
              line.current[index].points(p)                
              if (line.current[index] !== null) {
                return line.current[index].getAbsolutePosition();
              }
              return {
                x: 0,
                y: 0,
              }
          }}
        />)}
      )
    }
    </Group>
  )
}

export default Wire