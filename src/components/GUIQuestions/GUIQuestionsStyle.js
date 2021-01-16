import styled from 'styled-components';

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
        background-color: #eee;
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