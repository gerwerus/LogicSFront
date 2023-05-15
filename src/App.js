import './App.css';
import React, { useEffect, useState } from "react";
import Header from './Components/UI/Header/Header';
import InfiniteGrid from './Components/Simulator/InfiniteGrid/InfiniteGrid';
import Menu from './Components/UI/Menu/Menu/Menu';
import PropMenu from './Components/UI/PropMenu/PropMenu/PropMenu';
import { v4 as uuid } from 'uuid';
import { defaultSettings } from './Additional/DefaltSettings.js'
import { useStrictMode } from 'react-konva';
import { calculate, truthTable } from './Additional/Calculate';
import Error from './Components/UI/Error/Error';
import CheckAnswer from './Components/UI/CheckAnswer/CheckAnswer';

// changeValue fix
// check test
// backend
// авторизация
// get tests
// save tests results
 

function App() {
  useStrictMode(true);
  const [right, setRight] = useState("Проверить")
  const [testing, setTesting] = useState(() => {
    let raw = window.localStorage.getItem('testing') || '[]'
    return JSON.parse(raw)
    });
  const [simElements, setSimElements] = useState(() => {
    let raw = window.localStorage.getItem('simElements') || '[]'
    raw = raw.replace('null,', '')
    raw = raw.replace('null', '')
    return JSON.parse(raw)
    }
  );
  
  const [errorMessage, setErrorMessage] = useState("")

  const handleValueChange = (se) => {
    try{
      setSimElements(calculate(se))
      setErrorMessage("")
      setRight("Проверить")
    }
    catch (ex) {
      if(typeof ex === "string")
        setErrorMessage(ex)
      console.log(ex)
    }
  }
  useEffect(() => {
      window.localStorage.setItem('simElements', JSON.stringify(simElements));
    }, [simElements]
  )
  useEffect(() => {
    window.localStorage.setItem('testing', JSON.stringify(testing));
  }, [testing]
)
  const addComponent = (type) => {
    const se = simElements ? simElements.slice() : [];
    const id_obj = {id: uuid().slice(0,8)};
    if(type === 'Input' || type === 'Output'){
      setTesting({isTest: false, answer: [], id: 0})
    }
    se.push(
      Object.assign(id_obj, structuredClone(defaultSettings[type]))
    )
    setSimElements(se);
  }
  

  const removeComponent = (id) => {
    const se = simElements ? simElements.filter((x) => x.id !== id) : [];
    if(!simElements.find(x => x.id === id)) return
    if(simElements.find(x => x.id === id).prop.type === 'Input' || simElements.find(x => x.id === id).prop.type === 'Output'){
      setTesting({isTest: false, answer: [], id: 0})
    }
    for(let i = 0; i < se.length; i++) {
      se[i].out = se[i].out.filter((x) => x !== id)
      se[i].in = se[i].in.filter((x) => x !== id)
      if(se[i].control) se[i].control = se[i].control.filter((x) => x !== id)
    }
    setSimElements(se)
  }

  const addWire = (inId, outId) => {
    const se = simElements ? simElements.slice() : [];
    const inEl = se.find(x => x.id === inId)
    const outEl = se.find(x => x.id === outId)
    const plexors = ['MS', 'DMS', 'CD', 'DC',]
    if(inEl.in.indexOf(outId) === -1 || true) {
      let add = false
      for(let i = 0; i < inEl.in.length; i++){
        if(typeof inEl.in[i] === 'undefined' || inEl.in[i] === null){
          
          inEl.in[i] = outId
          add = true
          break
        }
      }
      
      if(!add)
        se.find(x => x.id === inId).in.push(outId);
    }
    if(outEl.out.indexOf(inId) === -1 || true) {
      let add = false
      for(let i = 0; i < outEl.out.length; i++){
        if(typeof outEl.out[i] === 'undefined' || outEl.out[i] === null){
          // console.log(i)
          outEl.out[i] = inId
          add = true
          break
        }
          
      }
      if(!add)
        outEl.out.push(inId);
    }
    setSimElements(se);
    handleValueChange(simElements)
  }

  const addControlWire = (inId, outId) => {
    const se = simElements ? simElements.slice() : [];
    if(se.find(x => x.id === inId).control.indexOf(outId) === -1){
      se.find(x => x.id === inId).control.push(outId);
    }
    if(se.find(x => x.id === outId).out.indexOf(inId) === -1){
      se.find(x => x.id === outId).out.push(inId);
    }
    setSimElements(se);
    handleValueChange(simElements)
  }


  const removeWire = (id1, id2, indexOut, indexIn) => {
    const se = simElements ? simElements.slice() : [];
    const el1 = se.find(x => x.id === id1)
    const el2 = se.find(x => x.id === id2)
    if(el1){
      delete el1.out[el1.out.indexOf(id2)]
      delete el1.in[el1.in.indexOf(id2)]
    }
    if(el2){
      delete el2.out[el2.out.indexOf(id1)]
      delete el2.in[el2.in.indexOf(id1)]
    }
    if(el1.prop.type === 'MS' || el1.prop.type === 'DMS'){

      if(se.find(x => x.id === id1).control[0] === id2){
        se.find(x => x.id === id1).control = []
      } 
    }
    if(el2.prop.type === 'MS' || el2.prop.type === 'DMS'){     
      if(el2.control.indexOf(id1) !== -1){
        el2.control = []
      }
    }
    setSimElements(se);
    handleValueChange(simElements)
  }

  const changeComponentProperties = (e, key) => {
    const se = simElements ? simElements.slice() : [];
    if(key === 'label'){
      se.find((x) => x.focusElement === true).mutableProp[key] = e.target.value
      const type = se.find((x) => x.focusElement === true).prop.type
      if(type === 'Input' || type === 'Output'){
        setTesting({isTest: false, answer: [], id: 0})
      }
    }
    else se.find((x) => x.focusElement === true).mutableProp[key] = parseInt(e.target.value) ? parseInt(e.target.value) : 0;
    if(key === 'value'){
      e.target.value ? 
      se.find((x) => x.focusElement === true).mutableProp[key] = parseInt(e.target.value) > Math.pow(2, se.find((x) => x.focusElement === true).mutableProp.bitWidth) - 1 ?
      0 : parseInt(e.target.value)
      :
      se.find((x) => x.focusElement === true).mutableProp[key] = 0
      handleValueChange(simElements)
    }
    else if(key === 'bitWidth'){
      e.target.value ? 
      se.find((x) => x.focusElement === true).mutableProp[key] = parseInt(e.target.value) > 16 ? 16 : parseInt(e.target.value)
      :
      se.find((x) => x.focusElement === true).mutableProp[key] = 0
      if(se.find((x) => x.focusElement === true).prop.type === 'CD' || se.find((x) => x.focusElement === true).prop.type === 'DC'){
        const el = se.find((x) => x.focusElement === true)
        el.out.forEach(id => {
          const tmp = se.find((x) => x.id === id)
          tmp.in = tmp.in.filter(a => a !== el.id)
        });
        el.out = []
      }
      handleValueChange(simElements)
    }
    else if(key === 'inputSize'){
      const el = se.find((x) => x.focusElement === true)
      el.in.forEach(id => {
        const tmp = se.find((x) => x.id === id)
        tmp.out = tmp.out.filter(a => a !== el.id)
      });
      el.in = []
      e.target.value ? 
      se.find((x) => x.focusElement === true).mutableProp[key] = parseInt(e.target.value) > 6 ? 6 : parseInt(e.target.value)
      :
      se.find((x) => x.focusElement === true).mutableProp[key] = 0
      handleValueChange(simElements)
    }
    else if(key === 'controlSize'){
      const el = se.find((x) => x.focusElement === true)
      el.in.forEach(id => {
        const tmp = se.find((x) => x.id === id)
        tmp.out = tmp.out.filter(a => a !== el.id)
      });
      el.in = []
      
      e.target.value ? 
      se.find((x) => x.focusElement === true).mutableProp[key] = parseInt(e.target.value) > 3 ? 3 : parseInt(e.target.value)
      :
      se.find((x) => x.focusElement === true).mutableProp[key] = 0


      const tmp = se.find((x) => x.id === el.control[0])
      if(tmp) tmp.out = tmp.out.filter(a => a !== el.id)
      el.control = []
      
      
    }
    setSimElements(se);
  }
  return ( 
    <div >
      <Header setRight={setRight} testing={testing} setTesting={setTesting} simElements={simElements} setSimElements={setSimElements}/>
      <InfiniteGrid simElements={simElements} setSimElements={setSimElements} addWire={addWire} addControlWire={addControlWire} removeWire={removeWire} handleValueChange={handleValueChange}/>
      <Menu addComponent={addComponent} Title="Элементы схемы"/>
      
      <PropMenu 
        Title="Свойства" 
        focusElement={simElements ? simElements.find(item => item.focusElement === true) : null} 
        removeComponent={removeComponent}
        changeComponentProperties={changeComponentProperties}
      />
      {
        errorMessage !== "" ? 
          <Error text={errorMessage}></Error>
          :
          null
      }
      {
        testing.isTest === true ? 
          <CheckAnswer right={right} setRight={setRight} testing={testing} simElements={simElements}></CheckAnswer>
          : 
          null
      }
    </div>
  );
}

export default App;


