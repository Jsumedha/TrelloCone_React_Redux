import { blue } from "@material-ui/core/colors";
import React from "react";
// import classes from './Popup.css';
import styled from 'styled-components';
import Backdrop from '../Backdrop/Backdrop'
// import TrelloButton from '../../TrelloButton'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import { connect } from "react-redux";


const Popup = styled.div`
position: fixed;
z-index: 500;
background-color: #dfe3e6;
width: 70%;
box-shadow: 1px 1px 1px black;
padding: 16px;
left: 15%;
top: 30%;
box-sizing: border-box;
transition: all 0.3s ease-out;
transform: ${props => props.show ? 'translateY(0)' : 'translateY(-100vh)'};
opacity: ${props => props.show ? 1 : 0};




@media (min-width: 600px) {
    .Popup {
        width: 500px;
        left: calc(50% - 250px);
    }
}
`;


const PopupContainer = ({ children, show, modalClosed }) => {
    console.log(show);
    console.log('hello');
    return (
        <Aux>
            <Backdrop show={show} clicked={modalClosed} />
            <PopupContainer>
                {children}
            </PopupContainer>
        </Aux>
    );

}

export default connect()(Popup);

