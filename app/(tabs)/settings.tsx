import {Text, View, StyleSheet} from 'react-native';

export default function SettingsPage() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Settings</Text>
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