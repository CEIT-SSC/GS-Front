import styled from 'styled-components';
import { Container as BSContainer } from 'react-bootstrap';

export const Container = styled(BSContainer)`
    background-color: white;
    height: 85%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    filter: invert(${props => props.isdark ? 0.9 : 0}) hue-rotate(${props => props.isdark ? '180deg' : '0deg'});
    @media (max-width: 576px){
        max-width: 95%;
    };
    @media (min-width: 992px){
        max-width: 950px;
    }
`;