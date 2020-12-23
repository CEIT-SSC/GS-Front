import React, {useState} from 'react';
import Toggle from '../../components/UI/switch/ToggleSwitchComp';
import { MainContainer } from './HomeStyle';

const Home = (props) => {
    
    const [showGui , setShowGui] = useState(false);


    return(
    <>  
        <MainContainer>
        <Toggle checked={showGui} onCheck={() => setShowGui(!showGui)}></Toggle>
        <h1 style={{display: showGui ? 'block' : 'none'}}> I'm showing Gui</h1>
        </MainContainer>
    </>
)};

export default Home;