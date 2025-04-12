import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ChatBox from './ChatBox';
import MessageBox from './MessageBox';
import ChannelHeader from './ChannelHeader';

import { IRCClient } from '@/src/utils/ircClient';

export default function MessageView()
{
    const defaultChannel = "test";
    const [messages, setMessages] = useState<string[]>([]);
    const ircRef = useRef<IRCClient>();

    useEffect(() => {
    const irc = new IRCClient();
    ircRef.current = irc;

    irc.on('registered', () => {
      setMessages(m => [...m, '* Connected to IRC server *']);
      irc.join(defaultChannel);
    });

    irc.on('message', ({ from, to, text }) => {
      setMessages(m => [...m, `${from} ⇒ ${to}: ${text}`]);
    });

    irc.on('error', ({ message }) => {
      setMessages(m => [...m, `! ERROR: ${message}`]);
    });

    irc.connect('ws://localhost:8080', {
      host: 'irc.libera.chat',
      port: 6697,
      nick: 'testname213232',
      tls:  true,
    });
}, []);

const sendMessage = (text: string) => {
    if (!text.trim()) return;
    ircRef.current?.say('#test', text);
    //also locally echo it
    setMessages(m => [...m, `me ⇒ #test: ${text}`]);
};

    return(
        <View style={styles.container}>
            <ChannelHeader channel={defaultChannel}/>
            <MessageBox messages={messages}/>
            <ChatBox onSend={sendMessage}/>
         </View>    
    );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        flex: 1,
    },
});