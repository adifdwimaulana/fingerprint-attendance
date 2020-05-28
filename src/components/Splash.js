import React from 'react';
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import firebase from 'firebase'

class Splash extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth");
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading ...</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Splash;
