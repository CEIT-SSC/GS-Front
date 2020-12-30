import styled from 'styled-components';
import {Button} from 'react-bootstrap';

export const Container = styled.div`
    display: flex;
    flex-wrap:wrap;
    align-items: center;
    justify-content: center;
    background-color: #2a5496;
    width: 100%;
    min-height: 100vh;
`
export const ListContainer = styled.div`
    padding : 20px;
    background-color: white;
    min-height : 80vh;
    width : 60%;
    border-radius: 10px;
`

export const MainButton  = styled(Button) `
    background-color:white;
    width: 300px;
    height : 300px;
    min-width:150px;
    min-height:150px;
    margin: 20px;
    color: #2a5496;
    font-size: 30px;
    font-weight: bold;
`

export const DeleteButton  = styled(Button) `
    margin-right: 10px;
    margin-bottom: 5px;
    right: 0px;
    background-color: red;
    border-color: white;
`
export const EditButton  = styled(Button) `
    margin-right: 10px;
    margin-bottom: 5px;
    right: 0px;
    background-color: #eb9834;
    border-color: white;
`

