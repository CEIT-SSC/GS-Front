import styled from 'styled-components';
import { Container as Cont} from 'react-bootstrap';

export const Container = styled.div`
    // padding: 30px 0;
    background-color: ${props=> props.isdark ? '#0d1117' : '#2a5496'};
    width: 100%;
    min-height: 100vh;
`

export const BSContainer = styled(Cont)`
    @media(min-width: 800px){
        width: 800px;
    }
`