import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Group} from "react-konva";
import classes from './InfiniteGrid.module.css'
import GridLines from "../GridLines/GridLines";
import SimElement from "../SimElement/SimElement";
import Wire from "../Wires/Wire/Wire";
import { myLength } from "../../../Additional/Calculate";

const WIDTH = 100;
const HEIGHT = 100;

const InfiniteGrid = ({simElements, setSimElements, ...props}) => {
  const stage = useRef([])

  const [stagePos, setStagePos] = useState(
    () => {
      const raw = window.localStorage.getItem('stagePos') || '[]'
      return JSON.parse(raw)
      }
  );
  
  useEffect(() => {
    window.localStorage.setItem('stagePos', JSON.stringify(stagePos));
  }, [stagePos]
  )
  const setFocusElement = (id) => {
    const result = simElements.map(x => id === x.id ? {...x, focusElement: true} : {...x, focusElement: false});
    if(result.find(x => x.id === id)){
      if(result.find(x => x.id === id).prop.type === 'Input'){
        result.find(x => x.id === id).mutableProp.value = (result.find(x => x.id === id).mutableProp.value + 1) % Math.pow(2, result.find(x => x.id === id).mutableProp.bitWidth)
        props.handleValueChange(simElements) 
      }
    }
    
    setSimElements(result);
  }

  const handleDragMove = (e, id) => {
    if(e.target.constructor.name !== 'Circle'){
      const result = simElements.map(el => el.id === id ? {...el, x: e.target.position().x, y: e.target.position().y} : {...el})
      setSimElements(result);
    }
  }

  const handleWire = (id, type) => {
    if(type === 'out'){
      const outId = id
      const x = stage.current.getStage().getPointerPosition().x - stagePos.x
      const y = stage.current.getStage().getPointerPosition().y - stagePos.y
      const inEl = simElements.find(el => (el.x < x &&  el.x +  WIDTH > x) && (el.y < y && el.y + WIDTH > y)) || null
      const outEl = simElements.find(el => el.id === outId) || null
      const mux = simElements.find(el => (el.x < x &&  el.x +  WIDTH > x) && (el.y < y && el.y + WIDTH * 2 > y)) || null
      if(mux){
        if(mux.prop.type === 'MS' || mux.prop.type === 'DMS' || mux.prop.type === 'DC' || mux.prop.type === 'CD') {
          const inEl = simElements.find(el => (el.x < x &&  el.x +  WIDTH > x) && (el.y < y && el.y + WIDTH * 2 > y)) || null
          if(inEl) {
            if(y < inEl.y + WIDTH/4 * 6){
              if(inEl.prop.type === 'MS' || inEl.prop.type === 'CD'){
                if(inEl.id !== outId) {
                  let checkValue = inEl.prop.type === 'MS' ? inEl.mutableProp.controlSize : inEl.mutableProp.bitWidth
                  if(myLength(inEl.in) >= Math.pow(2, checkValue)) {
                    return
                  }
                  if(outEl.prop.type === 'DMS' && myLength(outEl.out) >= Math.pow(2, outEl.mutableProp.controlSize)) return
                  if(outEl.prop.type === 'DC' && myLength(outEl.out) >= Math.pow(2, outEl.mutableProp.bitWidth)) return
                  props.addWire(inEl.id, outId)
                }
              }
              else if(inEl.prop.type === 'DMS' || inEl.prop.type === 'DC'){
                if(inEl.id !== outId) {
                  
                  if(myLength(inEl.in) >= 1) return
                  let checkValue = inEl.prop.type === 'DMS' ? outEl.mutableProp.controlSize : outEl.mutableProp.bitWidth
                  if(myLength(outEl.out) >= Math.pow(2, checkValue)) return
                  props.addWire(inEl.id, outId)
                }
              }
            }
            else{
              if(inEl.id !== outId) {

                if(inEl.prop.type !== 'DMS' && inEl.prop.type !== 'MS') return
                if(myLength(inEl.control) >= 1) return
                if(inEl.in.indexOf(outEl.id) !== -1) {
                  alert('use buffer to connect address')
                  return
                }
                props.addControlWire(inEl.id, outId)
              }
            }
          }
          return
        }
      } 
      if(inEl) {
        

        if(inEl.out.indexOf(outEl.id) !== -1) return // console.log('dont cicle elements!')
        if(inEl.prop.type === outEl.prop.type && (inEl.prop.type === 'Output' || inEl.prop.type === 'Input')) return
        if(inEl.prop.type === 'Input') return
        if((inEl.prop.type === 'Not' || inEl.prop.type === 'Output') && myLength(inEl.in) !== 0) return
        if(
          (inEl.prop.type === 'Xor'
          || inEl.prop.type === 'And'
          || inEl.prop.type === 'Or' 
          || inEl.prop.type === 'Nand' 
          || inEl.prop.type === 'Nor' 
          ||inEl.prop.type === 'Xnor') 
          && myLength(inEl.in) === inEl.mutableProp.inputSize) return

          if(outEl.prop.type === 'DMS' && myLength(outEl.out) >= Math.pow(2, outEl.mutableProp.controlSize)) return
          if(outEl.prop.type === 'DC' && myLength(outEl.out) >= Math.pow(2, outEl.mutableProp.bitWidth)) return
        if(inEl.id !== outId) {
          props.addWire(inEl.id, outId)
        }
      }
    }
    else if(type === 'in'){
      const inId = id
      const x = stage.current.getStage().getPointerPosition().x - stagePos.x
      const y = stage.current.getStage().getPointerPosition().y - stagePos.y
      const outEl = simElements.find(el => (el.x < x &&  el.x +  WIDTH > x) && (el.y < y && el.y + WIDTH > y)) || null
      const inEl = simElements.find(el => el.id === inId) || null
      if(outEl) {
        if(outEl.in.indexOf(inEl.id) !== -1) return // console.log('dont cicle elements!')
        if(inEl.prop.type === outEl.prop.type && (inEl.prop.type === 'Output' || inEl.prop.type === 'Input')) return
        if(outEl.prop.type === 'Output') return
        if((inEl.prop.type === 'Not' || inEl.prop.type === 'Output') && myLength(inEl.in) !== 0) return

        if(
          (inEl.prop.type === 'Xor'
          || inEl.prop.type === 'And'
          || inEl.prop.type === 'Or' 
          || inEl.prop.type === 'Nand' 
          || inEl.prop.type === 'Nor' 
          ||inEl.prop.type === 'Xnor') 
          && myLength(inEl.in) === inEl.mutableProp.inputSize) return

          if(inEl.prop.type === 'MS' && myLength(inEl.in) >= Math.pow(2, inEl.mutableProp.controlSize)) return
          if(outEl.prop.type === 'DMS' && myLength(outEl.out) >= Math.pow(2, outEl.mutableProp.controlSize)) return

          if((inEl.prop.type === 'DMS' || inEl.prop.type === 'DC') && myLength(inEl.in) >= 1) return
          
          if(inEl.prop.type === 'CD' && myLength(inEl.in) >= Math.pow(2, inEl.mutableProp.bitWidth)) return
          if(outEl.prop.type === 'DC' && myLength(outEl.out) >= Math.pow(2, outEl.mutableProp.bitWidth)) return

        if(outEl.id !== inId) {
          props.addWire(inId, outEl.id)
        }
      }
    }
  }
  return (
    <Group>
      <Stage className={classes.grid}
      willReadFrequently={true}
      x={stagePos.x}
      y={stagePos.y}
      width={window.innerWidth}
      height={window.innerHeight}
      draggable
      onDragEnd={e => {
        setStagePos({...e.currentTarget.position(), zoom: stagePos.zoom});
      }}
      ref={stage}

    >
     
      <Layer>
        <GridLines setFocusElement={setFocusElement}></GridLines>
       
        {simElements ? simElements.map(s =>
          <Group key={s.id}>
            <SimElement {...s} 
              WIDTH={WIDTH} 
              HEIGHT={HEIGHT} 
              setFocusElement={setFocusElement} 
              handleDragMove={(e) => handleDragMove(e, s.id)} 
              handleWire={(type) => handleWire(s.id, type)}
            />
            <Wire simElements={simElements} id={s.id} removeWire={(id1, id2) => props.removeWire(id1, id2)}/>
          </Group>
        ) : null}
        
      </Layer>
      </Stage>
    </Group>
    
  );
};

export default InfiniteGrid;