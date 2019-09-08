import React from 'react';
import {View ,Text,TextInput,SafeAreaView,Dimensions,TouchableOpacity,ScrollView} from 'react-native';
import styles from '../constants/styles';
import User from '../User';
import firebase from 'firebase';
import { YellowBox } from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

export default class chatscreen extends React.Component{
    static navigationOption =   ({navigation}) => {
        return{
            title:navigation.getParam('name',null)
        }    
    }
    constructor(props){
        YellowBox.ignoreWarnings(['Setting a timer']);
        super(props);
        this.state={
            person:{
                name: props.navigation.getParam('name'),
                phone: props.navigation.getParam('phone'),
            },
            textMessage:'',
            messageList:[]
        }
    }
    
    componentWillMount(){
        let dbRef = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone);
            dbRef.on('child_added', (value)=>{
                this.setState((prevState)=>{
                    return{
                        messageList:[...prevState.messageList, value.val()]
                    }
                })
            })
        let dbRef1 = firebase.database().ref('messages').child(User.phone)
            dbRef1.on('child_added', (value)=>{
                this.setState((prevState)=>{
                    return{
                        messageList:[...prevState.messageList, value.val()]
                    }
                })
            })
            
    }
    

    handleChange = key => val =>{
        this.setState({ [key] : val })
    }
    
    sendMessage = async () => {
        if(this.state.textMessage.length > 0){
            let msgId = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key;
            let updates={};
            let message ={
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone
            };
            updates['messages/'+ User.phone+ '/' + this.state.person.phone +'/'+ msgId] = message;
            updates['messages/'+ this.state.person.phone +'/'+ User.phone + msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({textMessage:''});
        }
    }
    renderRow = ({item}) => {
        return(
            <View style={{
                        flexDirection:'row',
                        width:'60%',
                        alignSelf : item.from===User.phone ? 'flex-end' : 'flex-start',
                        backgroundColor: item.from===User.phone ? '#00897b': '#7cb342',
                        borderRadius:5,
                        marginBottom:10
                        }}>
                    <Text style={{color:'#fff',padding:7,fontSize:16}}>{item.message}</Text>
                    <Text style={{color:'#fff',padding:3,fontSize:12}}>{this.converTime(item.time)}</Text>
            </View>
        )
    }
    converTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result =(d.getHours() < 10 ? '0':'') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0':'') + d.getMinutes();
        if(c.getDay() !== d.getDay()){
            result = d.getDay() + '' +d.getMonth()+ '' + result
        }return result;
    }

    
    render(){
        let {height , width}=Dimensions.get('window');
        return(
            <SafeAreaView>
                <ScrollView keyboardShouldPersistTaps="handled">
                <FlatList
                    style={{padding:10,height:height * 0.78}}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item,index) => index.toString()}
                />
                <View style={{flexDirection:'row',alignItems:'center', marginHorizontal:5 }}>
                
                <TextInput
                    style={styles.input}
                    value={this.state.textMessage}
                    placeholder="Type message"
                    onChangeText={this.handleChange('textMessage')}
                />
               
                <TouchableOpacity onPress={this.sendMessage} style={{paddingBottom:10,marginLeft:5}}>
                    <Text style={{  color:'#000000',
                                    fontSize:24,
                                    marginBottom:'10%',
                                    backgroundColor:'#FF9966'}}>send</Text>
                </TouchableOpacity>

                </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}