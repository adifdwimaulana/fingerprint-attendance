import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import firebaseConfig from './src/config'

import Splash from './src/components/Splash'
import Login from './src/components/Login'
import Register from './src/components/Register'
import Home from './src/components/Home'

console.disableYellowBox = true;

const Stack = createStackNavigator(
  {
    Login,
    Register
  },
)

const Switch = createSwitchNavigator(
  {
    Home,
    Splash,
    Stack
  },
  {
    initialRouteName: 'Splash'
  }
)

export default createAppContainer(Switch)