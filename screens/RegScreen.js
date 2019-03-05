import React from 'react';
import {
  Alert,
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { Formik } from 'formik';

export default class RegScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _onPressRegister(values) {
    return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      Alert.alert(responseJson.movies[0].title, values.email)
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Formik
      initialValues={{ email: '' }}
      onSubmit={values => this._onPressRegister(values)}
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
          placeholder="Full Name"
          textContentType="name"
          onChangeText={props.handleChange('name')}
          onBlur={props.handleBlur('name')}
          value={props.values.name}
          />
          <TextInput
          placeholder="Password"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={props.handleChange('password')}
          onBlur={props.handleBlur('password')}
          value={props.values.password}
          />
          <TextInput
          placeholder="Email"
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={props.handleChange('email')}
          onBlur={props.handleBlur('email')}
          value={props.values.email}
          />
          <Button onPress={props.handleSubmit} title="Register" />
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
    margin: 20,
    height: 20,
  },
  button: {
    margin: 20,
  },
});
