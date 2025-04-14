import { StyleSheet } from 'react-native';

const defaultTheme = StyleSheet.create({
    header1: {
        fontSize: 30,
        color: '#fff'
    },

    seperator: {
        height: 1,
        width: '100%',
        backgroundColor: '#ddd',
    },

    textInput: {
        borderBottomColor: '#c0c0c0',
        borderBottomWidth: 1,
        color: '#fff',
    },

    button: {
        backgroundColor: '#ffd33d',
    },

    channelBookmarkIcon: {
        fontSize: 30,
        color: '#888',
        paddingLeft: 5
    },

    channelBookmarkNameText: {
        color: '#fff',
        fontSize: 22,
        padding: 2
    }
});

export default defaultTheme;