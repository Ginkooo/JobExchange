import React from 'react'
import { View, Text, TextInput, Button, Alert } from 'react-native'

import { makeRequest } from './http-common'
import { STORAGE } from './storage'
import { POPUP } from './popup'

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            password: null,
            email: null
        }
    }

    handleUsername = (username) => {
        this.setState({username: username})
    }

    handlePassword = (password) => {
        this.setState({password: password})
    }

    handleEmail = (email) => {
        this.setState({email: email})
    }

    signUpClicked(navigation) {
        if (!this.state.username) {
            Alert.alert('Username must not be empty')
            return
        }
        if (!this.state.email) {
            Alert.alert('Email must not be empty')
            return
        }
        if (!this.state.password) {
            Alert.alert('Password must not be empty')
            return
        }

        makeRequest({
            url: '/signup/',
            method: 'POST',
            body: this.state,
            onSuccess: (json) => {POPUP('success', 'Zarejestrowano pomyślnie, możesz się teraz zalogować'); navigation.navigate('Login')},
            onError: (json) => {POPUP('error', JSON.stringify(json))}
        })

    }

    render() {
        return (
            <View style={{marginTop: 24 }}>
                <Text style={{fontSize: 24}}>Username:</Text>
                <TextInput value={this.state.username} onChangeText={this.handleUsername} style={{height: 40}} />
                <Text style={{fontSize: 24}}>Password:</Text>
                <TextInput value={this.state.password} onChangeText={this.handlePassword} style={{height: 40}} />
                <Text style={{fontSize: 24}}>Email:</Text>
                <TextInput value={this.state.email} onChangeText={this.handleEmail} style={{height: 40}} />
                <Button onPress={() => {this.signUpClicked(this.props.navigation)}} style={{marginTop: 10}} title="Sign up!" />
            </View>
        )
    }
}
