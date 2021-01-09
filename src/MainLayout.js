import React, {useState, useContext} from "react";
import {View, StyleSheet, Alert} from "react-native";
import {Navbar} from "./components/Navbar";
import {THEME} from "./theme";
import {MainScreen} from "./screens/MainScreen";
import {NoteScreen} from "./screens/NoteScreen";
import {ScreenContext} from "./context/screen/screenContext";

export const MainLayout = () => {
    const {noteId} = useContext(ScreenContext)

    return (
        <View style={styles.wrapper}>
            <Navbar title='Quick Notes'/>
            <View style={styles.container}>
                {noteId ? <NoteScreen/> : <MainScreen/>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20,
        flex:1
    },
    wrapper: {
        flex: 1
    }
});