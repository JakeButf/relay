import { View, Text, StyleSheet } from 'react-native';
import defaultTheme from '../themes/defaultTheme';
import HorizontalSeperator from './HorizontalSeperator';
import IconButton from './IconButton';

interface Props {
    channel: string;
}

export default function ChannelHeader({ channel }: Props)
{
    const handleSend = () => {
        console.log("t");
    };
    return(
        <View>
            <View style={styles.container}>
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