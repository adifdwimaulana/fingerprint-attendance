import { createStackNavigator } from 'react-navigation-stack';
import AddData from '../components/AddData';
import Header from '../components/Header';
import React from 'react';

const screens = {
    AddData: {
        screen: AddData,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
            }
        }
    },
}

const AddDataStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
});

export default AddDataStack;