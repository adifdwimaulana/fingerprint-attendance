import React from 'react'
import { View, Text } from 'react-native'

class Dashboard extends React.Component {
    componentDidMount() {
        console.log("Dashboard")
    }
    render() {
        return (
            <View>
                <Text>Dashboard Screen</Text>
            </View>
        )
    }
}

export default Dashboard;