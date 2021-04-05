import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";


const BackdropContainer = styled.div`
width:100%;
height:100%;
position:fixed;
z-index:100;
left:0;
top:0;
background-color:rgba(0,0,0,0.1);
`;




const Backdrop = (props) => {
    console.log(props);
    return (
        props.show ? <BackdropContainer onClick={props.clicked} ></BackdropContainer> : null

    );
}
export default connect()(Backdrop);