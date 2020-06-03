import { createStackNavigator } from 'react-navigation-stack';
import Dashboard from '../components/Dashboard';

const screens = {
    Home: {
        screen: Dashboard,
        navigationOptions: {
            title: 'Dashboard'
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