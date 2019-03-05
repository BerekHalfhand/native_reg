import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Touchable from 'react-native-platform-touchable';

export const StyledButton = (props) => (
  <Touchable
    onPress={() => props.handler()}
    style={styles.button}
    background={Touchable.Ripple('white')}>
    <Text>{props.title.toUpperCase()}</Text>
  </Touchable>
)

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff9800',
    padding: 15,
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    fontWeight: 'bold',

  },
});
