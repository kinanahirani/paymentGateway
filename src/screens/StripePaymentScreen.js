import {StripeProvider, usePaymentSheet} from '@stripe/stripe-react-native';
import React from 'react';
import {View, Alert, SafeAreaView} from 'react-native';
import CButton from '../components/CButton';
import CPayImage from '../components/CPayImage';
import {moderateScale} from '../helpers/sizeHelpers';
import CHeader from '../components/CHeader';

const StripePaymentScreen = ({navigation}) => {
  const {initPaymentSheet, presentPaymentSheet} = usePaymentSheet();

  const initializePaymentSheet = async () => {
    const {id, client_secret} = await fetchPaymentSheetParams();
    console.log(id, client_secret);
    const {error} = await initPaymentSheet({
      paymentIntentClientSecret: client_secret,
      merchantDisplayName: 'Tridhya Inc.',
      allowsDelayedPaymentMethods: true,
      returnURL: 'com.tridhyatech.stripe.payment://stripe-redirect',
    });

    if (error) {
      Alert.alert('Error code:', error.message);
    }
  };

  const fetchPaymentSheetParams = async () => {
    const response = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Bearer sk_test_51NxQtdSDFRmJPXwkbMxojo28f9M1dwLvrZV3X8XYsaCFaC4p11cPqjiyDi9yyn1yc5F7bEAfDKWyRf7bN49ptpXS00V3690662',
      },
      body: 'amount=1000&currency=inr&payment_method_types[]=card',
    });

    const data = await response.json();
    const id = data.id;
    const client_secret = data.client_secret;
    return {
      id,
      client_secret,
    };
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const {error} = await presentPaymentSheet();
    console.log('back in open payment');
    if (error) {
      // Alert.alert('Error code:', error.message);
      Alert.alert('Payment has been cancelled');
    } else {
      console.log('opened');
      Alert.alert('Payment Successful!');
    }
  };

  return (
    <>
      <CHeader navigation={navigation} name={'Stripe Payment'} />
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <CPayImage />
      </SafeAreaView>
      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          paddingBottom: moderateScale(10),
        }}>
        <StripeProvider
          publishableKey="pk_test_51NxQtdSDFRmJPXwkTzeCk7xoyLGkxqWoR3w9Lqwomduzn432W4vWuORYHNsGfmUCWMQZUqy2GMkl8F52mXt83mug00lebRXXdC"
          merchantIdentifier="merchant.identifier">
          <CButton title="Proceed for Payment!" onPress={openPaymentSheet} />
        </StripeProvider>
      </View>
    </>
  );
};

export default StripePaymentScreen;
