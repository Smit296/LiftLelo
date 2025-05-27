import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

const CheckBox = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {checked ? (
        <View style={styles.checkedBox}>
          <View style={styles.innerCheck} />
        </View>
      ) : (
        <View style={styles.uncheckedBox} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uncheckedBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#4169E1',
    borderRadius: 4,
  },
  checkedBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#4169E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCheck: {
    width: 10,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 1,
  },
});

export default CheckBox;