import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface MessageContentProps
{
    username: string;
    message: string;
    datetime: string;
}

const MessageContent: React.FC<MessageContentProps> = ({
    username,
    message,
    datetime,
}) =>
{
    return(
        <View>
            <View>
                <Text style={[styles.datetime]}>{datetime}</Text>
            </View>
            <View style={styles.messageContainer}>
                <Text style={[styles.username, styles.text]}>{username}</Text>
                <Text style={[styles.message, styles.text]}>{message}</Text>
            </View>
        </View>
    );
}

export default MessageContent;

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        display: 'flex',
    },

    infoContainer: {
        flex: 1,
        display: 'flex',
    },

    text: {
        padding: 10,
    },

    username: {
        color:'rgb(250, 118, 118)',
    },

    message: {
        color: '#fff',
    },

    datetime: {
        color: '#c0c0c0',
        fontSize: 10,
    },
});