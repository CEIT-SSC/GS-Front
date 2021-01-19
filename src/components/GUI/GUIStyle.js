import styled from 'styled-components';
import { Container as BSContainer } from 'react-bootstrap';

export const Container = styled(BSContainer)`
    background-color: white;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    @media (max-width: 576px){
        max-width: 95%;
    };
    @media (min-width: 992px){
        max-width: 800px;
    }
`;