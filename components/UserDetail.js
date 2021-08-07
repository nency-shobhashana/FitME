import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput} from 'react-native';
import {Picker} from "@react-native-picker/picker";
import axios from "axios";
import {firebaseApp} from '../firebase-config'; 
import { HOST_URL } from '../commonConfig';
import DatePicker from 'react-native-datepicker';


class UserDetail extends React.Component {

    constructor(props) 
    {
      super(props);
      this.state = {firstname: '', date: '', bmi: '', currentDate: new Date().getDate(), height: '', weight: '',isLoading: false, error: '', selectedcat: "", category: [
        {
          itemName: "Male"
        },
        {
          itemName: "Female"
        }
      ]}
    }

    async onValueChangeCat(value) {
      this.setState({ selectedcat: value });
    }

    // addData = () =>
    // {
    //   const uid = firebaseApp.auth().currentUser.uid;
    //   axios.post(HOST_URL + "userInfo/add", {
    //     firstname: this.state.firstname,
    //     gender: this.state.selectedcat,
    //     date: this.state.date,
    //     height: this.state.height,
    //     weight: this.state.weight,
    //     userId: firebaseApp.auth().currentUser.uid,
    //   })
    //   .then(res => {
    //     alert("User data added succesfully");
    //     this.props.navigation.navigate('Home')
    //   }).catch(error =>{
    //     console.log(error);
    //   })   

    // }

     addData = () =>
    {
      const uid = firebaseApp.auth().currentUser.uid;
      axios.post(HOST_URL + "userInfo/add", {
        firstname: this.state.firstname,
        gender: this.state.selectedcat,
        date: this.state.date,
        height: this.state.height,
        weight: this.state.weight,
        userId: firebaseApp.auth().currentUser.uid,
      })
      .then(res => {
        alert("User data added succesfully");
        this.props.navigation.navigate('Home')
      }).catch(error =>{
        console.log(error);
      })   

    }


    calcBmi = () =>
 {
    const hei = parseFloat(this.state.height);
    const wei = parseFloat(this.state.weight);
    this.state.bmi = wei / (hei * hei);
    return this.state.bmi;   
 }

  
    render()
    {
      return (
      <ScrollView>
        <View style={styles.container}>
          
          {/* First name */}
          <Text style={[styles.text_footer, { margin: 10 }, { fontSize: 15 }]}>First Name</Text>
          <TextInput style={styles.resultText} onChangeText={firstname => this.setState({ firstname })} value={this.state.firstname} />


         {/* Gender */}
         <Text style={[styles.text_footer, { margin: 10 }, { fontSize: 15 }]}>Gender</Text>
          <Picker
            itemStyle={styles.resultPickerText}
            mode="dropdown"
            style={styles.pickerStyle}
            selectedValue={this.state.selectedcat}
            onValueChange={this.onValueChangeCat.bind(this)}
          >
            {this.state.category.map((item, index) => (
              <Picker.Item
                color="#0087F0"
                label={item.itemName}
                value={item.itemName}
                index={index}
              />
            ))}
          </Picker>


    <Text style={[styles.text_footer, { margin: 10 }, {marginTop: 30}, { fontSize: 15 }]}>Enter the Date of Birth</Text>

          <DatePicker
          style={styles.datePickerStyle}
          date={this.state.date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          // minDate="01-01-2016"
          maxDate = {this.state.currentDate}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={date => {
            this.setState({date});
          }}
          />

          {/* <TextInput style={styles.resultText} placeholder = "MM-DD-YYYY" onChangeText={date => this.setState({ date })} value={this.state.date} /> */}


          <Text style={[styles.text_section, { marginTop: 70 }, {marginLeft: 10}, {marginBottom: 20}, { fontSize: 21 }]}>Where Are We Now?</Text>

          <View style={styles.footer}>
                  <Text style={[styles.text_footer, { margin: 10 }, { fontSize: 15 }]}>Enter the Height</Text>
                  <TextInput style={styles.resultText} placeholder="Height in m" onChangeText={height => this.setState({ height })} value={this.state.height} />

                  <Text style={[styles.text_footer, { margin: 10 }, { fontSize: 15 }]}>Enter the Weight</Text>
                  <TextInput style={styles.resultText} placeholder="Weight in kg" onChangeText={weight => this.setState({ weight })} value={this.state.weight} />

                  {/* <Text style={[styles.text_section, { margin: 10}, { fontSize: 15 }]}>Your BMI is</Text> */}

                  <View style={styles.submitbutton}>
                    <TouchableOpacity style={[styles.submit, {color: 'black'}]} onPress={() => this.addData()}>
                      <Text style={styles.submitbtnText}>Submit</Text>
                    </TouchableOpacity>    
                  </View>
          </View>
        </View>
      </ScrollView>
    );
    }  
  }
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
    },

   footer:
  {
    flex: 3,
    backgroundColor: '#F7E1D9',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

    text_footer:
    {
        fontSize: 10,
    },

    resultText:
    {
      height: 50,
      margin: 6,
      borderWidth: 0.5,
      borderRadius: 5,
      padding: 10,
      borderColor: '#393838'
    },

    resultPickerText:
    {
      height: 50,
      margin: 6,
      borderWidth: 0.5,
      borderRadius: 5,
      padding: 10,
      borderColor: '#393838'
    },

    text_section:
    {
      color: '#EB6C3E',
      fontWeight: '300'
    },

    itemStyle: {
      fontSize: 20,
      color: "#EB6C3E"
    },

    pickerStyle: {
      height: 50,
      color: "#EB6C3E",
      fontSize: 16,
    },

    datePickerStyle: {
      width: 200,
      height: 50,
      marginLeft: 10,
      padding: 8,
    },

   submitbutton:
   {
     alignItems: 'center',
     marginTop: '2%',
   },

   submit:
  {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#EB6C3E'
  },

  submitbtnText:
  {
      color: '#fff',
      fontSize: 15,
  },

  
  });
  
  export default UserDetail;
  
  
  