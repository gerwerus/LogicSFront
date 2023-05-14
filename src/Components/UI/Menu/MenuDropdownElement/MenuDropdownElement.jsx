import React from 'react';
import classes from './MenuDropdownElement.module.css';

const MenuDropdownElement = function ({children, block, setBlockVisible, ...props}) {
    return (
        <button onClick={() => setBlockVisible(block.id)} {...props} className={classes.MenuDropdownElement}>{children}</button>       
    )
}

export default MenuDropdownElement;