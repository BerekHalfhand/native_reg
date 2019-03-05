import React from 'react';
import {
  Alert,
  AsyncStorage,
  Button,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import { StyledButton } from '../components/StyledButton';
import { MonoText } from '../components/StyledText';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'User settings',
  };

  state = {
    userData: {},
  }

  componentDidMount() {
    this._retrieveData()
  }

  _retrieveData = async () => {
    let userData = await AsyncStorage.getItem('values')
    userData = JSON.parse(userData)
    await this.setState({ userData: userData })
  };

  _resetStorage = async (values) => {
    await AsyncStorage.clear();
  }

  _logOut = async (values) => {
    await AsyncStorage.setItem('userToken', 'false')

    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          <MonoText>Username: {this.state.userData.username}</MonoText>
          <MonoText>Name: {this.state.userData.name}</MonoText>
          <MonoText>Password: {this.state.userData.password}</MonoText>
          <MonoText>Email: {this.state.userData.email}</MonoText>

          <StyledButton title="Log Out" handler={this._logOut} />
          <StyledButton title="Reset All" handler={this._resetStorage} />
        </View>
        <ExpoConfigView />
      </ScrollView>
    );
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
});
