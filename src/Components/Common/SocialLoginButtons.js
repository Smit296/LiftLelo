import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SocialLoginButtons = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.iconButton, { backgroundColor: '#3b5998' }]}>
        <FontAwesome name="facebook" size={20} color="white" />
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.iconButton, { backgroundColor: '#1da1f2' }]}>
        <Entypo name="twitter" size={20} color="white" />
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.iconButton, { backgroundColor: '#db4437' }]}>
        <AntDesign name="google" size={20} color="white" />
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.iconButton, { backgroundColor: '#000000' }]}>
        <Ionicons name="logo-apple" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems:'center',
    marginLeft:'10%'
    // justifyContent: 'space-around',
  },
  iconButton: {
    height: 40,
    width: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

export default SocialLoginButtons;
