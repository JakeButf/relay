// SettingsOptions.tsx
import { TextInput, View, StyleSheet, Text } from 'react-native';
import defaultTheme from '@/themes/defaultTheme';
import { userSettings } from '@/src/appState';

interface Props {
    categoryIndex: number;
    settings: userSettings;
    onSettingsChange: (settings: userSettings) => void;
}

export default function SettingsOptions({ categoryIndex, settings, onSettingsChange }: Props) {
    const renderCategoryContent = () => {
        if (categoryIndex === 0) {
            return (
                <View style={styles.container}>
                    <TextInput
                        style={defaultTheme.textInput}
                        placeholder='Nickname'
                        value={settings.nickName}
                        onChangeText={(value) => {
                            onSettingsChange({ ...settings, nickName: value });
                        }}
                    />
                    <TextInput
                        style={defaultTheme.textInput}
                        placeholder='IRC Network'
                        value={settings.network}
                        onChangeText={(value) => {
                            onSettingsChange({ ...settings, network: value });
                        }}
                    />
                </View>
            );
        }
        return null;
    };

    return renderCategoryContent();
}

const styles = StyleSheet.create({
    container: {
        marginLeft: '25%',
        marginRight: '25%'
    }
});
