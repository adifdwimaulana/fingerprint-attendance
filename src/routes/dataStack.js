import { createStackNavigator } from 'react-navigation-stack';
import Data from '../components/Data';
import Header from '../components/Header';
import React from 'react';

const screens = {
    Data: {
        screen: Data,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
            }
        }
    },
}

const DataStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
});

export default DataStack;