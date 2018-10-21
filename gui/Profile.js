import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Profile extends React.Component {

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
      }}>
        <View onPress={() => {this.myJobsClicked(this.props.navigation)}} style={[styles.button, {
          backgroundColor: 'green',
        }]}>
          <Text style={styles.buttonText}>My jobs</Text>
        </View>
        <View onPress={() => {this.wouldWantJobsClicked(this.props.navigation)}} style={[styles.button, {
          backgroundColor: 'purple',
        }]}>
          <Text style={styles.buttonText}>"Would want" jobs</Text>
        </View>
          <View onPress={() => {this.wouldDoJobsClicked(this.props.navigation)}} style={[styles.button, {
          backgroundColor: 'red',
        }]}>
          <Text style={styles.buttonText}>"Would do" jobs</Text>
        </View>
            <View onPress={() => {this.logOutClicked(this.props.navigation)}} style={[{
          backgroundColor: 'yellow',
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }]}>
          <Text style={[styles.buttonText]}>Log out</Text>
        </View>
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
