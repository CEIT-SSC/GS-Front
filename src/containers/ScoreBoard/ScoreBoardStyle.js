import styled from 'styled-components';
import {Link} from 'react-router-dom';
import{Container} from 'react-bootstrap';

export const MainContainer = styled(Container)`
    @media(min-width: 768px){
        width: 750px;
    }
`

export const ListContainer = styled.div`
    padding : 20px;
    background-color: white;
    margin: 10vh 0;
    height: 80vh;
    overflow-y: scroll;
    border-radius: 10px;
    @media(max-width: 768px){
        h1 {
            font-size: 26px;
        }
    }
    filter: invert(${props => props.isdark ? 0.9 : 0}) hue-rotate(${props => props.isdark ? '180deg' : '0deg'});
`

export const BackLink = styled(Link)`
    text-decoration: none;
    font-size: 14px;
    position: absolute;
    top: 15px;
    left: 15px;
    color: white;
    border: 1px solid white;
    border-radius: 5px;
    padding: 5px 10px;
    transition: all 0.3s;
    font-weight: bold;
    &:hover{
        text-decoration: none;
        background-color: white;
        color: black;
    }
`