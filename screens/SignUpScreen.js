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
import { StyledButton } from '../components/StyledButton';

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  };

  _signUp = async (values, response) => {
    try {
      await AsyncStorage.setItem('values', JSON.stringify(values))
      this.props.navigation.navigate('Login')
    } catch (error) {
      Alert.alert('Error!', error.toString())
    }
  };

  // error link: http://www.mocky.io/v2/5c7ef8743300005500847f4b
  // success link: http://www.mocky.io/v2/5c7ef89f3300005500847f4e
  _onSubmit = async (values) => {
    try {
      let response = await fetch('http://www.mocky.io/v2/5c7ef89f3300005500847f4e')
      let responseJson = await response.json()

      if (responseJson.result != 'success') throw "Server error"
      this._signUp(values, responseJson)
    } catch (error) {
      Alert.alert('Error!', error.toString())
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Formik
        initialValues={{ email: '' }}
        onSubmit={values => this._onSubmit(values)}
        >
        {props => (
          <View>
            <TextInput style={styles.input}
            placeholder="Username"
            textContentType="username"
            onChangeText={props.handleChange('username')}
            onBlur={props.handleBlur('username')}
            value={props.values.username}
            />
            <TextInput style={styles.input}
            placeholder="Full Name"
            textContentType="name"
            onChangeText={props.handleChange('name')}
            onBlur={props.handleBlur('name')}
            value={props.values.name}
            />
            <TextInput style={styles.input}
            placeholder="Password"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={props.handleChange('password')}
            onBlur={props.handleBlur('password')}
            value={props.values.password}
            />
            <TextInput style={styles.input}
            placeholder="Email"
            textContentType="emailAddress"
            keyboardType="email-address"
            onChangeText={props.handleChange('email')}
            onBlur={props.handleBlur('email')}
            value={props.values.email}
            />
            <StyledButton title="Sign Up" handler={props.handleSubmit} />
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
  input: {
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
});
