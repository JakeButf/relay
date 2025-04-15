import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SettingsNavigation from './SettingsNavigation';
import SettingsOptions from './SettingsOptions';
import IconButton from './IconButton';
import { userSettings, loadUserSettings, saveUserSettings } from '@/src/appState';

export default function SettingsView()
{
    const defaultCategoryIndex = 0;
    const[categoryIndex, setCategoryIndex] = useState(defaultCategoryIndex);
    const[appSettings, setAppSettings] = useState<userSettings>(new userSettings("", ""));

    //user settings
    useEffect(() => {
        async function loadSettings()
        {
            const settings = await loadUserSettings();
            setAppSettings(settings);
        }
        loadSettings();
    }, []);

    const handleSave = async () => {
        try {
            await saveUserSettings(appSettings);
        } catch (err) {
            console.error(err);
        }
    }
    
    const changeCategory = (index: number) => {
        setCategoryIndex(index);
    }

    return(
        <View style={styles.verticalContainer}>
            <View style={styles.horizontalContainer}>
                <View style={styles.leftContainer}>
                    <SettingsNavigation onPress={changeCategory}/>
                </View>
                <View style={styles.rightContainer}>
                    <SettingsOptions settings={appSettings} categoryIndex={categoryIndex} onSettingsChange={setAppSettings}/>
                </View>
            </View>
            <View>
                <IconButton onPress={handleSave} focusedIcon={'save-sharp'} unfocusedIcon={'save-outline'} iconColor='#fff' size={24} transparentBackground={true} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    horizontalContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    verticalContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%'
    },
    leftContainer: {
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        borderRightWidth: 1,
        borderColor: '#fff',
        padding: 10
    },
    rightContainer: {
        flex: 1,
        width: '80%'
    }
});

