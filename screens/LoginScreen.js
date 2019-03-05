import React from 'react';
import {
  Alert,
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { Formik } from 'formik';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
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

  _signIn = async (values, response) => {
    if (values.password === this.state.userData.password
     && values.username === this.state.userData.username) {
      await AsyncStorage.setItem('userToken', 'true')
      this.props.navigation.navigate('Settings')
    } else Alert.alert('Auth error');
  };

  _onSubmit(values) {
    return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => this._signIn(values, response))
    .catch((error) => {
      Alert.alert('Error!', error.toString());
    });
  };

  _resetStorage = async (values) => {
    await AsyncStorage.clear();
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text>Username: {this.state.userData.username}</Text>
        <Text>Name: {this.state.userData.name}</Text>
        <Text>Password: {this.state.userData.password}</Text>
        <Text>Email: {this.state.userData.email}</Text>
        <Formik
        initialValues={{ email: '' }}
        onSubmit={values => this._onSubmit(values)}
        >
        {props => (
          <View>
            <TextInput
            placeholder="Username"
            textContentType="username"
            onChangeText={props.handleChange('username')}
            onBlur={props.handleBlur('username')}
            value={props.values.username}
            />
            <TextInput
            placeholder="Password"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={props.handleChange('password')}
            onBlur={props.handleBlur('password')}
            value={props.values.password}
            />
            <Button onPress={props.handleSubmit} title="Login" />
            <Button onPress={this._resetStorage} title="Reset" />
          </View>
        )}
        </Formik>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    padding: 15,
  },
});
