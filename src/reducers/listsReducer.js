
import { CONSTANTS } from '../actions';

let listID = 0;
let cardID = 0;

const initialState = [

    {
        title: 'BJH',
        id: 'list-0',
        cards: []
    }
];

const listsReducer = (state = initialState, action) => {
    switch (action.type) {

        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${listID}`,
            }
            listID += 1;

            // localStorage.setItem('ListsName', JSON.stringify(newList));
            return [...state, newList];

        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`,
            }
            cardID += 1

            //now deciding where to store new card in
            const newState = state.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                }
                else {
                    return list;
                }
            });
            // localStorage.setItem('cardsName', JSON.stringify(newCard));
            return newState;
        }

        case CONSTANTS.DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexEnd,
                droppableIndexStart,
                draggableId,
                type }
                = action.payload;
            const newState = [...state];

            //dragging lists around 
            if (type === "list") {
                const list = newState.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...list);
                return newState;
            }

            //in the same list
            if (droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }
            //in another list
            if (droppableIdStart !== droppableIdEnd) {
                //find the list where the other drag happened
                const listStart = state.find(list => droppableIdStart === list.id)

                //pull out the card from this list
                const card = listStart.cards.splice(droppableIndexStart, 1);

                //find the list where the drag ended
                const listEnd = state.find(list => droppableIdEnd === list.id);

                //put the card in the new list
                listEnd.cards.splice(droppableIndexEnd, 0, ...card)
            }
            return newState;

        case CONSTANTS.EDIT_LIST_TITLE: {
            const { listID, newTitle } = action.payload;
            console.log(listID);
            console.log(state);
            console.log(newTitle);

            // const list = state.find((list => list.id === listID));
            // list.title = newTitle;
            // return state;

            const newState = state.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        title: newTitle,
                    }
                }
                else {
                    return list;
                }
            });

            return newState;
        }

        case CONSTANTS.DELETE_LIST: {
            const { listID } = action.payload;
            const newState = [...state];
            console.log(state);
            console.log(newState);

            const updatedState = newState.filter(function (el) { return el.id !== listID; });
            console.log(updatedState);
            localStorage.setItem('ListsName', JSON.stringify(updatedState));
            return updatedState;
            // newState.pop(list);
        }
        case CONSTANTS.EDIT_CARD: {
            const { cardID, listID, newText, newDesc, dueDate } = action.payload;

            const list = state.find((list => list.id === listID));
            console.log(list);
            const cards1 = list.cards;
            const card = cards1.find((card => card.id === cardID));

            card.text = newText;
            card.desc = newDesc;
            card.dueDate = dueDate;

            // state[1].cards[1].text = newText;

            return [...state];

            //     // const listsIndex = state.findIndex(list => list.id === listID);
            //     // console.log(listsIndex);
            //     // let newArray = [...state];
            //     // console.log(newArray);
            //     // console.log(newArray[listsIndex]);
            //     // const cardsIndex = newArray[listsIndex].cards.findIndex(card => card.id === cardID);
            //     // console.log(cardsIndex);
            //     // let updatedArray = [...newArray[listsIndex].cards]
            //     // console.log(updatedArray);
            //     // console.log(updatedArray[cardsIndex]);
            //     // updatedArray[cardsIndex] = { ...updatedArray[cardsIndex], text: newText, desc: newDesc, dueDate: dueDate }
            //     // console.log(updatedArray);
            //     // let updatedState = [...newArray[listsIndex], updatedArray];
            //     // console.log(updatedState);
            //     // return updatedArray;



            //     // const newState = state.map(list => {
            //     //     if (list.id === action.payload.listID) {
            //     //         const cards1 = list.cards
            //     //         console.log('kkokkopkpo');
            //     //         cards1.map(card => {
            //     //             if (card.id === action.payload.cardID) {

            //     //                 return {
            //     //                     ...card,
            //     //                     text: newText,
            //     //                     desc: newDesc,
            //     //                     dueDate: dueDate
            //     //                 }
            //     //             }
            //     //         })
            //     //     }

            //     // });
            //     // return newState;


            //     // const newState = state;
            //     // console.log(newState);
            //     // return newState;
            // }


        }
        default:
            return state;
    }
};

export default listsReducer;