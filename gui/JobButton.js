import React from 'react'

import { ScrollView, Text, View, Dimensions } from 'react-native'
import {makeRequest} from './http-common'
import Swipeable from 'react-native-swipeable'


export default class JobButton extends React.Component {

  constructor(props) {

    super(props)
  }

  initSwipeable(swipeable) {
    console.log(swipeable)
  }

  rightClosed = (event, gestureState, swipeable) => {
    console.log('I dont want to work')
  }

  rightOpened = (event, gestureState, swipeable) => {
    console.log('I want to work')
  }

  leftClosed = (event, gestureState, swipeable) => {
    console.log('I dont want to hire')
  }

  leftOpened = (event, gestureState, swipeable) => {
    console.log('I want to hire')
  }


  render() {
    return (
      <Swipeable style={{
        marginTop: 5
      }} leftButtons={[
      <View style={{padding: 2}}>
        <Text style={{
          textAlign: 'right'
        }}>I want to hire</Text>
      </View>
      ]} rightButtons={[
      <View style={{padding: 2}}>
        <Text>I want to work</Text>
      </View>
      ]}
      leftButtonsOpen={true}

      onRightButtonsCloseRelease={this.rightClosed}
      onRightButtonsOpenRelease={this.rightOpened}

      onLeftButtonsCloseRelease={this.leftClosed}
      onLeftButtonsOpenRelease={this.leftOpened}
    >
        <View style={{
          backgroundColor: 'lightblue',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10
        }}>
          <Text>
            {this.props.job.name}
          </Text>
        </View>
      </Swipeable>
    )
  }
}
