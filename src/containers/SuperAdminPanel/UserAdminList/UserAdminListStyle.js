import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container as BSContainer, Card} from 'react-bootstrap';

export const Container = styled(BSContainer)`
    @media(min-width: 768px){
        width: 750px;
    }
`
export const ListContainer = styled.div`
    padding : 20px;
    background-color: white;
    margin: 10% 0;
    min-height: 80vh;
    border-radius: 10px;
    filter: invert(${props => props.isdark ? 0.9 : 0}) hue-rotate(${props => props.isdark ? '180deg' : '0deg'});
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

export const Button = styled.button `
    display: flex;
    border: none;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    color: ${props => props.color};
    background-color: transparent;
    border-color: white; 
    
    &:focus{
        outline: none;
    }
`
export const AddNewBtn = styled(Button)`
    color: white;
    background-color: #18dd84;
    border-radius: 10px; 
    transition: background-color 0.3s;
    height: 40px;
    &:hover{
        background-color: #129e5e;
    }
`

export const TableEl = styled(Card)`
    height: 55px;
    padding: 15px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between  
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;