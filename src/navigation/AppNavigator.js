import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import StripePaymentScreen from '../screens/StripePaymentScreen';
import RazorpayPaymentScreen from '../screens/RazorpayPaymentScreen';
import PayPalPaymentScreen from '../screens/PayPalPaymentScreen';
import PaytmPaymentScreen from '../screens/PaytmPaymentScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="StripePaymentScreen"
        component={StripePaymentScreen}
      />
      <Stack.Screen
        name="RazorpayPaymentScreen"
        component={RazorpayPaymentScreen}
      />
      <Stack.Screen
        name="PayPalPaymentScreen"
        component={PayPalPaymentScreen}
      />
      <Stack.Screen name="PaytmPaymentScreen" component={PaytmPaymentScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
