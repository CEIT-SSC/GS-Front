import React, {useState} from 'react';
import Toggle from '../../components/UI/switch/ToggleSwitchComp';
import { MainContainer } from './HomeStyle';
import {GuiContainer} from './GuiStyle';

const Home = (props) => {
    
    const [showGui , setShowGui] = useState(false);


    return(
    <>  
        <MainContainer>
        <Toggle style={{zIndex:'9999' , position:'absolute'}} checked={showGui} onCheck={() => setShowGui(!showGui)}></Toggle>
        {/* <h1 style={{display: showGui ? 'block' : 'none'}}> I'm showing Gui</h1> */}
        <GuiContainer showGui={showGui}>
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </GuiContainer>
        </MainContainer>
    </>
)};

export default Home;