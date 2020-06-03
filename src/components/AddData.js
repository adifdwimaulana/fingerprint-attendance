import React from 'react'
import { View, Text } from 'react-native'

class AddData extends React.Component {
    componentDidMount() {
        console.log("Data");
    }
    render() {
        return (
            <View>
                <Text>Add Data Screen</Text>
            </View>
        )
    }
}

export default AddData