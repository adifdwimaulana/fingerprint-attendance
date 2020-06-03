import React from 'react';
import { ScrollView, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import Drawer from './Drawer';

class DrawerComponent extends React.Component {
    logout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => this.props.navigation.navigate('Login'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    canceledLogout = () => {
        console.log('Logout Cancel !')
    }

    logoutAlert = () => {
        Alert.alert(
            'Confirm',
            'Are you sure want to logout?',
            [
                { text: 'Yes', onPress: () => this.logout },
                { text: 'Cancel', onPress: () => this.canceledLogout }
            ]
        );
    }

    render() {
        return (
            <ScrollView>
                <TouchableOpacity onPress={this.logoutAlert}>Logout</TouchableOpacity>
            </ScrollView>
        )
    }
}

export default Drawer;