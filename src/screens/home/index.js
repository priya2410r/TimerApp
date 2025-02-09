import React,{useState,useEffect} from 'react';
import { View, Text, Image, TouchableOpacity,FlatList,StyleSheet} from 'react-native';
import AddIcon from '../../images/addIcon';
import RenderHome from './renderHome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TimerContext } from '../../components/timerContext';
import Header from '../../components/header';
import { useIsFocused } from "@react-navigation/native";
import DeleteIcon from '../../images/deleteIcon';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { color } from '../../../configs/constants';



const HomeScreen = ({ navigation }) => {
     const isFocused = useIsFocused();

//   const { timers, setTimers } = useContext(TimerContext);
const [data, setData] = useState([])
     const loadTimers = async () => {
          const storedTimers = await AsyncStorage.getItem('timers');
          console.log(storedTimers,"storedTimers")
          if (storedTimers) {
               setData(JSON.parse(storedTimers));
          }
        };
        useEffect(() => {
          if (isFocused) {
            loadTimers();
          }
        }, [isFocused]);
        
        const deleteTimer = async () => {
          try {
            await AsyncStorage.removeItem("timers");
            setData([]); // Clear local state as well
          } catch (error) {
            console.error("Error clearing timer:", error);
          }
        };
     return (
          <View style={{ flex: 1,backgroundColor:'white'}}>
               <Header navigation={navigation} name={"Timers"} isBack/>
               <View style={{padding:20}}>
               <View style={{ width: '100%',flexDirection:'row',justifyContent:'space-between' }}>
               <Text>Categories</Text>
             <View style={{flexDirection:'row',alignItems:'center'}}>
               {data.length > 0 &&
             <TouchableOpacity style={{ marginHorizontal:10 }} onPress={deleteTimer}>
               <DeleteIcon />
                    </TouchableOpacity>
}
                    <TouchableOpacity style={{  }} onPress={() => navigation.navigate("AddTimer")}>
                         <AddIcon />
                    </TouchableOpacity>
             </View>
                   
               </View>
               {data.length>0? <FlatList
                    data={data} // List Data
                    keyExtractor={(item) => item.id} // Unique key for each item
                    renderItem={({ item }) => <RenderHome item={item} data={data} setData={setData}/>} 
                    style={{marginBottom:80}}
                    inverted
               />: 
               <View style={{alignItems:'center'}}>     
               <Image
               style={styles.logo}
               source={{
                 uri: 'https://static.vecteezy.com/system/resources/thumbnails/009/300/790/small_2x/3d-rendering-of-time-management-illustration-png.png'}}
             />
                     <Text style={{color:color.primary,fontSize:moderateScale(15),fontWeight:'800',top:100}}>No Timers Available</Text>
                     </View>
             
       }
              
               </View>
          </View>
     );
};

export default HomeScreen;


const styles = StyleSheet.create({ 
     logo: {
     width: verticalScale(300),
     height: verticalScale(300),
     top:50
   },})