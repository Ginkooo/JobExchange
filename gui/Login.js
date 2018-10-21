import React from 'react'
import { View, Text, TextInput, Button, Alert } from 'react-native'

import { POPUP } from './popup'
import { makeRequest } from './http-common'
import { STORAGE } from './storage'


export default class Login extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      username: null,
      password: null
    }

    STORAGE.load({
      key: 'credentials'
    }).then(creds => {
      console.log('trying to log in with default creds')
      console.log(JSON.stringify(creds))
      makeRequest({
        url: '/get-token/',
        method: 'POST',
        body: creds,
        onSuccess: (json) => {
          STORAGE.save({
            key: 'authToken',
            data: json.token
          })

          this.props.navigation.navigate('Profile')
        }
      })
    }).catch(err => {
      console.log('No creds in cache')
    })
  }

  onLoginClick(navigation) {
    username = this.state.username
    password = this.state.password

    if (!username) {
      Alert.alert('Username has to be provided')
      return
    }

    if (!password) {
      Alert.alert('Password has to be provided')
      return
    }

    makeRequest({
      url: '/get-token/',
      method: 'POST',
      body: this.state,
      onSuccess: (json) => {
        POPUP('success', 'Logged in successfuly!')
        STORAGE.save({
          key: 'authToken',
          data: json.token
        })

        STORAGE.save({
          key: 'credentials',
          data: {username: username, password: password}
        })

        navigation.navigate('Profile')
      },
      onError: (json) => {POPUP('error', JSON.stringify(json))}
    })
  }

  onSignUpClick(navigation) {
      navigation.navigate('SignUp')
  }

  handleUsername = (username) => {
    this.setState({username: username})
  }

  handlePassword = (password) => {
    this.setState({password: password})
  }

  render() {
      return (
          <View style={{marginTop: 24 }}>
              <Text style={{fontSize: 24}}>Login:</Text>
              <TextInput value={this.state.username} onChangeText={this.handleUsername} style={{height: 40}} />
              <Text style={{fontSize: 24}}>Password:</Text>
              <TextInput value={this.state.password} onChangeText={this.handlePassword} style={{height: 40}} />
              <Button style={{marginTop: 10}} title='Login' onPress={() => {this.onLoginClick(this.props.navigation)}} />
              <Text style={{marginTop: 20}} onPress={() => {this.onSignUpClick(this.props.navigation)}}>No account? Click here to sign up!</Text>
          </View>
      )
  }
}
