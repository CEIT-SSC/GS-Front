import React, { useState } from 'react';
import Toggle from '../../components/UI/switch/ToggleSwitch';
import { MainContainer, GuiContainer } from './HomeStyle';
import CLI from '../../components/CLI/CLI';
import GUI from '../../components/GUI/GUI';

const Home = (props) => {
    const [showGui, setShowGui] = useState(false);

    return ( 
        <>
            <MainContainer>
                <CLI />
                <Toggle checked={showGui} onCheck={() => setShowGui(!showGui)}></Toggle>
                <GuiContainer showGui={showGui}>
                    <GUI></GUI>
                </GuiContainer>
            </MainContainer>   
        </>
    )
};

export default Home;