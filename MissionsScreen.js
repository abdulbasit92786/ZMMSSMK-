// MissionsScreen.js
import React, { useState } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';

const tasks = [
  { id: '1', name: 'Daily Check-in', reward: 10 },
  { id: '2', name: 'Watch Video', reward: 5 },
  { id: '3', name: 'Visit Website', reward: 8 },
];

export default function MissionsScreen() {
  const [claims, setClaims] = useState({});

  const claim = (task) => {
    if (claims[task.id]) {
      Alert.alert('Already claimed');
    } else {
      setClaims({ ...claims, [task.id]: true });
      Alert.alert('You earned ' + task.reward + ' ZMM');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.name} (+{item.reward})</Text>
            <Button title={claims[item.id] ? 'Claimed' : 'Claim'} onPress={() => claim(item)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
});
