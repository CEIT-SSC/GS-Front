import React from 'react';
import ToggleSwitch from 'react-switch';

import { Container, Span } from './ToggleStyle';

const Toggle = (props) => {
    
    return (
        <Container>
          <ToggleSwitch 
            onChange={() => props.onCheck()} 
            checked={props.checked}
            handleDiameter={20}
            offColor="#000000"
            onColor="#221a1a"
            offHandleColor="#0ff"
            onHandleColor="#08f"  
            checkedIcon={<Span>GUI</Span>}
            uncheckedIcon={<Span>CLI</Span>}
          />
        </Container>
    )
}

export default Toggle;