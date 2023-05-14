import React from 'react';
import classes from './MenuButtonBlock.module.css';
import MenuButton from '../MenuButton/MenuButton';

const MenuButtonBlock = function (props) {
    const divClasses = [classes.menuButtonBlock];
    if(props.visible){
        divClasses.push(classes.menuButtonBlockActive);
    }
    return (
        <div className={divClasses.join(' ')}>
            {props.text.map(t => 
                <MenuButton typeComponent={t.name} addComponent={props.addComponent}>{t.name}</MenuButton>
            )}
        </div>     
    )
}

export default MenuButtonBlock;