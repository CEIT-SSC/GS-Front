import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    flex-wrap:wrap;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.isdark ? '#0d1117' : '#2a5496'};
    width: 100%;
    min-height: 100vh;
    @media(max-width: 768px){
        flex-direction: column;
    }
`

export const MainButton  = styled(Link) `
    text-decoration: none;
    background-color:white;
    width: 300px;
    height : 300px;
    min-width:150px;
    min-height:150px;
    margin: 20px;
    color: #2a5496;
    font-size: 30px;
    font-weight: bold;
    border-radius: 15px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: invert(${props => props.isdark ? 0.9 : 0}) hue-rotate(${props => props.isdark ? '180deg' : '0deg'});
    transition: all 0.3s;
    &:hover{
        text-decoration: none;
        background-color: #0a1c38;
        color: white;
    }
    @media(max-width: 768px){
        height: 150px;
    }
`