import styled from 'styled-components';

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