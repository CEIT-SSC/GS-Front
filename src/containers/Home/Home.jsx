import React, { useState } from 'react';
import Toggle from '../../components/UI/switch/ToggleSwitch';
import { MainContainer, GuiContainer, Gui } from './HomeStyle';


const Home = (props) => {

    const [showGui, setShowGui] = useState(false);


    return ( 
        <>
            <MainContainer>
                <Toggle checked={showGui} onCheck={() => setShowGui(!showGui)}></Toggle>
                <GuiContainer showGui={showGui}>
                    <Gui></Gui>
                </GuiContainer>
            </MainContainer>   
        </>
    )
};

export default Home;