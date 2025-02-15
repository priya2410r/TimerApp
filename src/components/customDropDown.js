import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { color } from '../../configs/constants';
import { moderateScale } from 'react-native-size-matters';



const CustomDropdown = ({ data, selectedValue, onChange, label }) => {

  return (
    <View style={styles.container}>
      <Text style={{ marginVertical: 10, color: color.primary, fontWeight: 'bold', fontSize: moderateScale(15) }}>{label}</Text>

      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select a category"
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}  // ✅ Fix for text visibility
        value={selectedValue}
        onChange={item => onChange(item.value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //     padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#1C274C',
  },
  dropdown: {
    height: 50,
    borderColor: '#1C274C',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  placeholderStyle: {
    color: 'gray',  // ✅ Make placeholder text visible
    fontSize: 16,
  },
  selectedTextStyle: {
    color: '#000',  // ✅ Ensure selected text is visible
    fontSize: 16,
  },
});

export default CustomDropdown;