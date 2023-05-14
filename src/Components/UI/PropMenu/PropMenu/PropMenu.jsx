import React, { useState } from 'react';
import Draggable from 'react-draggable';
import classes from './PropMenu.module.css'
import MenuDropDownTitle from '../../Menu/MenuDropDownTitle/MenuDropDownTitle';
import PropElements from '../PropElements/PropElements';

const PropMenu = function ({focusElement, ...props}) {
    const [showMenu, setShowMenu] = useState(true);
    return (
        <Draggable>
            <div style={focusElement ? {display:'block'} : {display:'none'}} className={classes.menu}>
                <MenuDropDownTitle plusMinus={showMenu} setPlusMinus={setShowMenu} Title={props.Title}/>
                
                <PropElements visible={showMenu} focusElement={focusElement ? focusElement.prop : focusElement} const={true}/>

                <PropElements changeComponentProperties={(e, key, id) => props.changeComponentProperties(e, key, id)} visible={showMenu} focusElement={focusElement ? focusElement.mutableProp : focusElement} const={false}/>

                <button style={{visibility: (showMenu && focusElement) ? 'visible' : 'hidden'}} className={classes.deleteButton} onClick={() => props.removeComponent(focusElement? focusElement.id : 0 )}>Delete</button>
            </div>
        </Draggable>
    )
}

export default PropMenu;