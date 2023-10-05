// import {
//   Alert,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {
//   initStripe,
//   PaymentSheet,
//   StripeProvider,
//   usePaymentSheet,
// } from '@stripe/stripe-react-native';
// import PaymentScreen from './src/screens/PaymentScreen';

// const App = () => {
//   const [isPaymentSheetOpen, setIsPaymentSheetOpen] = useState(false);
//   const [paymentIntentClientSecret, setPaymentIntentClientSecret] =
//     useState('');
//   const {initPaymentSheet, presentPaymentSheet, loading} = usePaymentSheet();

//   useEffect(() => {
//     initStripe({
//       publishableKey:
//         'pk_test_51NxQtdSDFRmJPXwkTzeCk7xoyLGkxqWoR3w9Lqwomduzn432W4vWuORYHNsGfmUCWMQZUqy2GMkl8F52mXt83mug00lebRXXdC',
//       merchantIdentifier: 'merchant.identifier',
//       urlScheme: 'com.tridhyatech.stripe.payment',
//     });
//     initPaymentSheet({
//       paymentIntentClientSecret,
//     });
//   }, []);

//   const createPaymentIntent = async () => {
//     const response = await fetch('https://api.stripe.com/v1/payment_intents', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization:
//           'Bearer sk_test_51NxQtdSDFRmJPXwkbMxojo28f9M1dwLvrZV3X8XYsaCFaC4p11cPqjiyDi9yyn1yc5F7bEAfDKWyRf7bN49ptpXS00V3690662',
//       },
//       body: 'amount=1000&currency=usd&payment_method_types[]=card',
//     });

//     const data = await response.json();
//     console.log(data);
//     setPaymentIntentClientSecret(data.client_secret);
//   };

//   const handleOpenPaymentSheet = async () => {
//     const {error} = await presentPaymentSheet();
//     if (error) {
//       Alert.alert(error.message);
//     } else {
//       Alert.alert('success', 'payment confirmed');
//     }
//     if (!paymentIntentClientSecret) {
//       createPaymentIntent();
//     }
//     setIsPaymentSheetOpen(true);
//   };

//   return (
//     <SafeAreaView
//       style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
//       <StripeProvider
//         publishableKey="pk_test_51NxQtdSDFRmJPXwkTzeCk7xoyLGkxqWoR3w9Lqwomduzn432W4vWuORYHNsGfmUCWMQZUqy2GMkl8F52mXt83mug00lebRXXdC"
//         merchantIdentifier="merchant.identifier" // required for Apple Pay
//         urlScheme="com.tridhyatech.stripe.payment" // required for 3D Secure and bank redirects
//       >
//         <TouchableOpacity onPress={handleOpenPaymentSheet}>
//           <Text>Pay using Stripe</Text>
//         </TouchableOpacity>
//         {isPaymentSheetOpen && (
//           <PaymentSheet
//             paymentIntentClientSecret={paymentIntentClientSecret}
//             onPaymentSheetResult={paymentResult => {
//               setIsPaymentSheetOpen(false); // Close the Payment Sheet
//               // Handle payment result (success or error) here
//               console.log('Payment result:', paymentResult);
//             }}
//             onClose={() => {
//               setIsPaymentSheetOpen(false);
//               console.log('Payment Sheet closed');
//             }}
//           />
//         )}
//       </StripeProvider>
//     </SafeAreaView>
//   );
// };

// export default App;

// const styles = StyleSheet.create({});

// 2nd
// import {StripeProvider, usePaymentSheet} from '@stripe/stripe-react-native';
// import React, {useEffect, useState} from 'react';
// import {Button, Image, Text, View, Alert, StyleSheet} from 'react-native';

// const App = () => {
//   const [ready, setReady] = useState(false);
//   const {initPaymentSheet, presentPaymentSheet, loading} = usePaymentSheet();
//   const [paymentIntentClientSecret, setPaymentIntentClientSecret] =
//     useState('');

//   // useEffect(() => {
//   //   initialisePaymentSheet();
//   // }, []);

//   const initialisePaymentSheet = async () => {
//     // const {paymentIntent, ephemeralKey, customer} =
//     // const clientKey =
//     await fetchPaymentSheetParams();
//     const {error} = await initPaymentSheet({
//       // customerId: 1,
//       customerEphemeralKeySecret:
//         'sk_test_51NxQtdSDFRmJPXwkbMxojo28f9M1dwLvrZV3X8XYsaCFaC4p11cPqjiyDi9yyn1yc5F7bEAfDKWyRf7bN49ptpXS00V3690662',
//       paymentIntentClientSecret: paymentIntentClientSecret,
//       merchantDisplayName: 'Tridhya Inc.',
//       allowsDelayedPaymentMethods: true,
//       returnURL: 'paymentGatway://stripe-redirect',
//       // applePay: {
//       // merchant CountryCode: 'US',
//       // },
//       // googlePay: {
//       // merchant CountryCode: 'US',
//       // testEnv: true,
//       // currencyCode: 'usd',
//       // },
//     });
//     if (error) {
//       Alert.alert('Error code:', error.message);
//     } else {
//       setReady(true);
//       console.log('Payment sheet presented successfully');
//     }
//   };

//   const fetchPaymentSheetParams = async () => {
//     const response = await fetch('https://api.stripe.com/v1/payment_intents', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization:
//           'Bearer sk_test_51NxQtdSDFRmJPXwkbMxojo28f9M1dwLvrZV3X8XYsaCFaC4p11cPqjiyDi9yyn1yc5F7bEAfDKWyRf7bN49ptpXS00V3690662',
//       },
//       body: 'amount=1000&currency=usd&payment_method_types[]=card',
//     });
//     // const {paymentIntent, ephemeralKey, customer} = await response.json;
//     // return {
//     //   paymentIntent,
//     //   ephemeralKey,
//     //   customer,
//     // };
//     const data = await response.json();
//     console.log(data);
//     setPaymentIntentClientSecret(data.client_secret);
//     return data.client_secret;
//   };

//   const buy = async () => {
//     // if (ready) {
//       await initialisePaymentSheet();
//       // initPaymentSheet
//       const {error} = await presentPaymentSheet();
//       if (error) {
//         Alert.alert('Error code:', error.message);
//       } else {
//         console.log("in else");
//         Alert.alert('Success', 'The payment was confirmed successfully');
//         setReady(false);
//       }
//     // } else {
//     //   Alert.alert('Payment sheet is not ready.');
//     // }
//   };
//   return (
//     <View style={{flex: 1}}>
//       <StripeProvider
//         publishableKey="pk_test_51NxQtdSDFRmJPXwkTzeCk7xoyLGkxqWoR3w9Lqwomduzn432W4vWuORYHNsGfmUCWMQZUqy2GMkl8F52mXt83mug00lebRXXdC"
//         merchantIdentifier="merchant.identifier">
//         <Text>1 kg of Sweet Potatoes</Text>
//         <Button title="Buy" onPress={buy}
//         // disabled={loading || !ready}
//         />
//       </StripeProvider>
//     </View>
//   );
// };

// export default App;

//3rd

import {StripeProvider, usePaymentSheet} from '@stripe/stripe-react-native';
import React, {useState, useEffect} from 'react';
import {Button, View, Alert} from 'react-native';

const App = () => {
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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StripeProvider
        publishableKey="pk_test_51NxQtdSDFRmJPXwkTzeCk7xoyLGkxqWoR3w9Lqwomduzn432W4vWuORYHNsGfmUCWMQZUqy2GMkl8F52mXt83mug00lebRXXdC"
        merchantIdentifier="merchant.identifier">
        <Button title="Open Payment Sheet" onPress={openPaymentSheet} />
      </StripeProvider>
    </View>
  );
};

export default App;
