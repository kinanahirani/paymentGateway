import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import CButton from '../components/CButton';
import AllInOneSDKManager from 'paytm_allinone_react-native';

const PaytmPaymentScreen = () => {
  const handlePayment = async () => {
    const orderId = 'YOUR_ORDER_ID';
    const mid = 'YOUR_MERCHANT_ID';
    const amount = '100.00'; // Replace with your actual amount
    const callbackUrl = 'YOUR_CALLBACK_URL';
    const isStaging = true; // Set to true for testing, false for production
    const appInvokeRestricted = false; // Set to true if you want to restrict the Paytm app invocation

    try {
      const result = await AllInOneSDKManager.startTransaction(
        orderId,
        mid,
        amount,
        callbackUrl,
        isStaging,
        appInvokeRestricted,
      );
      console.log('Payment Result:', result);
      // Handle the payment result and update the UI as needed
    } catch (error) {
      console.error('Payment Error:', error);
      // Handle payment errors
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CButton title="Paytm" onPress={handlePayment} />
    </SafeAreaView>
  );
};

export default PaytmPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
