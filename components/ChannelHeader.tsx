import { View, Text, StyleSheet } from 'react-native';
import defaultTheme from '../themes/defaultTheme';
import HorizontalSeperator from './HorizontalSeperator';
import IconButton from './IconButton';

interface Props {
    channel: string;
    onBookmark: (text: string) => void;
}

export default function ChannelHeader({ channel, onBookmark }: Props)
{
    return(
        <View>
            <View style={styles.container}>
                <IconButton transparentBackground={true} onPress={() => onBookmark(channel)} focusedIcon={'bookmark-sharp'} unfocusedIcon={'bookmark-outline'} iconColor='#fff' size={24}/>
                <Text style={[defaultTheme.header1]}>{channel}</Text>
            </View>
            <HorizontalSeperator/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    }
});