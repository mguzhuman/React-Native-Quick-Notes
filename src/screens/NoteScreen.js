import React, {useContext, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {FontAwesome, AntDesign} from '@expo/vector-icons';

import {THEME} from '../theme';
import {AppCard} from "../components/ui/AppCard";
import {EditModal} from "../components/EditModal";
import {AppTextBold} from "../components/ui/AppTextBold";
import {AppButton} from "../components/ui/AppButton";
import {NoteContext} from "../context/note/noteContext";
import {ScreenContext} from "../context/screen/screenContext";

export const NoteScreen = () => {
    const {notes, updateNote, removeNote} = useContext(NoteContext)
    const {noteId, changeScreen} = useContext(ScreenContext)

    const [modal, setModal] = useState(false);

    const note = notes.find(note => note.id === noteId)


    const saveHandler = async title => {
       await updateNote(note.id, title)
        setModal(false)
    }

    return (
        <View>
            <EditModal
                visible={modal}
                onCancel={() => setModal(false)}
                value={note.title}
                onSave={saveHandler}
            />
            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{note.title}</AppTextBold>
                <AppButton onPress={() => setModal(true)}>
                    <FontAwesome name='edit' size={20}/>
                </AppButton>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton color={THEME.GREY_COLOR} onPress={()=> changeScreen(null)}>
                        <AntDesign name='back' size={20} color='#fff'/>
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton color={THEME.DANGER_COLOR} onPress={() => removeNote(note.id)}>
                        <FontAwesome name='remove' size={20} color='#fff'/>
                    </AppButton>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    button: {
        width: Dimensions.get('window').width / 3
    },
    title: {
        fontSize: 20,
    },
    card: {
        marginBottom: 20,
        padding: 15
    }
    // backBtn:{
    // },
    // deleteBtn:{
    //
    // }
})