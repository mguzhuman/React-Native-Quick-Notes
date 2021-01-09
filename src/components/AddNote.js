import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Keyboard, Alert, Text} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

import {THEME} from "../theme";
import {AppTextBold} from "./ui/AppTextBold";

export const AddNote = ({onSubmit}) => {
    return (
        <View style={styles.block}>
            <AppTextBold style={styles.text}>Notes list</AppTextBold>
            <AntDesign.Button onPress={onSubmit} name='pluscircleo'>Add</AntDesign.Button>
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