import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import ThemeSwitch from '../../components/UI/switch/ThemeSwitch';

import Toggle from '../../components/UI/switch/ToggleSwitch';
import { MainContainer, GuiContainer } from './HomeStyle';
import CLI from '../../components/CLI/CLI';
import GUI from '../../components/GUI/GUI';
import * as actions from '../../store/actions';

const Home = ({theme}) => {
    const [showGui, setShowGui] = useState(false);
    const dispatch = useDispatch();
    return ( 
        <>
            <MainContainer isdark={theme === 'DARK'}>
                <CLI />
                <Toggle checked={showGui} onCheck={() => setShowGui(!showGui)}></Toggle>
                <ThemeSwitch checked={theme=== 'LIGHT'} onCheck={() => dispatch(actions.switchTheme())}/>
                <GuiContainer showGui={showGui}>
                    <GUI/>
                </GuiContainer>
            </MainContainer>   
        </>
    )
};

const mapStateToProps = (state) => ({
    theme: state.theme
})

export default connect(mapStateToProps)(Home);