import {View, StyleSheet} from 'react-native';
import {Link, Stack} from 'expo-router';

export default function NotFoundScreen() {
    return(
        <>
            <Stack.Screen options={{title: 'Error: 404 Page Not Found'}} />
            <View style={styles.container}>
                <Link style={styles.button} href="/index">Go Home</Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#25292e',
        justifyContent: 'center',
    },
    button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff'
  }
})