import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import CButton from '../components/CButton';

const RazorpayPaymentScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <CButton
          title={'Razorpay'}
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
                alert(`Success: ${data.razorpay_payment_id}`);
              })
              .catch(error => {
                console.log(error);
                alert(`Error: ${error.code} | ${error.description}`);
              });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default RazorpayPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
