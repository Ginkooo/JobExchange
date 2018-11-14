import React from 'react'
import { View, Text, Dimensions } from 'react-native'

import CardStack, { Card } from 'react-native-card-stack-swiper'

import { makeRequest } from './http-common'
import { POPUP } from './popup'
import Deal from './Deal'


export default class Deals extends React.Component {
  constructor(props) {
    super(props)

    this.state = {deals: [], idx: 0}

    makeRequest({
      url: '/api/user/?related=true',
      method: 'GET',
      onSuccess: json => {
        let deals = this._flatten_deals(json)
        this.setState({deals: deals})
      },
      onError: json => {
        POPUP('error', 'Try again later')
      }
    })
  }


  _flatten_deals(deals) {
    let annotated_users = []
    for(let job_name in deals.users_would_do) {
      for (let user of deals.users_would_do[job_name]) {
        user.type = 'would_do'
        user.job = user.would_do.filter(j => j.name === job_name)[0]
        annotated_users.push(user)
      }
    }
    for(let job_name in deals.users_would_employ) {
      for (let user of deals.users_would_do[job_name]) {
        user.type = 'would_employ'
        user.job = user.would_do.filter(j => j.name === job_name)[0]
        annotated_users.push(user)
      }
    }

    return annotated_users
  }

  getCards() {
    ret = []
    let i = 0
    for (let user of this.state.deals) {
      ret.push(
        <Card key={i} style={{
          width: Dimensions.get('window').width - 100,
          height: Dimensions.get('window').height - 200,
          backgroundColor: 'red'
        }}><Deal user={user}/></Card>
      )
      i++
    }
    return ret
  }

  render() {
    return (
      <CardStack style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
      }}ref={swiper => {this.swiper = swiper}}>
        {this.getCards()}
      </CardStack>
    )
  }
}
