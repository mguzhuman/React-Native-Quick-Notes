import React, {useState, useEffect, useContext, useCallback} from 'react';
import {FlatList, StyleSheet, View, Image, Dimensions, StatusBar} from 'react-native';
import {AddNote} from "../components/AddNote";
import {Note} from "../components/Note";
import {THEME} from "../theme";
import {NoteContext} from "../context/note/noteContext";
import {ScreenContext} from "../context/screen/screenContext";
import {AppLoader} from "../components/ui/AppLoader";
import {AppText} from "../components/ui/AppText";
import {AppButton} from "../components/ui/AppButton";

export const MainScreen = () => {
    const {addNote, notes, removeNote, fetchNotes, loading, error} = useContext(NoteContext);
    const {changeScreen} = useContext(ScreenContext)
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);

    const loadNotes = useCallback(async () => await fetchNotes(), [fetchNotes])

    useEffect(() => {
        loadNotes()
    }, [])

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
            setDeviceWidth(width)
        }
        Dimensions.addEventListener('change', update)
        return () => {
            Dimensions.removeEventListener('change', update)
        }
    })

    if (loading) {
        return <AppLoader/>
    }
    if (error) {
        return (
            <View style={styles.center}>
                <AppText style={styles.error}>{error}</AppText>
                <AppButton onPress={loadNotes}>Try again</AppButton>
            </View>
        )
    }

    let content = <View style={{width: deviceWidth}}>
        <FlatList
            keyExtractor={item => item.id.toString()}
            data={notes}
            renderItem={({item}) => <Note note={item} onRemove={removeNote} onOpen={changeScreen}/>}
        />
    </View>
    if (notes.length === 0) {
        content = (
            <View style={styles.imageWrap}>
                <Image style={styles.image} source={require('../../assets/no-items.png')}/>
            </View>)
    }

    return (
        <View>
            <AddNote onSubmit={addNote}/>
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    imageWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    center:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error:{
        fontSize: 20,
        color: THEME.DANGER_COLOR
    }
})