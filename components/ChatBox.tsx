import React from 'react';
import {StyleSheet, TextInput, View, Button, KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import IconButton from './IconButton';

interface Props {
    onSend: (text: string) => void;
}

export default function ChatBox({ onSend }: Props)
{
    const [text, setText] = React.useState('');

    const handleSend = () => {
        onSend(text);
        setText('');
    };

    return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.wrapper}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          placeholderTextColor="#888"
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <IconButton transparentBackground={true} onPress={handleSend} focusedIcon={'arrow-forward-circle-sharp'} unfocusedIcon={'arrow-forward-circle-outline'} iconColor='#fff' size={32}/>
      </View>
    </KeyboardAvoidingView>
  );
}

//i cannot for the life of me get this centered. please god
const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingVertical: 8,
        backgroundColor: '#25292e',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
    },
    input: {
        width: '90%',
        alignSelf: 'center',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: '#fff',
        borderColor: '#fff',
    }
});