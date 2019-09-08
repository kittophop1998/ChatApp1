import React from 'react';
import {View ,Text,TextInput,SafeAreaView,Alert,TouchableOpacity,FlatList} from 'react-native';
import User from '../User';
import styles from '../constants/styles';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';

export default class Profile extends React.Component{
    static navigationOption={
        title:'Profile'
    }

    state={
        name:User.name
    }
    handleChange = key => val => {
        this.setState({ [key]: val})
    }
    changeName = async () => {
        if(this.state.name.length < 3){
            Alert.alert('Error','please enter');
        }
        if(User.name !== this.state.name){
            firebase.database().ref('users').child(User.phone).set({name:this.state.name});
            User.name = this.state.name;
            Alert.alert('Success','Name change successful')
        }
    }

    _logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <Text style={{fontSize:20}}>{User.phone}</Text>
                <Text style={{fontSize:20}}>{User.name}</Text>

                <TextInput
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={this.handleChange('name')}
                />
                <TouchableOpacity onPress={this.changeName}>
                    <Text style={styles.btnText1}>Change name</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._logout}>
                    <Text style={styles.btnText}>logOut</Text>
                </TouchableOpacity>
                
            </SafeAreaView>
        );
    }
}