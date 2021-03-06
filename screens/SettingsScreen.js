import React from 'react'
import {
  AsyncStorage,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native'
import { ExpoConfigView } from '@expo/samples'
import { StyledButton } from '../components/StyledButton'
import { MonoText } from '../components/StyledText'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'User settings',
  };
  constructor(props){
     super(props)

    this.state = {
      userData: {},
      isLoading: true,
    }
  }


  componentDidMount() {
    this._retrieveData()
  }

  // gets the stored user data
  _retrieveData = async () => {
    let userData = await AsyncStorage.getItem('values')
    userData = JSON.parse(userData)
    await this.setState({
      userData: userData,
      isLoading: false,
    })
  };

  // resets all storage, both userToken and user data
  _resetStorage = async () => {
    await AsyncStorage.clear()
  }

  // removes userToken and redirects to the login page
  _logOut = async () => {
    await AsyncStorage.removeItem('userToken')

    this.props.navigation.navigate('Login')
  }

  // outputs user data when it's ready
  _renderUserData() {
    if (!this.state.isLoading && this.state.userData)
      return (
        <View>
          <MonoText>Username: {this.state.userData.username}</MonoText>
          <MonoText>Name: {this.state.userData.name}</MonoText>
          <MonoText>Password: {this.state.userData.password}</MonoText>
          <MonoText>Email: {this.state.userData.email}</MonoText>
        </View>
      )

    return false
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          { this._renderUserData() }

          <StyledButton title="Log Out" handler={this._logOut} />
          <StyledButton title="Reset All" handler={this._resetStorage} />
        </View>
        <ExpoConfigView />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 15,
  },
})
