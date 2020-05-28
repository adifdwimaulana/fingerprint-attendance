import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Splash from './src/components/Splash'
import Login from './src/components/Login'
import Register from './src/components/Register'
import Home from './src/components/Home'

const AppStack = createStackNavigator({
  Home: Home
})

const AuthStack = createStackNavigator({
  Login: Login,
  Register: Register,
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Splash: Splash,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Splash"
    }
  )
);