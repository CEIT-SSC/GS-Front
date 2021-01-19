import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Toggle from '../../components/UI/switch/ToggleSwitch';
import { MainContainer, GuiContainer, Gui } from './HomeStyle';
import CLI from '../../components/CLI/CLI';

const Home = (props) => {
    const [showGui, setShowGui] = useState(false);

    return ( 
        <>
            <MainContainer>
                <CLI />
                <Toggle checked={showGui} onCheck={() => setShowGui(!showGui)}></Toggle>
                <GuiContainer showGui={showGui}>
                    <Gui>
                        <Link to = '/scoreboard'> scoreboard</Link>
                    </Gui>
                </GuiContainer>
            </MainContainer>   
        </>
    )
};

export default Home;