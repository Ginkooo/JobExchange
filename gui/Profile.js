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

  exploreJobsClicked(navigation) {
    navigation.navigate('ExploreJobs')
  }

  makeADealClicked(navigation) {
    navigation.navigate('Deals')
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
          <TouchableOpacity onPress={() => {this.myJobsClicked(this.props.navigation)}} style={[styles.button, {
            backgroundColor: 'green',
          }]}>
            <Text style={styles.buttonText}>My jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.makeADealClicked(this.props.navigation)}} style={[styles.button, {
            backgroundColor: 'lightskyblue',
          }]}>
            <Text style={styles.buttonText}>Make a deal</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.exploreJobsClicked(this.props.navigation)}} style={[styles.button, {
            backgroundColor: 'purple',
          }]}>
            <Text style={styles.buttonText}>Explore jobs</Text>
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
