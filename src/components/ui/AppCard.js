import React from 'react';
import {View, StyleSheet} from "react-native";

export const AppCard = props => {
    return (
        <View style={{
            ...styles.default,
            ...props.style
        }}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    default: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {width: 2, height: 2},
        borderRadius: 10,
        elevation: 8,
    }
})