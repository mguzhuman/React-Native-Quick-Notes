import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Keyboard, Alert, Text} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

import {THEME} from "../theme";
import {AppTextBold} from "./ui/AppTextBold";
import {CreateModal} from "./CreateModal";

export const AddNote = ({onSubmit}) => {
    const [modal, setModal] = useState(false);
    return (
        <View style={styles.block}>
            <CreateModal
                visible={modal}
                onCancel={()=>setModal(false)}
                onSave={onSubmit}
            />
            <AppTextBold style={styles.text}>Notes list</AppTextBold>
            <AntDesign.Button onPress={()=>setModal(true)} name='pluscircleo'>Add</AntDesign.Button>
        </View>
    )
}
const styles = StyleSheet.create({
    block: {
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        width: '60%',
        padding: 10,
        fontSize: 30
    }
})