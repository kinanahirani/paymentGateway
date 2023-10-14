import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CButton from '../components/CButton';
import {useNavigation} from '@react-navigation/native';
import {verticalScale} from '../helpers/sizeHelpers';
import CImage from '../components/CImage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentPress = (paymentMethod, paymentScreen) => {
    setSelectedPaymentMethod(paymentMethod);
    navigation.navigate(paymentScreen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CImage
        path={require('../assets/images/stripe.png')}
        onPress={() => handlePaymentPress('stripe', 'StripePaymentScreen')}
        extraStyles={{marginVertical:verticalScale(10)}}
      />
      <CImage
        path={require('../assets/images/Razorpay.png')}
        onPress={() => handlePaymentPress('razorpay', 'RazorpayPaymentScreen')}
        extraStyles={{marginTop:verticalScale(10), marginBottom:verticalScale(20)}}
      />
      <CImage
        path={require('../assets/images/PayPal.png')}
        onPress={() => handlePaymentPress('paypal', 'PayPalPaymentScreen')}
      />
      {/* <CButton
        title={'Pay using Paytm'}
        onPress={() => handlePaymentPress('paytm', 'PaytmPaymentScreen')}
      /> */}
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
