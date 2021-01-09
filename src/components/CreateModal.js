import React, {useState} from "react";
import {Dimensions, StyleSheet, View, Modal} from "react-native";
import {FontAwesome, AntDesign} from '@expo/vector-icons';

import {THEME} from '../theme';
import {AppButton} from "./ui/AppButton";

export const CreateModal = ({visible, onCancel, onSave}) => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const cancelHandler = () => {
        setTitle('')
        setText('')
        onCancel()
    }


    return (
        <Modal
            visible={visible}
            animationType='slide'
        >
            New note

            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton color={THEME.DANGER_COLOR} onPress={cancelHandler}>
                        <FontAwesome name='remove' size={20} color='#fff'/>
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton color={THEME.GREEN_COLOR} onPress={() => onSave(title,text)}>
                        <FontAwesome name='save' size={20} color='#fff'/>
                    </AppButton>
                </View>
            </View>
        </Modal>
    )
}

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
})