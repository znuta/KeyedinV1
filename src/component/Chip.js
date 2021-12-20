import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
// import {styles} from 'styled-system';
import {MaterialIcons, FontAwesome, AntDesign} from '@expo/vector-icons';
import {colors, wp} from '../config/variables';

const Chip = ({textColor, text, icon = 'close', style, onPress = () => {}}) => {
  const SkillBadge = styled.View`
    margin-vertical: 5px;
    ${'' /* background-color: rgba(255, 255, 255, 0.4); */}
    background-color: ${colors.green};
    padding-horizontal: ${wp('1%')};
    padding-vertical: ${wp('1%')};
    border-radius: 50;

    flex-direction: row;
    align-items: center;
  `;

  const SkillText = styled.Text`
    font-size: ${wp('2.5%')};
    color: ${colors.white};
  `;

  return (
    <SkillBadge style={[styles.container, style.container]}>
      <SkillText style={[styles.text, style.text]}>{text}</SkillText>
      <TouchableOpacity onPress={onPress} style={styles.iconBox}>
        <MaterialIcons name={icon} style={[styles.icon, style.icon]} />
      </TouchableOpacity>
    </SkillBadge>
  );
};

export default Chip;

const styles = StyleSheet.create({
  iconBox: {
    padding: 1,
    backgroundColor: colors.white,
    borderRadius: 50,
    marginHorizontal: wp('1%'),
  },
  icon: {
    fontSize: wp('2%'),
  },
});
