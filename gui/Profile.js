import React from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'

import { STORAGE } from './storage'

export default class Profile extends React.Component {

  constructor(props) {
    super(props)

    this.state = {username: null}

    STORAGE.load({
      key: 'credentials'
    }).then(creds => {
        this.setState({username: creds.username})
    })
  }

  myJobsClicked(navigation) {
    navigation.navigate('MyJobs')
  }

  wouldWantJobsClicked(navigation) {
    navigation.navigate('WouldWantJobs')
  }

  wouldDoJobsClicked(navigation) {
    navigation.navigate('WouldDoJobs')
  }

  logOutClicked(navigation) {

    STORAGE.remove({
      key: 'authToken'
    })

    STORAGE.remove({
      key: 'credentials'
    })

    Alert.alert('Logged out sucessfuly!')

    navigation.navigate('Login')
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
      }}>
        <View style={{
          flex: 0.2
        }}>
        <Text>{this.state.username}</Text>
        </View>
        <TouchableOpacity onPress={() => {this.myJobsClicked(this.props.navigation)}} style={[styles.button, {
          backgroundColor: 'green',
        }]}>
          <Text style={styles.buttonText}>My jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {this.wouldWantJobsClicked(this.props.navigation)}} style={[styles.button, {
          backgroundColor: 'purple',
        }]}>
          <Text style={styles.buttonText}>"Would want" jobs</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.wouldDoJobsClicked(this.props.navigation)}} style={[styles.button, {
          backgroundColor: 'red',
        }]}>
          <Text style={styles.buttonText}>"Would do" jobs</Text>
        </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.logOutClicked(this.props.navigation)}} style={[{
          backgroundColor: 'yellow',
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }]}>
          <Text style={[styles.buttonText]}>Log out</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 30
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
