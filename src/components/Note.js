import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {AppText} from "./ui/AppText";

export const Note = ({note, onRemove, onOpen}) => {

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onOpen(note.id)}
            onLongPress={onRemove.bind(null, note.id)}
        >
            <View style={styles.note}>
                <AppText>{note.title}</AppText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    note: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5
    },

})