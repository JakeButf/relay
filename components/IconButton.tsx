import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    onPress: (text: string) => void;
    focusedIcon: keyof typeof Ionicons.glyphMap;
    unfocusedIcon: keyof typeof Ionicons.glyphMap;
    iconColor: string;    
    size: number;
    isFocused?: boolean;
    transparentBackground?: boolean;
    bgColor?: string;
}

export default function IconButton({ onPress, focusedIcon, unfocusedIcon, iconColor, size, isFocused = false, transparentBackground = false, bgColor = '#49fecc' }: Props) {
    const iconName = isFocused ? focusedIcon : unfocusedIcon;

    return (
        <TouchableOpacity
            style={[transparentBackground? transparentStyle.container: styles.container]}
            onPress={() => onPress(iconName)}
        >
            <Ionicons name={iconName} color={iconColor} size={size} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 2,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const transparentStyle = StyleSheet.create({
    container: {
        padding: 2,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)'
    }
})
