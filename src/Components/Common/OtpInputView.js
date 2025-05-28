import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const OTPInputBox = ({ value, onChangeText, inputRef, autoFocus }) => {
  return (
    <TextInput
      ref={inputRef}
      style={styles.otpInput}
      keyboardType="number-pad"
      maxLength={1}
      value={value}
      onChangeText={onChangeText}
      autoFocus={autoFocus}
    />
  );
};

export default OTPInputBox;

const styles = StyleSheet.create({
  otpInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 6,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
});
