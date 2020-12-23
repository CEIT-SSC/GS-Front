import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #2a5496;
`

export const GuiContainer = styled.div`
    display: ${props => props.showGui ? "flex" : "none"};
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100vh;
    justify-content:center;
    align-items:center;
    background-color: rgba(100,100,100,0.6);
`

export const Gui = styled.div `
    width:50%;
    height:100vh;
    border-radius:5%;
    background-color:white;
`