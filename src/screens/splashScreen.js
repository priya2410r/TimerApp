import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { color } from '../../configs/constants'

export default function SplashScreen({ navigation }) {
useEffect(() => {
  setTimeout(() => {
     navigation.navigate('Home')
  }, 2000);
}, [])

     return (
          <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
               <Text style={{color:color.primary,fontSize:moderateScale(20),fontWeight:'bold'}}>Welcome to the TimeMaster</Text>
               <Image
                    style={styles.logo}
                    source={{
                         uri: 'https://static.vecteezy.com/system/resources/thumbnails/009/300/790/small_2x/3d-rendering-of-time-management-illustration-png.png'
                    }}
               />
          </View>
     )
}



const styles = StyleSheet.create({
     logo: {
          width: verticalScale(300),
          height: verticalScale(300),
          top: 50,
          borderRadius:20
     },
})