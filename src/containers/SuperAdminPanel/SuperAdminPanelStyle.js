import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import {Button} from 'react-bootstrap';

export const Container = styled.div`
    display: flex;
    flex-wrap:wrap;
    align-items: center;
    justify-content: center;
    background-color: #2a5496;
    width: 100%;
    height: 100vh;
`

export const MainButton  = styled(Button) `
    background-color:white;
    width: 300px;
    height : 300px;
    min-width:150px;
    min-height:150px;
    margin: 20px;
    color: #2a5496;
    
`