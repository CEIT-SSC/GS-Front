import styled from 'styled-components';
import {Container as BSContainer} from 'react-bootstrap';

export const Container = styled(BSContainer)`
    height: 100%;
    direction: rtl;
    overflow-y: scroll;
`

export const QTableContainer = styled.div`
    height: 100%;
    width: 100%;
`
export const QTableTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    padding: 10px 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid #ddd;
    text-align: right;
`
export const QTableEl = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: ${props => props.active ? "bold" : "light"};;
    border-radius: 3px;
    background-color: ${props => props.active ? "#eee" : "transparent"};
    transition: background-color 0.3s;
    &:hover{
        background-color: #eee  ;
    }
`

export const State = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: ${props => props.state === 'notTouched' ?
        "#868686" : props.state === 'finished' ?
            "#29cc30" : props.state === 'workingOn' ?
                "#ffc107" : "#ca2a2a"};
`

//SQ = SingleQuestion
export const SQContainer = styled.div`
    height: 100%;
    width: 100%;
    margin-bottom: 30px;
`
export const SQTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    padding: 20px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd;
    text-align: center;
`

export const SQBody = styled.p`
    font-size: 14px;
    padding: 10px;
    text-align: right;
    white-space: pre-line;
`

export const SQExample = styled.div`
    width: 100%;
    padding: 15px;
    background-color: #eee;
    text-align: left;
    direction: ltr;
    white-space: pre-line;
    font-size: 14px;
    font-family: 'Source Code Pro', monospace;
`

export const SQHeader = styled.h6`
    text-align: right;
    margin: 15px 0;
`
export const SubmitTitle = styled.h5`
    text-align: center;
    padding: 10px;
    margin: 15px 0;
    border-bottom: 1px solid #ddd;
`