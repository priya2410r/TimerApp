import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import BackIcon from '../images/backIcon'
import { color } from '../../configs/constants'

export default function Header({ navigation, name, isBack }) {
     return (
          <View style={{ height: verticalScale(60), width: '100%', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.6, borderColor: 'gray', paddingHorizontal: 10 }}>
               {!isBack && <TouchableOpacity style={{ position: 'absolute', zIndex: 100, left: 20 }} onPress={() => navigation.goBack()}>
                    <BackIcon />
               </TouchableOpacity>
               }
               <View style={{ width: '50%', alignItems: 'flex-end' }}>
                    <Text style={{ color: color.primary, fontWeight: 'bold', fontSize: moderateScale(18) }}>{name}</Text>

               </View>
               <TouchableOpacity style={{ width: '40%', alignItems: 'flex-end' }} onPress={() => navigation.navigate('History')}>
                    <Text style={{ color: color.primary, fontWeight: '500', fontSize: moderateScale(15) }}>History</Text>
               </TouchableOpacity>

          </View>
     )
}