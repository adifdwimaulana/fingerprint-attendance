import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import fireabse from 'firebase';

class FormMataKuliah extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Input Data</Text>
            </View>
        )
    }
}

export default FormMataKuliah;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})