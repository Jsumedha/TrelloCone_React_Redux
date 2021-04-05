// import React from 'react';
// // import classes from './TrelloList.css';
// import TrelloCard from '../TrelloCard';
// import TrelloActionButton from '../TrelloActionButton';
// import { Draggable, Droppable } from "react-beautiful-dnd";
// import styled from 'styled-components';

import React, { useState } from "react";
import TrelloCard from "../TrelloCard";
import TrelloActionButton from '../TrelloActionButton';

import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import { editTitle, deleteList } from "../../actions";
import Icon from "@material-ui/core/Icon";

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin: 0 8px 0 0;
`;

const StyledInput = styled.input`
  width: 95%;
  border: none;
  outline-color: blue;
  border-radius: 3px;
  margin-bottom: 3px;
  padding: 5px;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const DeleteButton = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  opacity: 0.4;
  &:hover {
    opacity: 0.8;
  }
`;

const ListTitle = styled.h4`
  transition: background 0.3s ease-in;
  ${TitleContainer}:hover & {
    background: #ccc;
  }
`;

const TrelloList = ({ title, cards, listID, index, dispatch }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [listTitle, setListTitle] = useState(title);

    const renderEditInput = () => {
        return (
            <form onSubmit={handleFinishEditing}>
                <StyledInput
                    type="text"
                    value={listTitle}
                    onChange={handleChange}
                    autoFocus
                    onFocus={handleFocus}
                    onBlur={handleFinishEditing}
                />
            </form>
        );
    };

    const handleFocus = e => {
        e.target.select();
    };

    const handleChange = e => {
        e.preventDefault();
        setListTitle(e.target.value);
    };

    const handleFinishEditing = e => {
        setIsEditing(false);
        dispatch(editTitle(listID, listTitle));
    };

    const handleDeleteList = () => {
        dispatch(deleteList(listID));
    };




    return (
        <Draggable draggableId={String(listID)} index={index}>
            {provided => (
                <ListContainer
                    {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps} >
                    <Droppable droppableId={String(listID)}>
                        {
                            provided => (
                                <div>
                                    <div>
                                        {isEditing ? (
                                            renderEditInput()
                                        ) : (
                                            <TitleContainer onClick={() => setIsEditing(true)}>
                                                <ListTitle>{listTitle}</ListTitle>
                                                <DeleteButton onClick={handleDeleteList}>delete</DeleteButton>
                                            </TitleContainer>
                                        )}
                                    </div>
                                    <div

                                        {...provided.droppableProps}
                                        ref={provided.innerRef} >
                                        {cards.map((card, index) =>
                                        (
                                            <TrelloCard
                                                key={card.id}
                                                index={index}
                                                text={card.text}
                                                cardID={card.id}
                                                listID={listID}
                                            />

                                        )
                                        )}

                                        {provided.placeholder}
                                        <TrelloActionButton listID={listID} />
                                    </div>
                                </div>
                            )}
                    </Droppable>
                </ListContainer>
            )}
        </Draggable>

    );
};

// const styles = {
//     container: {
//         backgroundColor: "#dfe3e6",
//         borderRadius: 3,
//         width: 300,
//         padding: 8,
//         margin: 2,
//         height: '100%'

//     }
// }

export default connect()(TrelloList);