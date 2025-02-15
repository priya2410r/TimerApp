import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AddIcon from '../../images/addIcon';
import RenderHome from './renderHome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TimerContext } from '../../components/timerContext';
import Header from '../../components/header';
import { useIsFocused } from "@react-navigation/native";
import DeleteIcon from '../../images/deleteIcon';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { color } from '../../../configs/constants';
import CategoryItem from './category';



const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const categories = [
    { label: 'Workout', value: 'workout' },
    { label: 'Study', value: 'study' },
    { label: 'Break', value: 'break' },
  ];
  const [data, setData] = useState([])
  const [expandedCategory, setExpandedCategory] = useState(null);

  const loadTimers = async () => {
    const storedTimers = await AsyncStorage.getItem('timers');
    console.log(storedTimers, "storedTimers")
    if (storedTimers) {
      setData(JSON.parse(storedTimers));
    }
  };

  const toggleCategory = (value) => {
    setExpandedCategory(expandedCategory === value ? null : value);
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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header navigation={navigation} name={"Timers"} isBack />
      <View style={{ padding: 20 }}>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between',marginBottom:20 }}>
          <Text>Categories</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {data.length > 0 &&
              <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={deleteTimer}>
                <DeleteIcon />
              </TouchableOpacity>
            }
            <TouchableOpacity style={{}} onPress={() => navigation.navigate("AddTimer")}>
              <AddIcon />
            </TouchableOpacity>
          </View>

        </View>
        <FlatList
        data={categories}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            expandedCategory={expandedCategory}
            toggleCategory={toggleCategory}
            data={data}
            setData={setData}
          />
        )}      />
       

      </View>
    </View>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  logo: {
    width: verticalScale(300),
    height: verticalScale(300),
    top: 50
  },
})