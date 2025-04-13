import React from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import defaultTheme from '@/themes/defaultTheme';

interface Props {
    onChangeChannel: (text: string) => void;
}

export default function TextInputPrompt({onChangeChannel}: Props)
{
    const [text, setText] = React.useState('');

    const handleChangeChannel = () => {
        onChangeChannel(text);
        setText('');
    };

    return(
        <View style={styles.container}>
            <TextInput onChangeText={setText} placeholderTextColor="#888" returnKeyType="send" onSubmitEditing={handleChangeChannel} value={text} placeholder="#ChannelName" style={[defaultTheme.textInput]}/>
            <Button title="Join" onPress={handleChangeChannel}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10
    }

});