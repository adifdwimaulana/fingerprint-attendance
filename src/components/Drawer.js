import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeStack from '../routes/homeStack';
import DataStack from '../routes/dataStack';
import LogoutStack from '../routes/logoutStack';

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
        }
    }
);

export default createAppContainer(RootDrawerNavigator);