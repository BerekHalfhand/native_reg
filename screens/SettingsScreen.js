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
          <Text>Username: {this.state.userData.username}</Text>
          <Text>Name: {this.state.userData.name}</Text>
          <Text>Password: {this.state.userData.password}</Text>
          <Text>Email: {this.state.userData.email}</Text>

          <Button onPress={this._logOut} title="Log Out" />
          <Button onPress={this._resetStorage} title="Reset All" />
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
  },
});
