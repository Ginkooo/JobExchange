import React from 'react'
import { View, Text, TextInput, Button, Alert } from 'react-native'


export default class Login extends React.Component {
    onLoginClick(navigation) {
        Alert.alert('login clicked')
    }

    onSignUpClick(navigation) {
        navigation.navigate('SignUp')
    }

    render() {
        return (
            <View style={{marginTop: 24 }}>
                <Text style={{fontSize: 24}}>Login:</Text>
                <TextInput style={{height: 40}} />
                <Text style={{fontSize: 24}}>Password:</Text>
                <TextInput style={{height: 40}} />
                <Button style={{marginTop: 10}} title='Login' onPress={() => {this.onLoginClick(this.props.navigation)}} />
                <Text style={{marginTop: 20}} onPress={() => {this.onSignUpClick(this.props.navigation)}}>No account? Click here to sign up!</Text>
            </View>
        )
    }
}
