import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CButton from '../components/CButton';

const PayPalPaymentScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <CButton title={'PayPal'} extraStyles={{}} />
      </View>
    </SafeAreaView>
  );
};

export default PayPalPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
