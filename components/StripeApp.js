import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, Image, TouchableOpacity } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { HOST_URL } from '../commonConfig';
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { color } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useNavigation } from '@react-navigation/native';
import {firebaseApp} from '../firebase-config';
import axios from "axios";


const API_URL = HOST_URL;

const StripeApp = props => {
  
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    
    var self = this;
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
     
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          handleScreen();
          //props.navigation.navigate('Chat');
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleScreen = () =>
  {
        const userId = firebaseApp.auth().currentUser.uid;
        axios.post(HOST_URL + "userInfo/updatepayment?userId=" + userId,
        {
            isPaid: "yes",
         })
        .then(res => {
          console.log("isPaid updated");
          props.navigation.navigate('Home');
         }).catch(function (error) {
        console.log("error", error);
      })  
  }


return (
    <StripeProvider publishableKey="pk_test_51JMZBKJ05k18rayZrbN3rAiCkFTV0uzkZCqjgVUNQKNDSda44Agckge6Jwnsp0qrqan4yVdC4cCUseLUghziy90x00WZloT6aI">
      <View style={styles.container}>
      <ScrollView>
      <View style={styles.header}>
        <Text style={styles.hederTitle}>Unlock your Unlimited access</Text>
        <Image
            style={{ width: 200, height: 200,  alignItems: 'center', justifyContent: 'center', resizeMode: 'contain'}}
            source={require('./payment.png')}
          />
        <Text style={styles.hedertext}>$10/month</Text>
      </View>
      
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 20}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View>
          <Text style={{width: 100, textAlign: 'center'}}>Pay Here!</Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>

      <View style={styles.footer}>
        <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />

        <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <View>
        <TouchableOpacity style={styles.payButton} onPress={handlePayPress} disabled={loading}>
          <Text style={styles.payBtnText}>Pay $10.00</Text>
        </TouchableOpacity>
      </View>
      <Text style={[{textAlign: 'center'}, {marginTop: 25}]} onPress={()=>{props.navigation.navigate('Home')}}>Go to Home</Text>
      {/* <Button onPress={handlePayPress} title="Pay" disabled={loading} /> */}
   
        </View>
       </ScrollView>
      </View>
    </StripeProvider>
  );

};


export default StripeApp;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 0,
      backgroundColor: "#fff",
    },

    header: 
    {
      alignItems: 'center',
      marginTop: 40,
    },
    hederTitle:
    {
      fontSize: 18,
      fontWeight: '700'
    },
    hedertext:
    {
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 20,
      fontWeight: '600',
      color: '#EB6C3E'

    },
    footer:
    {
      margin: 20,
    },
    input: {
      backgroundColor: "#efefefef",
      borderRadius: 8,
      fontSize: 20,
      height: 50,
      padding: 10,
      marginTop: 30,
    },

    card: {
      backgroundColor: "#efefefef",
    },

    cardContainer: {
      height: 100,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: {
      width: 5,
      height: 5
      },
      shadowOpacity: 0.25,
      elevation: 9,
      shadowRadius: 5,
    },

    payButton:
    {
      marginTop: 10,
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: '#EB6C3E'
    },
    payBtnText:
    {
      color: '#fff',
      fontSize: 15,
    }
  });




