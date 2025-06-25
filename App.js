// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from './DashboardScreen';
import WithdrawScreen from './WithdrawScreen';
import ReferralScreen from './ReferralScreen';
import MissionsScreen from './MissionsScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  const [userAddress, setUserAddress] = useState('0xYourUserAddress');
  const [privateKey] = useState('0xYourPrivateKey');

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard">
          {(props) => <DashboardScreen {...props} userAddress={userAddress} privateKey={privateKey} />}
        </Stack.Screen>

        <Stack.Screen name="Withdraw" component={WithdrawScreen} initialParams={{ userAddress, privateKey }} />
        <Stack.Screen name="Referral" component={ReferralScreen} initialParams={{ userId: userAddress }} />
        <Stack.Screen name="Missions" component={MissionsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} initialParams={{ userAddress }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
