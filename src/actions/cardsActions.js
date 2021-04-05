import { CONSTANTS } from '../actions';

//to know on which list we should add our card to we will pass listID as well
export const addCard = (listID, text) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: { text, listID }
    };
};
