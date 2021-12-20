import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import TabContent from './TabContent';

const Tabs = ({children, headers, initiaTab, setView}) => {
  const [active, setActive] = useState({});
  useEffect(() => {
    setActive(headers[initiaTab]);
    setView(headers[initiaTab]);
  }, [initiaTab]);

  const RenderHeader = () => {
    return (
      <View style={styles.btnContainer}>
        {headers.map(item => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log('____ITEM', item);
                setActive(item);
                setView(item);
              }}
              style={[styles.btnBox]}>
              <Text style={styles.btnText}>{item.text}</Text>
              {active && active.tab === item.tab && (
                <View style={styles.borderBar} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <RenderHeader />

      {children}
    </View>
  );
};

export {Tabs, TabContent};
