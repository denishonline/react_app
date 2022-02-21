import { SET_TAB } from './../actions/tab';

const tab = (state = "home", action) => {
    switch (action.type) {

        case SET_TAB:
            return action.tab;

        default:
            return state;
    }
};
export default tab;