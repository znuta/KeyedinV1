import React from 'react';
import {StyleSheet, View} from 'react-native';

import {hp, wp, colors} from '../config/variables';

function ListItemSeparator({style}) {
  return <View style={[styles.separator, style]} />;
}

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.light,
    marginVertical: hp('1%'),
    borderWidth: wp('0.1%'),
    borderColor: '#707070',
  },
});

export default ListItemSeparator;
