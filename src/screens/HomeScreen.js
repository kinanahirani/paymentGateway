import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CButton from '../components/CButton';
import {useNavigation} from '@react-navigation/native';
import {verticalScale} from '../helpers/sizeHelpers';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentPress = (paymentMethod, paymentScreen) => {
    setSelectedPaymentMethod(paymentMethod);
    navigation.navigate(paymentScreen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CButton
        title={'Pay using Stripe'}
        onPress={() => handlePaymentPress('stripe', 'StripePaymentScreen')}
        extraStyles={{marginBottom: verticalScale(25)}}
      />
      <CButton
        title={'Pay using Razorpay'}
        onPress={() => handlePaymentPress('razorpay', 'RazorpayPaymentScreen')}
        extraStyles={{marginBottom: verticalScale(25)}}
      />
      <CButton
        title={'Pay using PayPal'}
        onPress={() => handlePaymentPress('paypal', 'PayPalPaymentScreen')}
      />
      {/* {selectedPaymentMethod === 'stripe' && <StripePaymentScreen />}
      {selectedPaymentMethod === 'razorpay' && <RazorpayPaymentScreen />}
      {selectedPaymentMethod === 'paypal' && <PayPalPaymentScreen />} */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
