import React from 'react'
import { View, Text, Dimensions } from 'react-native'


export default class Deal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{
        justifyContent: 'center'
      }}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10
      }}>{this.props.user.username}</Text>
    <Text style={{
      fontSize: 24,
      fontWeight: 'bold',
      padding: 10,
      textAlign: 'center'
    }}>{this.props.user.type === 'would_do' ? 'Will work on' : 'Will hire for'}</Text>
  <Text style={{
    fontSize: 30,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  }}>{this.props.user.job.name}</Text>
      </View>
    )
  }
}
