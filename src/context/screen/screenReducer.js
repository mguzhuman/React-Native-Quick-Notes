import {CHANGE_SCREEN} from "../types";

const handlers = {
    [CHANGE_SCREEN]: (state, payload) => payload,
    DEFAUT: state => state
}

export const screenReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAUT
    return handler(state, action.payload)
}