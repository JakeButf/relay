import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ChatBox from './ChatBox';
import MessageBox from './MessageBox';
import ChannelHeader from './ChannelHeader';

import { IRCClient } from '@/src/utils/ircClient';
import ChannelNavBar from './ChannelNavBar';
import ChannelBookmarkList from './ChannelBookmarkList';
import { loadBookmarks, addBookmark, saveBookmarks, containsBookmark } from '@/src/appState';

export default function MessageView()
{
    const defaultChannel = "#test";
    const [bookmarks, setBookmarks] = useState<string[]>([]);

    const [channel, setChannel] = useState(defaultChannel);
    const [messages, setMessages] = useState<string[]>([]);
    const ircRef = useRef<IRCClient>();

    //bookmark loading
    useEffect(() => {
        async function fetchBookmarks() {
          try {
            const loaded = await loadBookmarks();
            setBookmarks(loaded);
          } catch (error) {
            console.error('Error loading bookmarks:', error);
          }
        }
        fetchBookmarks();
      }, []);

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
        //error handling

        if(message == "WebSocket error") //TODO: check if this is the right way to approach
        {
            setMessages(m => [...m, "! ERROR ! : Couldn't establish websocket connection. Check internet connection and server status."]);
        } else 
        {
            setMessages(m => [...m, `! ERROR ! : ${message}`]);
        }
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
    //say it locally too
    setMessages(m => [...m, `me ⇒ ${channel}: ${text}`]);
};

const switchToBookMark = (channelName: string) => {
    changeChannel('#' + channelName);
}

const addNewBookmark = async(channelName: string) => {
    const contains = await containsBookmark(channelName);

    if(!contains)
    {
        if(channelName[0] === '#')
        {
            channelName = channelName.substring(1);
        }
        await addBookmark(channelName);
        const loadedBookmarks = await loadBookmarks();
        setBookmarks(loadedBookmarks);
        console.log(loadBookmarks);
    }
}

const changeChannel = (channelName: string) => {
    
    ircRef.current?.part(channel);
    setChannel(channelName);
    ircRef.current?.join(channelName);

    setMessages(m => [...m, `* Switched Channels To ${channelName} *`]);
};

    return(
        <View style={styles.horContainer}>
            <View style={styles.navContainer}>
                <ChannelNavBar onChangeChannel={changeChannel}/>
                <ChannelBookmarkList bookmarks={bookmarks} onPress={switchToBookMark}/>
            </View>
            <View style={styles.container}>
                <ChannelHeader onBookmark={addNewBookmark} channel={channel}/>
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