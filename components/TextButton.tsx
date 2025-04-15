// @ts-nocheck
import { Pressable, Text, TextStyle } from "react-native";
import defaultTheme from "@/themes/defaultTheme";


interface Props {
    onPress: (text: number) => void;
    buttonText: string;
    style: TextStyle; 
}

export default function TextButton({onPress, buttonText, style}: Props)
{
    return(
        <Pressable onPress={onPress}>
            <Text style={style}>
                {buttonText}
            </Text>
        </Pressable>
    );
}