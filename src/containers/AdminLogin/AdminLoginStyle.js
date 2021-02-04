import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props=> props.isdark ? '#0d1117' : '#2a5496'};
    width: 100%;
    height: 100vh;
`