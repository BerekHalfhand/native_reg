import React from 'react';
import {
  Alert,
  AsyncStorage,
  ActivityIndicator,
  Button,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { Formik } from 'formik';
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField } from 'react-native-materialui-textfield';
import { StyledButton } from '../components/StyledButton';

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
      this.props.navigation.navigate('App')
    } else Alert.alert('Auth error');
  };

  // error link: http://www.mocky.io/v2/5c7ef8743300005500847f4b
  // success link: http://www.mocky.io/v2/5c7ef89f3300005500847f4e
  _onSubmit = async (values) => {
    try {
      let response = await fetch('http://www.mocky.io/v2/5c7ef89f3300005500847f4e');
      let responseJson = await response.json();

      if (responseJson.result != 'success') throw "Server error"
      this._signIn(values, responseJson)
    } catch (error) {
      Alert.alert('Error!', error.toString());
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset = {100} // adjust the value here if you need more padding
        style = {{ flex: 1 }}
        behavior = "padding" >

        <ScrollView contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='always' >
          <Formik
          onSubmit={(values, actions) => {
            this._onSubmit(values)
            .then(() => actions.setSubmitting(false))
          }}
          >
          {props => (
            <View>
            <TextField style={styles.input}
              label="Username"
              textContentType="username"
              onChangeText={props.handleChange('username')}
              onBlur={props.handleBlur('username')}
              value={props.values.username}
              />

              <PasswordInputText style={styles.input}
                  value={props.values.password}
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
              />
              {props.isSubmitting ? (
                <ActivityIndicator />
              ) : (
                <StyledButton title="Login" handler={props.handleSubmit} />
              )}
            </View>
          )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 15,
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
  },
});
