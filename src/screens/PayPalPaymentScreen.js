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
import CHeader from '../components/CHeader';
import CPayImage from '../components/CPayImage';

const PayPalPaymentScreen = ({navigation}) => {
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
      alert('Payment Successful!');
      clearPaypalState();
    } catch (error) {
      console.log('error raised in payment capture', error);
      alert('Payment Failed');
    }
  };

  const clearPaypalState = () => {
    setPaypalUrl(null);
    setAccessToken(null);
    alert('You cancelled the payment.');
  };

  return (
    <>
      <CHeader navigation={navigation} name={'PayPal Payment'} />
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
        <CButton title={'Proceed for Payment!'} onPress={onPressPaypal} />
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
    </>
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
