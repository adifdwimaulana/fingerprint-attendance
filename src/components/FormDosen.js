import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import fireabse from 'firebase';

class FormDosen extends React.Component {
    static navigationOptions = { header: null }
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text>Input Data</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default FormDosen;