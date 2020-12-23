import React from 'react';
import {ToggleSwitch} from './ToggleStyle';

const Toggle = (props) => {
    
    return (
        <>
          <ToggleSwitch 
            onChange={() => props.onCheck()} 
            checked={props.checked}
            handleDiameter={20}
            offColor="#08f"
            onColor="#0ff"
            offHandleColor="#0ff"
            onHandleColor="#08f" 
          />
          
        </>
    )
}

export default Toggle;