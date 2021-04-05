import React, { Component } from 'react';
import Icon from '@material-ui/core/icon';
import TextareaAutosize from 'react-textarea-autosize';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";      //IMPORTANT
import { addList, addCard } from '../actions'        //IMPORTANT
import { DragDropContext } from 'react-beautiful-dnd';

class TrelloActionButton extends Component {
    // state to show the form 
    state = {
        formOpen: false,
        text: ""
    }

    openForm = () => {
        this.setState({
            formOpen: true
        });
    };

    closeForm = (e) => {
        this.setState({
            formOpen: false
        });
    };

    handleInputChange = e => {
        this.setState({
            text: e.target.value
        })
    }
    // creating a function that handles dispatching of function
    handleAddList = () => {
        const { dispatch } = this.props;
        const { text } = this.state;

        if (text) {
            this.setState({
                text: ""
            });

            dispatch(addList(text))
        }

        return;
    };

    handleAddCard = () => {
        const { dispatch, listID } = this.props;
        const { text } = this.state;
        if (text) {
            this.setState({
                text: ""
            });
            dispatch(addCard(listID, text))
        }

        return;
    }

    renderAddButton = () => {
        const { list } = this.props;
        console.log(list);
        const buttonText = list ? "Add another list" : "Add another card";
        const buttonTextOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? 'white' : 'inherit';
        const buttonTextBackground = list ? 'rgba(0,0,0,0.15)' : 'inherit';

        return (
            <div
                //to open form on clicking it
                onClick={this.openForm}
                style={{
                    ...styles.openFormButtonGroup,
                    opacity: buttonTextOpacity,
                    color: buttonTextColor,
                    backgroundColor: buttonTextBackground
                }}>
                <Icon>
                    add
            </Icon>
                <p>{buttonText}</p>
            </div >
        );
    };

    renderForm = () => {
        const { list } = this.props;
        const placeholder = list ? "Enter List Title... " : "Enter a title for this card...";

        const buttonTitle = list ? "Add List" : "Add Card";

        return <div>
            <Card style={{
                overflow: 'visible',
                minHeight: 100,
                minWidth: 272,
                padding: "6px 8px 2px"

            }}>
                <TextareaAutosize
                    placeholder={placeholder}
                    autoFocus
                    //to close form on clicking anywhere outside the form
                    onBlur={this.closeForm}
                    value={this.state.text}
                    onChange={this.handleInputChange}
                    style={{
                        resize: "none",
                        width: '100%',
                        outline: 'none',
                        border: 'none',
                        height: '100%',
                        overflow: 'hidden',   //to hide the controller buttons in textbox area
                    }}
                />
            </Card>
            <div style={styles.formButtonGroup}>
                <Button
                    onMouseDown={list ? this.handleAddList : this.handleAddCard}
                    variant="contained"
                    style={{ color: 'white', backgroundColor: '#5aac44' }}>{buttonTitle}</Button>
                <Icon style={{ marginLeft: 8, cursor: 'pointer' }}>close</Icon>
            </div>
        </div>
    }

    render() {

        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}
const styles = {
    openFormButtonGroup: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 3,
        height: 36,
        width: 250,
        paddingLeft: 10
    },
    formButtonGroup: {
        marginTop: 8,
        display: 'flex',
        alignItems: 'center'
    }

}





export default connect()(TrelloActionButton);