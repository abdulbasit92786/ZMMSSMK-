// ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';

export default function ProfileScreen({ route, navigation }) {
  const { userAddress } = route.params;
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');

  const logout = () => navigation.popToTop();

  const saveProfile = () => Alert.alert('Profile Saved');

  return (
    <View style={styles.container}>
      <Text>Wallet Address: {userAddress}</Text>

      <Text style={styles.label}>Email:</Text>
      <TextInput style={styles.input} placeholder="Your email" value={email} onChangeText={setEmail} />

      <Text style={styles.label}>PIN:</Text>
      <TextInput style={styles.input} placeholder="Set PIN" secureTextEntry value={pin} onChangeText={setPin} />

      <Button title="Save" onPress={saveProfile} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginTop: 10 },
  input: { borderWidth: 1, marginTop: 5, padding: 8, borderRadius: 5 },
});
