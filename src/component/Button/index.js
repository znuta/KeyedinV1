import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import styles, { typeStyle } from './styles';

const Button = props => {
  const {
    text,
    icon,
    onPress = () => { },
    additionalStyle = {},
    type = 'primary',
  } = props;
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      style={[styles.button, typeStyle[type]?.button, additionalStyle.button]}>
      <Text style={[styles.text, typeStyle[type]?.text, additionalStyle.text]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
