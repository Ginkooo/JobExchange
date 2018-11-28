import React from 'react';
import { View, Text, Button, Alert } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import Login from './Login'
import SignUp from './SignUp'
import Profile from './Profile'
import ExploreJobs from './ExploreJobs'
import Deals from './Deals'
import MyJobs from './MyJobs'

const RootStack = createStackNavigator({
  Login: {
    screen: Login
  },
  SignUp: {
    screen: SignUp
  },
  Profile: {
    screen: Profile
  },
  ExploreJobs: {
    screen: ExploreJobs
  },
  Deals: {
    screen: Deals
  },
  MyJobs: {
    screen: MyJobs
  }
}, {
  initialRouteName: 'Login'
})

export default class App extends React.Component {
    render() {
        return <RootStack />
    }
}
