import React from 'react'
import classes from './Header.module.css';
import HeaderButton from '../HeaderButton/HeaderButton';
import RegPopup from './RegPopup';
import AutoPopup from './AutoPopup';
import Popup from 'reactjs-popup';
import axios from 'axios';

function Profile({user, setUser, token, setToken, ...props}) {
    const exit = () => {
        axios.post('http://127.0.0.1:8000/auth/token/logout/', {},
        {
            headers: {
              Authorization: 'Token ' + token
            }
        })
        .then(res => {
            setUser("")
            setToken("")
            props.reset()
        })
        .catch(err => console.log(err));
    }
  return (
    <div className={classes.menu} >
        <Popup
            trigger={<button className={classes.myHdrBtn}>Профиль</button>}
            position='bottom center'
            mouseLeaveDelay={50}
            mouseEnterDelay={0}
            contentStyle={{ padding: '0px', border: 'none' }}
            arrow={true}
            nested
            >
            <div className="menu">
                {user !== "" ? 
                    <div className={classes.menuItem}> 
                        <HeaderButton onClick={() => exit()} style={{border: 'none'}}>Выход</HeaderButton>
                    </div>
                    :
                    <div>
                        <div className={classes.menuItem}>
                            <Popup closeOnDocumentClick trigger={<button className={classes.myHdrBtn} style={{border: 'none'}}>Регистрация</button>} modal>
                                <RegPopup></RegPopup>
                            </Popup>
                        </div>
                        <div className={classes.menuItem}> 
                            <Popup closeOnDocumentClick trigger={<button className={classes.myHdrBtn} style={{border: 'none'}}>Авторизация</button>} modal>
                                <AutoPopup setToken={setToken}></AutoPopup>
                            </Popup>
                        </div>
                    </div>
                }
                
            </div>
        </Popup>
    </div>
  )
}

export default Profile