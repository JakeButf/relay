import {Pressable, View, StyleSheet, Text} from 'react-native';
import defaultTheme from '@/themes/defaultTheme';

interface Props {
    channelName: string;
    onPress: (text: string) => void;
}

export default function ChannelBookmark({channelName, onPress}: Props)
{
    return(
        <Pressable style={styles.container} onPress={() => onPress(channelName)}>
            <Text style={defaultTheme.channelBookmarkIcon}>#</Text>
            <Text style={defaultTheme.channelBookmarkNameText}>{channelName}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
});