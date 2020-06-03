import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeStack from '../routes/homeStack';
import AddDataStack from '../routes/addDataStack';
import DrawerComponent from './DrawerComponent';

const RootDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeStack
        },
        Data: {
            screen: AddDataStack
        }
    }
);

export default createAppContainer(RootDrawerNavigator);