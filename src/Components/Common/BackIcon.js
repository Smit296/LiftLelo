import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BackIcon = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.icon}>〈</Text>
      <Text style={styles.text}>Back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  icon: {
    fontSize: 18,
    color: 'white',
    right:24
  },
  text: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
    right:14
  },
});

export default BackIcon;