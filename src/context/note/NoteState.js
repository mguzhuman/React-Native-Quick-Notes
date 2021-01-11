import React, {useReducer, useContext} from 'react';
import {Alert} from "react-native";
import {NoteContext} from './noteContext';
import {noteReducer} from './noteReducer';
import {Http} from '../../http'
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
import {ScreenContext} from "../screen/screenContext";

export const NoteState = ({children}) => {
    const initialState = {
        notes: [],
        loading: false,
        error: null
    }
    const {changeScreen} = useContext(ScreenContext);
    const [state, dispatch] = useReducer(noteReducer, initialState)

    const addNote = async (title, text) => {
        clearError()
        try {
            const data = await Http.post('https://react-native-quick-notes-default-rtdb.europe-west1.firebasedatabase.app/notes.json', {
                title,
                text
            })
            dispatch({type: ADD_NOTE, title, text, id: data.name})
        } catch (e) {
            showError('Error...')
        }

    }

    const removeNote = id => {
        const note = state.notes.find(n => n.id === id)
        Alert.alert(
            "Delete note",
            `You are sure delete "${note.title}"?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    style: 'destructive',
                    onPress: async () => {
                        changeScreen(null)
                        await Http.delete(`https://react-native-quick-notes-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}.json`)
                        dispatch({type: REMOVE_NOTE, id})
                    }
                }
            ],
            {cancelable: false}
        );


    }
    const updateNote = async (id, title, text) => {
       // console.log({id, title, text})
        clearError()
        try {
            await Http.patch(`https://react-native-quick-notes-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}.json`, {
                title,
                text
            })
            dispatch({type: UPDATE_NOTE, id, title, text})
        } catch (e) {
            showError('Error...')
            console.log(e)
        }
    };

    const showLoader = () => dispatch({type: SHOW_LOADER});
    const hideLoader = () => dispatch({type: HIDE_LOADER});

    const showError = error => dispatch({type: SHOW_ERROR, error})
    const clearError = () => dispatch({type: CLEAR_ERROR})

    const fetchNotes = async () => {
        showLoader()
        clearError()
        try {
            const data = await Http.get('https://react-native-quick-notes-default-rtdb.europe-west1.firebasedatabase.app/notes.json')
            const notes = Object.keys(data).map(key => ({...data[key], id: key}))
            dispatch({type: FETCH_NOTES, notes})
        } catch (e) {
            showError('Error...')
            console.log(e)
        } finally {
            hideLoader()
        }
    }

    return <NoteContext.Provider value={{
        fetchNotes,
        notes: state.notes,
        loading: state.loading,
        error: state.error,
        addNote,
        removeNote,
        updateNote
    }}>{children}</NoteContext.Provider>
}