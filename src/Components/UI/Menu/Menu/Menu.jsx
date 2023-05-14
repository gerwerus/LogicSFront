import React, { useState } from 'react';
import Draggable from 'react-draggable';
import classes from './Menu.module.css'
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import MenuDropDownTitle from '../MenuDropDownTitle/MenuDropDownTitle';

const Menu = function ({addComponent, ...props}) {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <Draggable>
            <div className={classes.menu}>
                <MenuDropDownTitle plusMinus={showMenu} setPlusMinus={setShowMenu} Title={props.Title}></MenuDropDownTitle>
                <MenuDropdown addComponent={addComponent} visible={showMenu}></MenuDropdown>
            </div>
        </Draggable>
    )
}

export default Menu;