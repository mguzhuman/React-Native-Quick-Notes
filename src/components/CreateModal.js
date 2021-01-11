import React, {useState} from "react";
import {Dimensions, StyleSheet, View, Modal, TextInput} from "react-native";
import {FontAwesome, AntDesign} from '@expo/vector-icons';

import {THEME} from '../theme';
import {AppButton} from "./ui/AppButton";
import {AppText} from "./ui/AppText";
import {AppTextBold} from "./ui/AppTextBold";
import {AppCard} from "./ui/AppCard";

export const CreateModal = ({visible, onCancel, onSave}) => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
const [height,setHeight] = useState()

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
            <View style={styles.wrap}>
                <View style={styles.blockInput}>
                    <AppTextBold style={styles.title}>
                        Title:
                    </AppTextBold>
                    <AppCard>
                        <TextInput
                            style={styles.input}
                            onChangeText={setTitle}
                            value={title}
                            maxLength={24}
                        />
                    </AppCard>
                </View>
                <View style={styles.blockInput}>
                    <AppTextBold style={styles.title}>
                        Text:
                    </AppTextBold>
                    <AppCard>
                        <TextInput
                            style={{...styles.input, height}}
                            multiline
                            numberOfLines={8}
                            onChangeText={setText}
                            value={text}
                        />
                    </AppCard>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <AppButton color={THEME.DANGER_COLOR} onPress={cancelHandler}>
                            <FontAwesome name='remove' size={20} color='#fff'/>
                        </AppButton>
                    </View>
                    <View style={styles.button}>
                        <AppButton color={THEME.GREEN_COLOR} onPress={() => {
                            onSave(title, text)
                            cancelHandler()
                        }}>
                            <FontAwesome name='save' size={20} color='#fff'/>
                        </AppButton>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    blockInput: {
        paddingTop: 20,
        paddingBottom: 20,
        width: '80%'
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
    },
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '100%',
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})