import React from 'react'

import { TouchableOpacity, Text, View } from 'react-native'


export default class JobButton extends React.Component {

  constructor(props) {

    super(props)

    this.state = {choosed: false}

  }

  render() {
    return (
      <View style={{
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#449f52',
      }}>
        <TouchableOpacity style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 24
          }}>{this.props.job.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
