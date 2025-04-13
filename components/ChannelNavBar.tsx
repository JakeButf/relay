import { Button, TextInput, View } from "react-native";
import TextInputPrompt from "./TextInputPrompt";

interface Props {
    onChangeChannel: (text: string) => void;
}

export default function ChannelNavBar({ onChangeChannel }: Props)
{
    return(
        <View>
            <View>
                <TextInputPrompt onChangeChannel={onChangeChannel}/>
            </View>
        </View>
    );
}