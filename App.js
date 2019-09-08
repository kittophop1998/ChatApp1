import React, {Component} from 'react';
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from './screens/Login';
import HomeScreen from './screens/HomeSreen';
import AuthLoading from './screens/AuthLoading';
import chatscreen from './screens/chatscreen';
import Profile from './screens/Profile';

const AppStack= createStackNavigator({Home:HomeScreen , chat:chatscreen , profile:Profile});
const AuthStack= createStackNavigator({Login:Login});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading:AuthLoading,
    App:AppStack,
    Auth:AuthStack, 
  },
  {
    initialRouteName:'AuthLoading',
  }
));


