import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CButton from '../components/CButton';
import WebView from 'react-native-webview';
import queryString from 'query-string';
import {
  capturePayment,
  createOrder,
  generateToken,
} from '../helpers/paypalApis';
import {moderateScale} from '../helpers/sizeHelpers';

const PayPalPaymentScreen = () => {
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const onPressPaypal = async () => {
    try {
      const token = await generateToken();
      const res = await createOrder(token);
      setAccessToken(token);
      console.log('res++++++', res);
      if (!!res?.links) {
        const findUrl = res.links.find(data => data?.rel == 'approve');
        setPaypalUrl(findUrl.href);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const onUrlChange = webviewState => {
    console.log('webviewStatewebviewState', webviewState);
    if (webviewState.url.includes('https://example.com/cancel')) {
      clearPaypalState();
      return;
    }
    if (webviewState.url.includes('https://example.com/return')) {
      const urlValues = queryString.parseUrl(webviewState.url);
      console.log('my urls value', urlValues);
      const {token} = urlValues.query;
      if (!!token) {
        paymentSuccess(token);
      }
    }
  };

  const paymentSuccess = async id => {
    try {
      const res = capturePayment(id, accessToken);
      console.log('capturePayment res++++', res);
      alert('Payment sucessfull...!!!');
      clearPaypalState();
    } catch (error) {
      console.log('error raised in payment capture', error);
    }
  };

  const clearPaypalState = () => {
    setPaypalUrl(null);
    setAccessToken(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnContainer}>
        <CButton title={'PayPal'} onPress={onPressPaypal} />
        <Modal visible={!!paypalUrl}>
          <TouchableOpacity
            onPress={clearPaypalState}
            style={{margin: moderateScale(24)}}>
            <Text>Close</Text>
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <WebView
              source={{uri: paypalUrl}}
              onNavigationStateChange={onUrlChange}
            />
          </View>
        </Modal>
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

// import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {PAYPAL_KEYS} from '../constants/keys';
// import WebView from 'react-native-webview';
// import queryString from 'query-string';
// import { useNavigation } from '@react-navigation/native';

// const PayPalPaymentScreen = () => {
// const [accessToken, setAccessToken] = useState(null);
// const [approvalUrl, setApprovalUrl] = useState(null);
// const [paymentId, setPaymentId] = useState(null);
//   const navigation=useNavigation()
//   let _onNavigationStateChange;

//   useEffect(() => {
//     console.log("use effect started");
//     const dataDetail = {
//       intent: 'sale',
//       payer: {
//         payment_method: 'paypal',
//       },
//       transactions: [
//         {
//           amount: {
//             total: '0.01',
//             currency: 'USD',
//             details: {
//               subtotal: '0.01',
//               tax: '0',
//               shipping: '0',
//               handling_fee: '0',
//               shipping_discount: '0',
//               insurance: '0',
//             },
//           },
//         },
//       ],
//       redirect_urls: {
//         return_url: 'https://example.com',
//         cancel_url: 'https://example.com',
//       },
//     };
//     console.log(dataDetail);

//     fetch(PAYPAL_KEYS.BASE_URL + '/v2/checkout/orders', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `Bearer A21AALV8_EfqxzQzGJ-NF6l8yJbdcPo9gbuC7YcTd06fws65D5A-yvRZ9IDeBLGNpzIv9RpEZyMAJuoLYckzsHCKSupCUbxsA`,
//       },
//       body: 'grant_type=client_credentials',
//     })
//       .then(res => {
//       console.log("in fetch");
//       return res.json()
//       })
//       .then(response => {
//         console.log('response====', response);
//         setAccessToken(response.access_token);
//         console.log("acce=");

//         fetch('https://api.sandbox.paypal.com/v1/payments/payment', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${response.access_token}`,
//           },
//           body: JSON.stringify(dataDetail),
//         })
//           .then(paymentResponse => paymentResponse.json())
//           .then(paymentData => {
//             console.log('Payment response:', paymentData);
//             const {id, links} = response;
//             const approvalUrl = links.find(data => data.rel == 'approval_url');
//             console.log(approvalUrl, '..approvalUrl');
//             setApprovalUrl(approvalUrl.href);
//             setPaymentId(id);
//           })
//           .catch(error => {
//             console.error('Error in payment request:', error);
//           });
//       })
//       .catch(error => {
//         console.error('Error in access token request:', error);
//       });

//       _onNavigationStateChange = webViewState => {
//         console.log('webViewState', webViewState);

//         if (webViewState.url.includes('https://example.com/')) {
//           setApprovalUrl(null);

//           const {payerID, paymentId} = queryString.parse(webViewState.url);

//           fetch(
//             `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
//             {
//               method: 'POST',
//               body: JSON.stringify({payer_id: payerID}),
//               headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             },
//           )
//             .then(response => response.json())
//             .then(response => {
//               console.log('Payment execution response:', response);
//               if (response.name == 'INVALID_RESOURCE_ID') {
//                 Alert.alert('Payment failed.');
//                 setApprovalUrl(null);
//               }
//               navigation.goBack()
//             })
//             .catch(error => {
//               console.error('Error in payment execution:', error);
//             });
//         }
//       };

//   }, []);

//   return (
//     <View style={{flex: 1}}>
//       {approvalUrl ? (
//         <WebView
//           style={{height: '100%', width: '100%', marginTop: 40}}
//           source={{uri: approvalUrl}}
//           onNavigationStateChange={_onNavigationStateChange}
//           javaScriptEnabled={true}
//           domStorageEnabled={true}
//           startInLoadingState={false}
//         />
//       ) : (
//         <View style={{flex: 1, justifyContent: 'center'}}>
//           <Text
//             style={{
//               color: 'black',
//               fontSize: 24,
//               alignSelf: 'center',
//             }}>
//             {' '}
//             Do not press back or refresh page
//           </Text>
//           <ActivityIndicator
//             color={'black'}
//             size={'large'}
//             style={{alignSelf: 'center', marginTop: 20}}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// export default PayPalPaymentScreen;

// const styles = StyleSheet.create({});
