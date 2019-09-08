import React,{Component} from 'react';
import {ActivityIndicator,StatusBar,View} from 'react-native';
import User from '../User';
import AsyncStorage from '@react-native-community/async-storage';

import firebase from 'firebase';

export default class AuthLoading extends React.Component{
    constructor(props){
        super(props);
        this._bootstrapAsync();
    }
    componentWillMount(){
        var firebaseConfig = {
            apiKey: "AIzaSyDv6jD50OL-_6KdKy2T7EJxKBYgRe4pDHM",
            authDomain: "fir-chat-e2b60.firebaseapp.com",
            databaseURL: "https://fir-chat-e2b60.firebaseio.com",
            projectId: "fir-chat-e2b60",
            storageBucket: "fir-chat-e2b60.appspot.com",
            messagingSenderId: "1029999377716",
            appId: "1:1029999377716:web:65fca7f248bde0d0"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
    }

    _bootstrapAsync = async () => {
        User.phone  = await AsyncStorage.getItem('userPhone');
        this.props.navigation.navigate(User.phone ? 'App': 'Auth');
    };

    render(){
        return(
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}