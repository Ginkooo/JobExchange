import React from 'react'
import Text from 'react-native'

export default class Greeting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {isTextVisible: true}

        setInterval(() => {
            this.setState(prevState => {
                return { isTextVisible: !prevState.isTextVisible }
            })
        }, 1000)
    }

    render() {
        let text = this.state.isTextVisible ? this.props.text : ' '

        return (
            <Text>{text}</Text>
        )
    }
}

