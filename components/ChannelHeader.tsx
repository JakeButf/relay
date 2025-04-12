import { View, Text, StyleSheet } from 'react-native';
import defaultTheme from '../themes/defaultTheme';
import HorizontalSeperator from './HorizontalSeperator';

interface Props {
    channel: string;
}

export default function ChannelHeader({ channel }: Props)
{
    return(
        <View style={styles.container}>
            <Text style={[defaultTheme.header1]}>#{channel}</Text>
            <HorizontalSeperator/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});