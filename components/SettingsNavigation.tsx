import {View, StyleSheet, ScrollView} from 'react-native';
import TextButton from './TextButton';
import defaultTheme from '@/themes/defaultTheme';

interface Props {
    onPress: (text: number) => void;
}

export default function SettingsNavigation({onPress}: Props)
{
    return(
        <View>
            <ScrollView>
                <TextButton style={defaultTheme.settingsNavigationText} buttonText={"User Settings"} onPress={() => onPress(0)}/>
            </ScrollView>
        </View>
    );
}