import {
    ADD_NOTE,
    CLEAR_ERROR,
    FETCH_NOTES,
    HIDE_LOADER,
    REMOVE_NOTE,
    SHOW_ERROR,
    SHOW_LOADER,
    UPDATE_NOTE
} from "../types";

const handlers = {
    [ADD_NOTE]: (state, {title, id}) => ({
        ...state, notes: [...state.notes, {id, title}]
    }),

    [REMOVE_NOTE]: (state, {id}) => ({
        ...state, notes: state.notes.filter(note => note.id !== id)
    }),
    [UPDATE_NOTE]: (state, {title, id}) => ({
        ...state, notes: state.notes.map(note => {
            if (note.id === id) {
                note.title = title
            }
            return note
        })
    }),
    [SHOW_LOADER]: state => ({...state, loading: true}),
    [HIDE_LOADER]: state => ({...state, loading: false}),
    [CLEAR_ERROR]: state => ({...state, error: null}),
    [SHOW_ERROR]: (state, {error}) => ({...state, error}),
    [FETCH_NOTES]: (state, {notes}) => ({...state, notes}),
    DEFAULT: state => state
}

export const noteReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}