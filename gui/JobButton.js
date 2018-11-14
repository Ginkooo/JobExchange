import React from 'react'

import { View, Switch, Text } from 'react-native'
import { makeRequest } from './http-common'
import Swipeable from 'react-native-swipeable'
import { POPUP } from './popup'


export default class JobButton extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      would_want: false,
      would_do: false
    }
  }

  switched(type, value) {
    let s = {}
    s[type] = value
    this.setState(s)
    let body = {
      id: this.props.job.id
    }
    body[type] = value
    makeRequest({
      url: '/api/favjob/',
      method: 'PUT',
      body: body,
      onSuccess: json => {
      },
      onError: json => {
        s = {}
        s[type] = false
        this.setState(s)
        POPUP('error', "Can't do that right now, try again later")
      }
    })
  }

  render() {
    return (
      <View style={{
        backgroundColor: 'lightskyblue',
        height: 70,
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch'
      }}>
        <View>
          <Text>Hire</Text>
          <Switch value={this.state.would_want} onValueChange={value => {this.switched('would_want', value)}} />
        </View>
        <Text style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          textAlignVertical: 'center',
          textAlign: 'center',
          fontSize: 20,
        }}>
          {this.props.job.name}
        </Text>
        <View>
          <Text>Work</Text>
          <Switch value={this.state.would_do} onValueChange={value => {this.switched('would_do', value)}}/>
        </View>
      </View>
    )
  }
}
