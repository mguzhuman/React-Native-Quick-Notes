import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Modal, Alert} from "react-native";
import {THEME} from "../theme";
import {AppButton} from "./ui/AppButton";

export const EditModal = ({visible, onCancel, value, onSave}) => {
    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert('Error!', `The minimum length is 3 characters. Now ${title.length} characters.`)
        } else {
            onSave(title)
        }
    }

    const cancelHandler = () => {
        setTitle(value)
        onCancel()
    }

    return (
        <Modal
            visible={visible}
            animationType='slide'
        >
            <View style={styles.wrap}>
                <TextInput
                    style={styles.input}
                    placeholder='Type title'
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={64}
                    value={title}
                    onChangeText={setTitle}
                />
                <View style={styles.buttons}>
                    <AppButton onPress={cancelHandler} color={THEME.DANGER_COLOR}>Cancel</AppButton>
                    <AppButton onPress={saveHandler}>Save</AppButton>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%',
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})
