import { createStackNavigator } from 'react-navigation-stack';
import AddData from '../components/AddData';

const screens = {
    AddData: {
        screen: AddData,
        navigationOptions: {
            title: 'Add Data'
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