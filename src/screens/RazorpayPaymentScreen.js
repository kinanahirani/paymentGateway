import {SafeAreaView, StyleSheet, View, Alert} from 'react-native';
import React from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import CButton from '../components/CButton';
import CHeader from '../components/CHeader';
import CPayImage from '../components/CPayImage';
import {moderateScale} from '../helpers/sizeHelpers';

const RazorpayPaymentScreen = ({navigation}) => {
  return (
    <>
      <CHeader navigation={navigation} name={'Razorpay Payment'} />
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
        <CButton
          title={'Proceed for Payment!'}
          extraStyles={{}}
          onPress={() => {
            var options = {
              description: 'Credits towards consultation',
              image: 'https://i.imgur.com/3g7nmJC.png',
              currency: 'INR',
              key: 'rzp_test_awIiVoqUujKCp3',
              amount: '5000',
              name: 'Hirani Traders',
              prefill: {
                email: 'void@razorpay.com',
                contact: '9191919191',
                name: 'Razorpay Software',
              },
              theme: {color: '#F37254'},
            };
            RazorpayCheckout.open(options)
              .then(data => {
                // alert(`Success: ${data.razorpay_payment_id}`);
                Alert.alert('Payment Successful!');
              })
              .catch(error => {
                console.log(error);
                // alert(`Error: ${error.code} | ${error.description}`);
                Alert.alert('Payment failed');
              });
          }}
        />
      </View>
    </>

    // <SafeAreaView style={styles.container}>
    //   <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>

    //   </View>
    // </SafeAreaView>
  );
};

export default RazorpayPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
