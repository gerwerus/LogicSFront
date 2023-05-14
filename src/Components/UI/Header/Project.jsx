import React from 'react'
import classes from './Header.module.css';
import Popup from 'reactjs-popup';
import SavePopup from './SavePopup';
import HeaderButton from '../HeaderButton/HeaderButton';
function Project({reset, save, ...props}) {
  return (
    <div className={classes.menu}>
        <Popup
            trigger={<button className={classes.myHdrBtn}>Проект</button>}
            position='bottom center'
            mouseLeaveDelay={50}
            mouseEnterDelay={0}
            contentStyle={{ padding: '0px', border: 'none' }}
            arrow={true}
            nested
            >
            <div className="menu">
                <div className={classes.menuItem}>
                    <HeaderButton onClick={() => reset()} style={{border: 'none'}}>Новый проект</HeaderButton>
                </div>
                <div className={classes.menuItem}> 
                    <HeaderButton onClick={() => save()} style={{border: 'none'}}>Сохранить проект</HeaderButton>
                </div>
                <div className={classes.menuItem}> 
                    <Popup closeOnDocumentClick trigger={<button className={classes.myHdrBtn} style={{border: 'none'}}>Загрузить проект</button>} modal>
                        <SavePopup reset={reset} setSimElements={props.setSimElements}></SavePopup>
                    </Popup>
                </div>
            </div>
        </Popup>
    </div>
  )
}

export default Project