import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ChatBox from './ChatBox';
import MessageBox from './MessageBox';
import ChannelHeader from './ChannelHeader';

import { IRCClient } from '@/src/utils/ircClient';
import ChannelNavBar from './ChannelNavBar';

export default function MessageView()
{
    const defaultChannel = "#test";

    const [channel, setChannel] = useState(defaultChannel);
    const [messages, setMessages] = useState<string[]>([]);
    const ircRef = useRef<IRCClient>();

    useEffect(() => {
    const irc = new IRCClient();
    ircRef.current = irc;

    irc.on('registered', () => {
      setMessages(m => [...m, '* Connected to IRC server *']);
      irc.join(channel);
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
    ircRef.current?.say(channel, text);
    //also locally echo it
    setMessages(m => [...m, `me ⇒ ${channel}: ${text}`]);
};

const changeChannel = (channelName: string) => {
    setChannel(channelName);
    ircRef.current?.join(channelName);

    setMessages(m => [...m, `* Switched Channels To ${channel} *`]);
};

    return(
        <View style={styles.horContainer}>
            <View style={styles.navContainer}>
                <ChannelNavBar onChangeChannel={changeChannel}/>
            </View>
            <View style={styles.container}>
                <ChannelHeader channel={channel}/>
                <MessageBox messages={messages}/>
                <ChatBox onSend={sendMessage}/>
            </View>
         </View>    
    );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        flex: 1,
    },
    horContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%'
    },
    navContainer: {
        flexDirection: 'column',
        borderColor: '#fff',
        borderRightWidth: 1
    }
});