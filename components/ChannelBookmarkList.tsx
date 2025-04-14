import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';

import ChannelBookmark from './ChannelBookmark';
import { loadBookmarks } from '@/src/appState';

interface Props {
    bookmarks: string[];
    onPress: (text: string) => void;
}

export default function ChannelBookmarkList({bookmarks, onPress}: Props)
{
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {bookmarks.map((bookmark, index) => (
                <ChannelBookmark key={index} channelName={bookmark} onPress={onPress}/>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
});

