import React from 'react'
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import {Icon} from 'react-native-elements'
import { STORAGE } from './storage'

import CardStack, { Card } from 'react-native-card-stack-swiper'

import { makeRequest } from './http-common'
import { POPUP } from './popup'
import Deal from './Deal'


export default class Deals extends React.Component {
  constructor(props) {
    super(props)

    this.state = {deals: [], idx: 0, displayHelp: true}

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

  swiped(user, direction) {
    if (direction === 'right') {
      return
    }

    let body = {
      job: user.job.id
    }

    STORAGE.load({
      key: 'credentials'
    })
      .then(creds => {
        makeRequest({
          url: `/api/user/?username=${creds.username}`,
          method: 'GET',
          onSuccess: json => {
            if (user.type === 'would_do') {
              body.employer = json[0].id
              body.employer_approved = true
            } else {
              console.log(JSON.stringify(json))
              body.employee = json[0].id
              body.employee_approved = true
            }

            makeRequest({
              url: '/api/deal/',
              method: 'POST',
              body: body,
              onSuccess: json => {
                POPUP('success', 'Deal request sent!')
              },
              onError: json => {
                console.log('dupa nie wyszło')
                POPUP('error', JSON.stringify(json))
              }
            })
          },
          onError: json => {
            POPUP('error', JSON.stringify(json))
          }
        })
      })
      .catch(json => {
        POPUP('error', JSON.stringify(json))
      })
  }

  getCards() {
    ret = []
    let i = 0
    for (let user of this.state.deals) {
      ret.push(
        <Card key={i} onSwipedLeft={() => {this.swiped(user, 'left')}} onSwipedRight={() => {this.swiped(user, 'right')}} style={{
          width: Dimensions.get('window').width - 100,
          height: Dimensions.get('window').height - 200,
          backgroundColor: '#ededed',
          borderRadius: 20,
          borderWidth: 2,
          borderColor: 'black'
        }}><Deal user={user}/></Card>
      )
      i++
    }
    return ret
  }

  showHelp() {
    return (
      <View position='absolute' style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 3,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}>
      <TouchableOpacity onPress={() => {this.setState({displayHelp: false})}}>
        <View style={{
          flexDirection: 'row',
        }}>
          <Icon name='arrow-back' size={50} />
          <Text style={{fontSize: 30}}>I am interested</Text>
        </View>
        <View style={{
          flexDirection: 'row',
        }}>
          <Icon name='arrow-forward' size={50} />
          <Text style={{fontSize: 30}}>I am not interested</Text>
        </View>
      </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={{
        width: '100%',
        height: '100%',
      }}>
      {this.state.displayHelp && this.showHelp()}
        <CardStack verticalSwipe={false} style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}ref={swiper => {this.swiper = swiper}}>
          {this.getCards()}
        </CardStack>
      </View>
    )
  }
}
