import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { color } from '../../configs/constants'

export default function CustomButton({ onPress, name }) {
     return (
          <View>
               <TouchableOpacity style={{ height: verticalScale(50), width: '100%', borderColor: color.primary,borderRadius:8,padding:8,borderWidth:1,justifyContent:'center',alignItems:'center' ,backgroundColor:color.primary}} onPress={onPress}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:moderateScale(15)}}>{name}</Text>
               </TouchableOpacity>
          </View>
     )
}