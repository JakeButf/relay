import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
  onPress: (iconName: string) => void;
  focusedIcon: keyof typeof Ionicons.glyphMap;
  unfocusedIcon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  size: number;
  transparentBackground?: boolean;
  bgColor?: string;
}

export default function IconButton({
  onPress,
  focusedIcon,
  unfocusedIcon,
  iconColor,
  size,
  transparentBackground = false,
  bgColor = '#49fecc'
}: Props) {
  // Local state to track hover/focus state
  const [isHovered, setIsHovered] = useState(false);
  
  // Choose the icon based on the hover/focus state
  const iconName = isHovered ? focusedIcon : unfocusedIcon;

  return (
    <Pressable
      style={({ pressed }) => [
        transparentBackground ? transparentStyle.container : styles.container,
        !transparentBackground && { backgroundColor: bgColor },
        pressed && { opacity: 0.6 }
      ]}
      onPress={() => onPress(iconName)}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <Ionicons name={iconName} color={iconColor} size={size} />
    </Pressable>
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
});
