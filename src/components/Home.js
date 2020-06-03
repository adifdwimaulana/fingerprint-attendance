import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import firebase from 'firebase'
import Navigator from './Drawer'

class Home extends React.Component {
    render() {
        return (
            <Navigator />
        )
    }
}

export default Home;
