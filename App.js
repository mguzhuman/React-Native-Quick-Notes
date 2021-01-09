import React, {useState} from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'

import {MainLayout} from "./src/MainLayout";
import {NoteState} from "./src/context/note/NoteState";
import {ScreenState} from "./src/context/screen/ScreenState";

async function loadApplication() {
    return Font.loadAsync({
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
    })
}

export default function App() {
    const [isReady, setIsReady] = useState(false)

    if (!isReady) {
        return <AppLoading
            startAsync={loadApplication}
            onError={err => console.log(err)}
            onFinish={() => setIsReady(true)}
        />
    }

    return (
        <ScreenState>
            <NoteState>
                <MainLayout/>
            </NoteState>
        </ScreenState>
    );
}