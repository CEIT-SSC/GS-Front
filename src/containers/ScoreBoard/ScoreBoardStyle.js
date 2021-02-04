import styled from 'styled-components';
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

