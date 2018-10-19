import React from 'react';
import { Text, View } from 'react-native';
import Greeting from './Greeting'

export default class LotsOfGreetings extends React.Component {
    render() {
        return (
            <View style={{marginTop: 24, alignItems: 'center'}}>
                <Greeting text="asdf" />
                <Greeting text="asdf" />
                <Greeting text="asdf" />
                <Greeting text="asdf" />
            </View>
        )
    }
}
