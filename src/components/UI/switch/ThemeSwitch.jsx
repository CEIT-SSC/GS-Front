import React from 'react';
import ToggleSwitch from 'react-switch';
import { FaMoon, FaSun } from 'react-icons/fa';

import { ThemeContainer } from './ToggleStyle';

const Toggle = (props) => {
    
    return (
        <ThemeContainer>
          <ToggleSwitch 
            onChange={() => props.onCheck()} 
            checked={props.checked}
            handleDiameter={20}
            offColor="#000000"
            onColor="#221a1a"
            offHandleColor="#0ff"
            onHandleColor="#08f"  
            checkedIcon={<div  style={{padding:'0 8px'}}><FaSun color="yellow"/></div>}
            uncheckedIcon={<div style={{padding:'0 8px'}}><FaMoon color="white"/></div>}
          />
        </ThemeContainer>
    )
}

export default Toggle;