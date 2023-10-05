import {StripeProvider, usePaymentSheet} from '@stripe/stripe-react-native';
import React, {useState, useEffect} from 'react';
import {Button, View, Alert, SafeAreaView} from 'react-native';

const StripePayment = () => {
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
      body: 'amount=1000&currency=usd&payment_method_types[]=card',
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
      Alert.alert('Error code:', error.message);
    } else {
      setPaymentSheetVisible(true);
      console.log('opened');
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StripeProvider
        publishableKey="pk_test_51NxQtdSDFRmJPXwkTzeCk7xoyLGkxqWoR3w9Lqwomduzn432W4vWuORYHNsGfmUCWMQZUqy2GMkl8F52mXt83mug00lebRXXdC"
        merchantIdentifier="merchant.identifier">
        <Button title="Open Payment Sheet" onPress={openPaymentSheet} />
      </StripeProvider>
    </SafeAreaView>
  );
};

export default StripePayment;
