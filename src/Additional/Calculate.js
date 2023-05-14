import SimElement from "../Components/Simulator/SimElement/SimElement";

export const myLength = (arr) => {
    return arr.filter(function(value) { return value !== undefined }).length;
}

const getPrevValue = (s, elements, calculated, bitWidth, prevId, index = 0) => {
    // if(!s) return ;
    // console.log(s.prop.type)
    s.in.forEach(element => {
        if(typeof element === 'undefined') return 0;
    });
    if(s.mutableProp.bitWidth !== bitWidth && s.prop.type !== 'DC') throw "BitWidth Error"
    if(s.prop.type === 'Input') return s.mutableProp.value;
    if(calculated.find(e => e.id === s.id)) return calculated.find(e => e.id === s.id).value
    if(s.in.length === 0){
        calculated.push({id: s.id, value: 0})
        return 0
    }
    if(s.prop.type === 'And'){
        // console.log(s.in.map(x => getPrevValue(elements.find(el => el.id === x), elements)).reduce((acc, item) => acc && item))
        let ind = 0
        let prev = ''
        let value = s.in.map((x) => {
            if(prev === x) {
                ind += 1
            }
            else ind = 0
            prev = x
            return getPrevValue(elements.find(el => el.id === x), elements, calculated, bitWidth, s.id, ind)
        }).reduce((acc, item) => acc & item)
        calculated.push({id: s.id, value: value})
        return myLength(s.in) === s.mutableProp.inputSize ? value : 0
    }
    if(s.prop.type === 'Not'){
        // console.log(s.in.map(x => getPrevValue(elements.find(el => el.id === x), elements)).reduce((acc, item) => acc && item))
        let value = Math.pow(2, bitWidth) - 1 - getPrevValue(elements.find(el => el.id === s.in[0]), elements, calculated, bitWidth, s.id) 
        calculated.push({id: s.id, value: value})
        return value
    }
    if(s.prop.type === 'Xor'){
        // console.log(s.in.map(x => getPrevValue(elements.find(el => el.id === x), elements)).reduce((acc, item) => acc && item))
        let ind = 0
        let prev = ''
        let value = s.in.map((x) => {
            if(prev === x) {
                ind += 1
            }
            else ind = 0
            prev = x
            return getPrevValue(elements.find(el => el.id === x), elements, calculated, bitWidth, s.id, ind)
        }).reduce((acc, item) => (acc ^ item))
        if(!value) value = 0;
        calculated.push({id: s.id, value: value})
        return value
    }
    if(s.prop.type === 'Nand'){
        let ind = 0
        let prev = ''
        let value = s.in.map((x) => {
            if(prev === x) {
                ind += 1
            }
            else ind = 0
            prev = x
            return getPrevValue(elements.find(el => el.id === x), elements, calculated, bitWidth, s.id, ind)
        }).reduce((acc, item) => (acc & item))
        value = Math.pow(2, bitWidth) - 1 - value
        if(!value) value = 0;
        calculated.push({id: s.id, value: value})
        return value
    }
    if(s.prop.type === 'Nor'){
        let ind = 0
        let prev = ''
        let value = s.in.map((x) => {
            if(prev === x) {
                ind += 1
            }
            else ind = 0
            prev = x
            return getPrevValue(elements.find(el => el.id === x), elements, calculated, bitWidth, s.id, ind)
        }).reduce((acc, item) => (acc | item))
        value = Math.pow(2, bitWidth) - 1 - value
        if(!value) value = 0;
        calculated.push({id: s.id, value: value})
        return value
    }
    if(s.prop.type === 'Xnor'){
        let ind = 0
        let prev = ''
        let value = s.in.map((x) => {
            if(prev === x) {
                ind += 1
            }
            else ind = 0
            prev = x
            return getPrevValue(elements.find(el => el.id === x), elements, calculated, bitWidth, s.id, ind)
        }).reduce((acc, item) =>(acc ^ item))
        value = Math.pow(2, bitWidth) - 1 - value
        if(!value) value = 0;
        calculated.push({id: s.id, value: value})
        return value
    }
    if(s.prop.type === 'MS'){
        if(s.control.length === 0) throw 'No address add'
        let controlValue = s.control.map((x, ind) => getPrevValue(elements.find(el => el.id === x), elements, calculated, s.mutableProp.controlSize, s.id, ind)).reduce((acc, item) => acc | item)
        let ind = 0
        let prev = ''
        let value = s.in.map((x) => {
            if(prev === x) {
                ind += 1
            }
            else ind = 0
            prev = x
            return getPrevValue(elements.find(el => el.id === x), elements, calculated, bitWidth, s.id, ind)
        })[controlValue]
        if(!value) value = 0;
        calculated.push({id: s.id, value: value})
        return value
    }
    if(s.prop.type === 'DMS'){
        if(myLength(s.control) === 0) throw 'No address add'
        let ind = 0
        let prev = ''
        let controlValue = s.control.map((x) => {
            if(prev === x) {
                ind += 1
            }
            else ind = 0
            prev = x
            return getPrevValue(elements.find(el => el.id === x), elements, calculated, s.mutableProp.controlSize, s.id, ind)
        }).reduce((acc, item) => acc | item)
        let inputValue = getPrevValue(elements.find(el => el.id === s.in[0]), elements, calculated, bitWidth, s.id)
        // inputValue = inputValue << controlValue
        // inputValue -= 1
        if(s.out.indexOf(prevId) + index === controlValue){
            return inputValue
        }
        return 0
    }
    if(s.prop.type === 'CD'){
        let ind = 0
        let prev = ''
        let value = s.in.map((x) => {
            if(prev === x) {
                ind += 1
            }
            else ind = 0
            prev = x
            return getPrevValue(elements.find(el => el.id === x), elements, calculated, 1, s.id, ind)
        })
        return (Math.pow(2, s.mutableProp.bitWidth) - 1 - value.reverse().indexOf(1)) % Math.pow(2, s.mutableProp.bitWidth)
    }
    if(s.prop.type === 'DC'){
        if(bitWidth !== 1) throw "BitWidth Error"
        let inputValue = getPrevValue(elements.find(el => el.id === s.in[0]), elements, calculated, s.mutableProp.bitWidth, s.id)
        if(s.out.indexOf(prevId) + index === inputValue){
            return 1
        }
        return 0
    }
    if(s.prop.type === 'Output' || s.prop.type === 'Or'){
        let value = s.in.map((x, ind) => getPrevValue(elements.find(el => el.id === x), elements, calculated, bitWidth, s.id,  ind)).reduce((acc, item) => acc | item, 0)
        calculated.push({id: s.id, value: value})
        return value
    }
    
}

export const calculate = (se) => {
    const result = se ? se.slice() : []
    const calculated = []
    const bitWidth = [0]
    if(result){
        result.map(x => {
            return x.prop.type === 'Output' ?
                {...x, value: getPrevValue(x, se, calculated, x.mutableProp.bitWidth)}
            :
                {...x}

            
        })
        calculated.map(x => {
            if(result.find(r => r.id === x.id)) result.find(r => r.id === x.id).prop.value = x.value
        })
    }
    return result
}

export const truthTable = (simElements) => {
    const se = simElements ? simElements.slice() : []
    const result = []
    const inputs = se.filter(el => el.prop.type === 'Input').sort((a, b) => {
        const labelA = a.mutableProp.label
        const labelB = b.mutableProp.label
        if (labelA < labelB) {
            return -1;
          }
          if (labelA > labelB) {
            return 1;
          }
        
          return 0;
    })

    const outputs = se.filter(el => el.prop.type === 'Output').sort((a, b) => {
        const labelA = a.mutableProp.label
        const labelB = b.mutableProp.label
        if (labelA < labelB) {
            return -1;
          }
          if (labelA > labelB) {
            return 1;
          }
        
          return 0;
    })
    for(let i = 0; i < Math.pow(2, inputs.length); i++){
        const calculated = []
        const values = '0'.repeat(inputs.length - i.toString(2).length > 0 ? inputs.length - i.toString(2).length : 0) + i.toString(2)
        // console.log(values)
        const resInputs = []
        const resOutputs = []
        const tmpInputs = inputs.map((el, j) => {
            const label = el.mutableProp.label
            const val = parseInt(values[j])
            resInputs.push({label:label, value: val})
            const mprp = {...el.mutableProp}
            mprp.value = val
            // console.log({...el, mutableProp: mprp})
            return {...el, mutableProp: mprp}
        })
        
        const tmpSe = [...se.filter(el => el.prop.type !== 'Input'), ...tmpInputs]
        for (let j = 0; j < outputs.length; j++) {
            const label = outputs[j].mutableProp.label
            resOutputs.push({label: label, value: getPrevValue(outputs[j], tmpSe, calculated, outputs[j].mutableProp.bitWidth)})
        }
        result.push({input: resInputs, output: resOutputs})
    }
    return result
}