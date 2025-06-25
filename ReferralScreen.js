// ReferralScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Clipboard, StyleSheet, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export default function ReferralScreen({ route }) {
  const { userId } = route.params;
  const [referrals, setReferrals] = useState(0);
  const inviteLink = `https://yourapp.com/signup?ref=${userId}`;

  useEffect(() => {
    setReferrals(Math.floor(Math.random() * 100));
  }, []);

  const copyLink = () => {
    Clipboard.setString(inviteLink);
    Alert.alert('Copied to clipboard');
  };

  const shareLink = () => {
    WebBrowser.openBrowserAsync(inviteLink);
  };

  return (
    <View style={styles.container}>
      <Text>Your invite link:</Text>
      <Text style={styles.link}>{inviteLink}</Text>

      <Button title="Copy" onPress={copyLink} />
      <Button title="Open in Browser" onPress={shareLink} />

      <Text style={styles.stats}>Total referrals: {referrals}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  link: { color: 'blue', marginVertical: 10 },
  stats: { marginTop: 20, fontWeight: 'bold' },
});
