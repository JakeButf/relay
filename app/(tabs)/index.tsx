//UI

import { Text, TextInput, View, StyleSheet } from "react-native";
import {Link} from 'expo-router'
import ChatBox from "@/components/ChatBox";
import MessageView from "@/components/MessageView";


export default function Index() {
  return (
    <View style={styles.container}>
      <MessageView/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff'
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff'
  },
});
