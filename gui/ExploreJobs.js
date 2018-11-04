import React from 'react'
import { View, FlatList, Text } from 'react-native'

import JobButton from './JobButton'
import { makeRequest } from './http-common'
import { POPUP } from './popup'


export default class ExploreJobs extends React.Component {
  constructor(props) {
    super(props)

    this.state = {jobs: []}

    makeRequest({
      url: '/api/job/',
      method: 'GET',
      onSuccess: (json) => {
        this.setState({jobs: json})
      },
      onError: (json) => {
        POPUP('error', JSON.stringify(json))
      }
    })

  }

  _keyExtractor = (item, index) => item.id

  render() {
    return (
      <View>
        <FlatList
          data={this.state.jobs}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => <JobButton job={item} />} />
      </View>
    )
  }
}
