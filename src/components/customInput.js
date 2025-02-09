import { View, Text , TextInput,StyleSheet} from 'react-native'
import React from 'react'
import { color } from '../../configs/constants'
import { moderateScale, verticalScale } from 'react-native-size-matters'

export default function CustomInput({label,value,onChangeText,placeholder,type}) {
  return (
    <View>
      <Text style={{marginVertical:10,color:color.primary,fontWeight:'bold',fontSize:moderateScale(15)}}>{label}</Text>
      <TextInput
          style={styles.input}
          onChangeText={(text)=>onChangeText(text)}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="black"
          keyboardType={type||'default'}
        />
    </View>
  )
}

const styles = StyleSheet.create({
     input:{
      height: verticalScale(50),
      borderColor: color.primary,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      backgroundColor: 'white',     }
})