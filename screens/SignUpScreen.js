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
import { StyledButton } from '../components/StyledButton';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .label('Username')
    .required()
    .min(3, 'Username is too short'),
  email: yup
    .string()
    .label('Email')
    .email()
    .required(),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(5, 'Password is too short')
});


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
      <KeyboardAvoidingView
        keyboardVerticalOffset = {100} // adjust the value here if you need more padding
        style = {{ flex: 1 }}
        behavior = "padding" >

        <ScrollView contentContainerStyle={styles.contentContainer}>
        <Formik
        initialValues={{ email: '' }}
        onSubmit={(values, actions) => {
          this._onSubmit(values)
          .then(() => actions.setSubmitting(false))
        }}
        validationSchema={validationSchema}
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
            <Text style={{ color: 'red' }}>
              {props.touched.username && props.errors.username}
            </Text>

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
            secureTextEntry
            onChangeText={props.handleChange('password')}
            onBlur={props.handleBlur('password')}
            value={props.values.password}
            />
            <Text style={{ color: 'red' }}>
              {props.touched.password && props.errors.password}
            </Text>

            <TextInput style={styles.input}
            placeholder="Email"
            textContentType="emailAddress"
            keyboardType="email-address"
            onChangeText={props.handleChange('email')}
            onBlur={props.handleBlur('email')}
            value={props.values.email}
            />
            <Text style={{ color: 'red' }}>
              {props.touched.email && props.errors.email}
            </Text>

            {props.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <StyledButton title="Sign Up" handler={props.handleSubmit} />
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
    backgroundColor: '#fff',
    padding: 15,
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
  },

  contentContainer: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 15,
  },
});
