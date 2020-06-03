import { createStackNavigator } from 'react-navigation-stack';
import Logout from '../components/Logout';
import Header from '../components/Header';
import React from 'react';

const screens = {
    Logout: {
        screen: Logout,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
            }
        }
    },
}

const LogoutStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
});

export default LogoutStack;