import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Icon from "@material-ui/core/Icon";
import TrelloForm from "./TrelloForm";
import { editCard, deleteCard } from "../actions";
import { connect } from "react-redux";
import TrelloButton from "./TrelloButton";
import Popup from './UI/Popup/Popup';
// import Popupcontent from '../Popupcontent/Popupcontent';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { addTaskToFirebase, removeTaskFromFirebase } from '../firebase'
import { Description } from "@material-ui/icons";


const CardContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
`;

const EditButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  top: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const TrelloCard = ({ text, cardID, listID, index, dispatch }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [cardText, setText] = useState(text);
    const [isPopup, setisPopup] = useState(false);
    const [dueDate, setDueDate] = useState(new Date());
    const [selectedFile, setselectedFile] = useState([]);
    const [desc, setDesc] = useState('');

    useEffect(() => {
        localStorage.setItem(Description, JSON.stringify(desc));
    }, [desc])

    const closeForm = e => {
        setIsEditing(false);
    };

    const closePopup = e => {
        setisPopup(false);
    };

    const handleChange = e => {
        e.preventDefault();
        setText(e.target.value);

    };

    const handleDescChange = e => {
        e.preventDefault();
        setDesc(e.target.value);
    };

    const saveCard = e => {
        // 
        setIsEditing(false);
        console.log(desc);
        console.log('&&&&&&&&&&&&&&&')
        dispatch(editCard(cardID, listID, cardText, desc, dueDate));

    };

    const fileSelectedHandler = e => {
        console.log(e.target.files[0]);
        setselectedFile(e.target.files[0]);
    }

    const fileUploadHandler = e => {
        const fd = new FormData();
        fd.append('image', selectedFile, selectedFile.name);
        axios.post('https://jsonplaceholder.typicode.com/photos', fd)
            .then(res => {
                console.log(res);
            })
    }

    const renderEditForm = () => {
        return (
            <TrelloForm text={cardText} onChange={handleChange} closeForm={closeForm}>
                <TrelloButton onClick={saveCard}>Save</TrelloButton>
            </TrelloForm>
        );
    };

    // const renderPopup = e => {
    //    setPopup(false);

    // }


    const renderCard = () => {
        console.log(text);
        return (
            <>
                <Popup
                    // onBlur={closePopup}
                    show={isPopup} modalClosed={closePopup}>
                    {/* {Popupcontent } */}
                    <button style={{ float: 'right' }} onClick={closePopup}>x</button>
                    <h3><span><i class="fa fa-bars" aria-hidden="true"></i></span>  Description</h3>
                    {/* <form>
                        <textarea rows="5" cols="20" placeholder={desc} onChange={handleDescChange}  ></textarea>
                    </form> */}
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        addTaskToFirebase(e.target.task.value)
                    }}>
                        <input type="text" name="task" placeholder={desc} onChange={handleDescChange} />
                        <input type="submit" name="add task" onClick={saveCard} placeholder="Save" />
                    </form>
                    <hr />
                    <h3><span><i class="fa fa-clock-o" aria-hidden="true"></i></span>  Due date</h3>
                    <DatePicker selected={dueDate} onChange={date => setDueDate(date)} />
                    <button onClick={saveCard} >Set</button>
                    <hr />
                    <h3><span><i class="fa fa-paperclip" aria-hidden="true"></i>
                    </span>  Attachment</h3>
                    <input type="file" onChange={fileSelectedHandler} />
                    <button onClick={fileUploadHandler}>Upload</button>
                </Popup>
                <Draggable draggableId={String(cardID)} index={index}>

                    {provided => (

                        <CardContainer
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            // onClick={() => setIsEditing(true)}
                            onClick={() => setisPopup(true)}


                        >
                            {/* <EditButton
                                onMouseDown={() => setIsEditing(true)}
                                fontSize="small"
                                onClick={() => setisPopup(true)}
                            >Expand</EditButton> */}

                            <Card>
                                <EditButton
                                    onMouseDown={() => setIsEditing(true)}
                                    fontSize="small"
                                >edit</EditButton>




                                <CardContent>
                                    <Typography id={cardID} color="textSecondary" gutterBottom>
                                        {text}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardContainer>

                    )}

                </Draggable >
            </>
        );
    };
    return isEditing ? renderEditForm() : renderCard();
    // return (isPopup ? renderPopup() : renderCard());
};

// const styles = {
//     cardContainer: {
//         marginBottom: 8
//     }
// }

export default connect()(TrelloCard);