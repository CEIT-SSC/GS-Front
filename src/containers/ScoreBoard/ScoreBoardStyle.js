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
`

