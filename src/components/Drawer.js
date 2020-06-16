import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeStack from '../routes/homeStack';
import DataStack from '../routes/dataStack';
import LogoutStack from '../routes/logoutStack';
import DrawerComponent from './DrawerComponent';

const RootDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeStack
        },
        Data: {
            screen: DataStack
        },
        Logout: {
            screen: LogoutStack
        },
    },
    {
        contentComponent: DrawerComponent
    }
);

export default createAppContainer(RootDrawerNavigator);