import { createStackNavigator } from 'react-navigation-stack';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import React from 'react';

const screens = {
    Home: {
        screen: Dashboard,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
            }
        }
    },
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
});

export default HomeStack;