import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CButton from '../components/CButton';
// import {requestOneTimePayment} from 'react-native-paypal';
import {PAYPAL_KEYS} from '../constants/keys';
const base64 = require('base-64');

const PayPalPaymentScreen = () => {
  // PayPal.initialize(PAYPAL_KEYS.CLIENT_ID);

  // const handlePayPalPayment = async () => {
  //   try {
  //     const paymentResponse = await PayPal.pay({
  //       // Amount to be paid
  //       amount: '10.00', // Replace with your desired amount
  //       currency: 'USD', // Replace with your desired currency code
  //       description: 'Payment for an item', // Description for the payment
  //     });

  //     // Handle the payment response
  //     if (paymentResponse.success) {
  //       console.log('Payment successful:', paymentResponse.confirmation);
  //       // Payment was successful, you can navigate to a success screen or perform other actions here.
  // } else {
  //       console.error('Payment failed:', paymentResponse.error);
  //       // Payment failed, you can display an error message or perform other error handling.
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     // Handle any unexpected errors that may occur during the payment process.
  //   }
  // };

  let orderDetail = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        items: [
          {
            name: 'T-Shirt',
            description: 'Green XL',
            quantity: '1',
            unit_amount: {
              currency_code: 'USD',
              value: '200.00',
            },
          },
        ],
        amount: {
          currency_code: 'USD',
          value: '200.00',
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: '200.00',
            },
          },
        },
      },
    ],
    application_context: {
      return_url: 'https://example.com/return',
      cancel_url: 'https://example.com/cancel',
    },
  };

  const generateToken = () => {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append(
      'Authorization',
      'Basic ' +
        base64.encode(`${PAYPAL_KEYS.CLIENT_ID}:${PAYPAL_KEYS.SECRET_KEY}`),
    );

    var requestOptions = {
      method: 'POST',
      headers: headers,
      body: 'grant_type=client_credentials',
    };

    return new Promise((resolve, reject) => {
      fetch(PAYPAL_KEYS.BASE_URL + '/v1/oauth2/token', requestOptions)
        .then(response => response.text())
        .then(result => {
          const {access_token} = JSON.parse(result);
          console.log('Access token(generateToken): ', access_token);
          resolve(access_token);
        })
        .catch(error => {
          console.log('Error(generateToken): ', error);
          reject(error);
        });
    });
  };

  const createOrder = (token = '') => {
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderDetail),
    };

    return new Promise((resolve, reject) => {
      fetch(PAYPAL_KEYS.BASE_URL + '/v2/checkout/orders', requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log('Result(createOrder): ', result);
          const res = JSON.parse(result);
          resolve(res);
        })
        .catch(error => {
          console.log('Error(createOrder): ', error);
          reject(error);
        });
    });
  };

  const capturePayment = (id, token = '') => {
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return new Promise((resolve, reject) => {
      fetch(
        PAYPAL_KEYS.BASE_URL + `/v2/checkout/orders/${id}/capture`,
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log('Result(capturePayment): ', result);
          const res = JSON.parse(result);
          resolve(res);
        })
        .catch(error => {
          console.log('Error(capturePayment): ', error);
          reject(error);
        });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnContainer}>
        <CButton title={'PayPal'} extraStyles={{}} onPress={createOrder} />
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
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
