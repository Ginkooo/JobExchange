import React from 'react';
import { View, Text, Button, Alert } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import Login from './Login'
import SignUp from './SignUp'

const RootStack = createStackNavigator({
    Login: {
        screen: Login
    },
    SignUp: {
        screen: SignUp
    }
}, {
    initialRouteName: 'Login'
})

export default class App extends React.Component {
    render() {
        return <RootStack />
    }
}
