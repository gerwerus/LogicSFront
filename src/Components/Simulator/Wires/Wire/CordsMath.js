export const getXById = (se, id) => {
    if(se.find(x => x.id === id)){
      let x = se.find(x => x.id === id).x
      return parseInt(x)
    }
    return null
  }
export const getYById = (se, id) => {
    if(se.find(x => x.id === id)){
        let y = se.find(x => x.id === id).y
        return parseInt(y)
    }
    return null
    }
  
export  const getX1Add = (se, id) => {
    if(se.find(x => x.id === id)){
      return 100
    }
    return null
  }
  
export const getY1Add = (se, id) => {
    if(se.find(x => x.id === id)){
        return 50
    }
    return null
}

  
export  const getX2Add = (se, id) => {
    if(se.find(x => x.id === id)){
        return 0
    }
    return null
}
  
export const getY2Add = (se, id) => {
    if(se.find(x => x.id === id)){
        return 50
    }
    return null
}
  
const checkBase = (se, id) => {
    const inEl = se.find(x => x.id === id)
    return (inEl.prop.type === 'Xor'
        || inEl.prop.type === 'And'
        || inEl.prop.type === 'Or' 
        || inEl.prop.type === 'Nand' 
        || inEl.prop.type === 'Nor' 
        ||inEl.prop.type === 'Xnor')
}
const checkMs = (se, id) => {
    const inEl = se.find(x => x.id === id)
    return (inEl.prop.type === 'MS' || inEl.prop.type === 'DMS')
}
const checkCd = (se, id) => {
    const inEl = se.find(x => x.id === id)
    return (inEl.prop.type === 'CD' || inEl.prop.type === 'DC')
}

export const getFinalY1 = (simElements, wireId, id, index) => {
    const outEl = simElements.find(x => x.id === id)
    if (outEl) {
        if(outEl.prop.type !== 'DMS' && outEl.prop.type !== 'DC'){
            return getYById(simElements, id) + getY1Add(simElements, id)
        }
        if(outEl.prop.type === 'DMS')
        {
            let step = 0
            step = 150 / (Math.pow(2, outEl.mutableProp.controlSize) + 1)
            let mul = Math.max(outEl.out.indexOf(id), index)
            return getYById(simElements, id) + (mul + 1) * step
        }
        if(outEl.prop.type === 'DC')
        {
            let step = 0
            step = 150 / (Math.pow(2, outEl.mutableProp.bitWidth) + 1)
            let mul = Math.max(outEl.out.indexOf(id), index)
            return getYById(simElements, id) + (mul + 1) * step
        }
    } 
    return 100
    
}

export const getY2Final = (simElements, wireId, id, index, controlWire) => {
    if(!checkBase(simElements, wireId) && !checkMs(simElements, wireId) && !checkCd(simElements, wireId)){
        return getYById(simElements, wireId) + getY2Add(simElements, wireId)
    }
    else if(checkBase(simElements, wireId)){
        const inEl = simElements.find(x => x.id === wireId)
        let step = 0
        if(inEl) step = 100 / (inEl.mutableProp.inputSize + 1)
        let mul = Math.max(inEl.in.indexOf(id), index)
        // console.log(inEl.in)
        return getYById(simElements, wireId) + (mul + 1) * step
    }
    else{
        const inEl = simElements.find(x => x.id === wireId)
        if(inEl){
            if(inEl.control)
            {    if(inEl.control.indexOf(id) !== -1 && !controlWire.controlCheck)
                {
                    controlWire.controlCheck = true
                    return getYById(simElements, wireId) + 175   
                }
            }
            if(inEl.prop.type === 'MS')
            {
                let step = 0
                if(inEl) step = 150 / (Math.pow(2, inEl.mutableProp.controlSize) + 1)
                let mul = inEl.in.indexOf(id) + index
                return getYById(simElements, wireId) + (mul + 1) * step
            }
            else if(inEl.prop.type === 'CD'){
                let step = 0
                if(inEl) step = 150 / (Math.pow(2, inEl.mutableProp.bitWidth) + 1)
                let mul = inEl.in.indexOf(id) + index
                return getYById(simElements, wireId) + (mul + 1) * step
            }
            else if(inEl.prop.type === 'DC' || inEl.prop.type === 'DMS'){
                return getYById(simElements, wireId) + getY2Add(simElements, wireId)
            }
        }
       
    }
        // simElements.find(el => el.id === wireId).in.indexOf(id) === 0 ? 
        // (getYById(simElements, wireId) + getY2Add(simElements, wireId)) - 25 
        // :
        // (getYById(simElements, wireId) + getY2Add(simElements, wireId)) + 25
}
  