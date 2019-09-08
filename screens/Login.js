import React from 'react';
import {StyleSheet,Text,TextInput,View,TouchableOpacity,Alert,Image} from 'react-native';
import User from '../User';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../constants/styles';
import firebase from 'firebase';


export default class Login extends React.Component{
    static navigationOption={
        header:null
    }

    state={
        phone:'',
        name:''
    }

  handleChange = key => val => {
    this.setState({ [key] : val })
  }
 
 
  submitFrom =  async () => {
    if(this.state.phone.length <10){
      Alert.alert('Error','Wrong phone number')
    }else if(this.state.name.length <3){
      Alert.alert('Error','Wrong name')
    }else{
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      firebase.database().ref('users/' + User.phone).set({name:this.state.name});
      this.props.navigation.navigate('App'); 
    }
  }

 render(){
  let pic = {
    uri: 'https://www.searchpng.com/wp-content/uploads/2019/02/Chat-PNG-Icon-715x657.png'
 };
   return(
     <View style={styles.container}>
        <Image source={pic} style={{width: 200, height: 200}}/>
       <TextInput
          placeholder="Phone number"
          keyboardType="number-pad"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
       />
       <TextInput
          placeholder="name"
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
       />

        <TouchableOpacity onPress={this.submitFrom}>
         <Text style={styles.btnText}>     Login     </Text>
        </TouchableOpacity>
     </View>
   );
 }

}



