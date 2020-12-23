import React, {useState} from 'react';
import TpggleSwitch from 'react-switch';

const ToggleSwitchComp = (props) => {
    
    const [checked, onCheck] = useState(false);
    
    return (
        <>
          <TpggleSwitch 
            onChange={() => onCheck} 
            checked={checked}
            handleDiameter={20}
            offColor="#08f"
            onColor="#0ff"
            offHandleColor="#0ff"
            onHandleColor="#08f" 
          />
          
        </>
    )
}

export default ToggleSwitchComp;