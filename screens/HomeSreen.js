import React,{Component} from 'react';
import {View ,Text,TouchableOpacity,AsyncStorage,FlatList,SafeAreaView,Image} from 'react-native';
import User from '../User';
import styles from '../constants/styles';
import firebase from 'firebase';
import { YellowBox } from 'react-native';

export default class HomeSreen extends React.Component{
    static navigationOptions = ({navigation}) =>{
        return{
            title:'Chats',
            headerRight:(
                <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                    <Image source={require('../img/user.png')} style={{width:32,height:32}}/>
                </TouchableOpacity>
            )
        }
    }

    state={
        users: []
    }

    componentWillMount(){
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added',(val) => {
            let person = val.val();
            person.phone=val.key;
            if(person.phone===User.phone){
                User.name = person.name
            }else{
                this.setState((prevState) => {
                    return{
                        users:[...prevState.users, person]
                    }
                }) 
            }
            
        })
    }
   

    _logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    renderRow=({item}) => {
        return(
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('chat',item)} 
                style={{padding:10,borderBottomColor:'#ccc',borderButtomWidth:1}}>
                <Text style={{fontSize:20}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    render(){
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
          ]);

        return(
            <SafeAreaView>
                    <View style={{alignItems: 'center',backgroundColor:'#CC99FF'}}>
                        <Text style={{ color:'#000000', fontSize: 25,fontWeight: 'bold'}}>My_Friend</Text>
                    </View>
                    <View style={{backgroundColor:'#FF99CC'}}>
                <FlatList
                    data ={this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.phone}
               />
               </View>

            </SafeAreaView>
           
        );
    }
}