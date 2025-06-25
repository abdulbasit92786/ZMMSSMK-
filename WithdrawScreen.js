// WithdrawScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import Web3 from 'web3';

// Binance Smart Chain Mainnet
const BSC_RPC_URL = 'https://bsc-dataseed.binance.org/';
const web3 = new Web3(new Web3.providers.HttpProvider(BSC_RPC_URL));

// ZMM Token Contract Address
const ZMM_ADDRESS = '0xB3Fa4cD2589Bf86D7A826A6584504aD2b7f2C081';
// Minimal ABI for transfer & balanceOf
const ZMM_ABI = [
  {
    constant: true,
    name: 'balanceOf',
    type: 'function',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
  },
  {
    constant: false,
    name: 'transfer',
    type: 'function',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
];

export default function WithdrawScreen({ userAddress, privateKey }) {
  const [toAddress, setToAddress] = useState('');
  const [amountZMM, setAmountZMM] = useState('');

  const sendTokens = async () => {
    try {
      const contract = new web3.eth.Contract(ZMM_ABI, ZMM_ADDRESS);
      const decimals = web3.utils.toBN(10).pow(web3.utils.toBN(18));
      const value = web3.utils.toBN(amountZMM).mul(decimals);

      const txCount = await web3.eth.getTransactionCount(userAddress);
      const data = contract.methods.transfer(toAddress, value).encodeABI();

      const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: ZMM_ADDRESS,
        data,
        gasLimit: web3.utils.toHex(200000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('5', 'gwei')),
      };

      const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      Alert.alert('Success', `Transaction Hash: ${receipt.transactionHash}`);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your Address:</Text>
      <Text style={styles.value}>{userAddress}</Text>

      <Text style={styles.label}>Recipient Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="0x..."
        value={toAddress}
        onChangeText={setToAddress}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Amount ZMM:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 10"
        keyboardType="numeric"
        value={amountZMM}
        onChangeText={setAmountZMM}
      />

      <Button title="Withdraw ZMM" onPress={sendTokens} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginTop: 10, fontWeight: 'bold' },
  input: { borderWidth: 1, marginTop: 5, padding: 8, borderRadius: 5 },
  value: { color: 'blue' },
});
