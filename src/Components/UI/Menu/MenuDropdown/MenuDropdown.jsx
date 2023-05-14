import React, { useState } from 'react';
import MenuDropdownElement from '../MenuDropdownElement/MenuDropdownElement';

import classes from './MenuDropdown.module.css';
import MenuButtonBlock from '../MenuButtonBlock/MenuButtonBlock';

const MenuDropdown = function ({visible, setVisible, ...props}) {
    const [Blocks, setBlocks] = useState([
        {id: 0, title: 'Input', visible: false},
        {id: 1, title: 'Output', visible: false},
        {id: 2, title: 'Gates', visible: false},
        {id: 3, title: 'Plexors', visible: false},
    ]);
    const TextButtons = [
        {   
            id: 0,
            BlockText: [
                {name: 'Input',},
                {name: 'Buffer',},
            ],
        },
        {   
            id: 1,
            BlockText: [
                {name: 'Output',},
            ],
        },
        {   
            id: 2,
            BlockText: [
                {name: 'And',},
                {name: 'Or',},
                {name: 'Not',},
                {name: 'Xor',},
                {name: 'Nand',},
                {name: 'Nor',},
                {name: 'Xnor',},
            ],
        },
        {   
            id: 3,
            BlockText: [
                {name: 'MS',},
                {name: 'DMS',},
                {name: 'CD',},
                {name: 'DC',},
            ],
        },
    ]
    const setBlockVisible = (id) => {
        const bb = Blocks.slice();
        bb.map(b => {
            if(b.id !== id){
                bb[b.id] = {...bb[b.id], visible: false};
            }
            else{
                bb[id] = {...bb[id], visible: !bb[id].visible};
            }
        })
        setBlocks(bb);
    }

    const divClasses = [classes.menuDropdown];
    if(visible){
        divClasses.push(classes.menuDropdownActive);
    }

    return (
        <div className={divClasses.join(' ')}>
            {Blocks.map(block => 
                <div key={block.id}>
                    <MenuDropdownElement block={block} setBlockVisible={setBlockVisible}>{block.title}</MenuDropdownElement>
                    <MenuButtonBlock addComponent={props.addComponent} visible={block.visible} text={TextButtons[block.id].BlockText}></MenuButtonBlock>
                </div>
            )}
        </div>
        
    )
}

export default MenuDropdown;