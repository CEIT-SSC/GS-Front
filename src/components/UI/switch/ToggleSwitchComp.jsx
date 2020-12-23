import React, {useState} from 'react';
import TpggleSwitch from 'react-switch';

const ToggleSwitchComp = (props) => {
    
    // const [checked, onCheck] = useState(props.checked);
    
    return (
        <>
          <TpggleSwitch 
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

export default ToggleSwitchComp;