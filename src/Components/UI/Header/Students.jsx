import React, { useEffect, useState } from 'react'
import classes from './Header.module.css';
import TestPopup from './TestPopup'
import Popup from 'reactjs-popup'
import axios from 'axios';
import StudentTable from './StudentTable';

function Students({token, ...props}) {
  return (
    <div className={classes.menu}>
        <Popup closeOnDocumentClick trigger={<button className={classes.myHdrBtn}>Студенты</button>} modal>
            <StudentTable token={token}></StudentTable>
                
        </Popup>
    </div>
  )
}

export default Students