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

const Button = ({
  text,
  icon,
  loading,
  disabled,
  onPress = () => { },
  additionalStyle = {},
  type = 'primary',
  ...props
}) => {
  
  return (
    <TouchableOpacity
    disabled={disabled}
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
