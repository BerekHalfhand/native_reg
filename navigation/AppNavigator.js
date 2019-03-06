import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import SignUpScreen from '../screens/SignUpScreen'
import LoginScreen from '../screens/LoginScreen'
import SettingsScreen from '../screens/SettingsScreen'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'

const AppStack = createStackNavigator({ Settings: SettingsScreen })
const AuthStack = createStackNavigator({ SignUp: SignUpScreen, Login: LoginScreen })

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
))
