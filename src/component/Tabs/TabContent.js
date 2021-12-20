import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';

const TabContent = ({children, tab, view}) => {
  const [active, setActive] = useState({});
  console.log('_____DATA', view);
  return tab === view.tab ? (
    <View style={styles.tabContent}>{children}</View>
  ) : null;
};

export default TabContent;
