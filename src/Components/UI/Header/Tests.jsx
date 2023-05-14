import React from 'react'
import classes from './Header.module.css';
import Popup from 'reactjs-popup'
import TestPopup from './TestPopup'
import CreateTestPopup from './CreateTestPopup'

function Tests({user, token, reset, ...props}) {
  return (
    <div className={classes.menu}>
        {user !== "" ?
            <div className={classes.menu}>
                <Popup
                    trigger={<button className={classes.myHdrBtn}>Задания</button>}
                    position='bottom center'
                    closeOnDocumentClick
                    mouseLeaveDelay={50}
                    mouseEnterDelay={0}
                    contentStyle={{ padding: '0px', border: 'none' }}
                    arrow={true}
                    nested
                    >
                    
                    <div className={classes.menu}>
                        {user === 'staff' ?
                            <div>
                                <div className={classes.menuItem}>
                                    <Popup closeOnDocumentClick trigger={<button className={classes.myHdrBtn} style={{border: 'none'}}>Решать задания</button>} modal>
                                        <TestPopup reset={reset} setTesting={props.setTesting} setSimElements={props.setSimElements}></TestPopup>
                                    </Popup>
                                </div>
                                <div className={classes.menuItem}> 
                                    <Popup closeOnDocumentClick trigger={<button className={classes.myHdrBtn} style={{border: 'none'}}>Создать задание</button>} modal>
                                        <CreateTestPopup testing={props.testing} token={token} simElements={props.simElements}></CreateTestPopup>
                                    </Popup>
                                </div>
                                <div className={classes.menuItem}> 
                                    <Popup closeOnDocumentClick trigger={<button className={classes.myHdrBtn} style={{border: 'none'}}>Редактировать задание</button>} modal>
                                        {!props.testing.isTest ? 
                                            <TestPopup reset={reset} setTesting={props.setTesting} setSimElements={props.setSimElements}></TestPopup>
                                            : 
                                            <CreateTestPopup name="Редактировать тест" title={props.testing.title} defaultTable={props.testing.answer} id={props.testing.id} reset={reset} token={token} simElements={props.simElements}></CreateTestPopup>
                                        }
                                        
                                    </Popup>
                                </div>
                            </div>
                        :
                            <div className={classes.menuItem}>
                                <Popup closeOnDocumentClick trigger={<button className={classes.myHdrBtn} style={{border: 'none'}}>Решать задания</button>} modal>
                                    <TestPopup  reset={reset} setTesting={props.setTesting} setSimElements={props.setSimElements}></TestPopup>
                                </Popup>
                            </div>
                        }
                    </div>
                </Popup>
            </div>  
            :
            null
        }
    </div>
  )
}

export default Tests