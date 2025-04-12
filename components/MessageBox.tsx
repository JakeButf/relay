// components/MessageBox.tsx
import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import MessageContent from './MessageContent';

interface Props {
  messages: string[];
}

export default function MessageBox({ messages }: Props) {
  return (
    <View style={styles.container}>
      <FlatList<string>
        data={messages}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => {
          const [left, ...rest] = item.split(': ');
          const [usernamePart, toPart] = left.split(' ⇒ ');
          return (
            <MessageContent
              username={usernamePart}
              message={rest.join(': ')}
              datetime={new Date().toLocaleTimeString()}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
