import React from 'react';
import { Alert, Button, View, StyleSheet } from 'react-native';
import firebase from 'firebase';

class Logout extends React.Component {

    componentDidMount() {
        Alert.alert(
            //title
            'Hi,',
            //body
            'Are you sure want to logout ?',
            [
                { text: 'Yes', onPress: this.handleSignout },
                { text: 'No', onPress: this.cancleSignout, style: 'cancel' },
            ],
            { cancelable: false }
            //clicking out side of alert will not cancel
        );
    }

    handleSignout = () => {
        console.log("SignOut");
        firebase.auth().signOut()
            .then(() => this.props.navigation.navigate('Login'))
            .catch(error => console.log(error));

    }

    cancleSignout = () => {
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View>

            </View>
        )
    }
}

export default Logout;