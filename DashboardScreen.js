// DashboardScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
export default function DashboardScreen({ navigation, route }) {
  const { userAddress } = route.params;
  const [balance, setBalance] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [refCount, setRefCount] = useState(0);

  useEffect(() => {
    setBalance(123.45);
    setEarnings(456.78);
    setRefCount(12);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Address: {userAddress}</Text>
      <Text style={styles.item}>Balance: {balance} ZMM</Text>
      <Text style={styles.item}>Total Earned: {earnings} ZMM</Text>
      <Text style={styles.item}>Referral Count: {refCount}</Text>

      <Button title="Withdraw" onPress={() => navigation.navigate('Withdraw', { userAddress: userAddress, privateKey: route.params.privateKey })} />
      <Button title="Referral" onPress={() => navigation.navigate('Referral', { userId: userAddress })} />
      <Button title="Tasks" onPress={() => navigation.navigate('Missions')} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile', route.params)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  item: { marginVertical: 10, fontWeight: 'bold' },
});
