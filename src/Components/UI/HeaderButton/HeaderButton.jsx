import React from 'react';
import classes from './HeaderButton.module.css';

const HeaderButton = function ({children, ...props}) {
    return (
        <button {...props} className={classes.myHdrBtn} onClick={() => props.onClick()}>{children}</button>     
    )
}

export default HeaderButton;