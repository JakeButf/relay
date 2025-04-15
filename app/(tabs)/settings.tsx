import {Text, View, StyleSheet} from 'react-native';
import SettingsView from '@/components/SettingsView';

export default function SettingsPage() {
    return (
        <View style={styles.container}>
            <SettingsView/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#25292e',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
    },
});