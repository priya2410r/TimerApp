import React, { useState } from 'react';
import { View, Text,TouchableOpacity, FlatList } from 'react-native';
import AddIcon from '../../images/addIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/header';
import DeleteIcon from '../../images/deleteIcon';
import CategoryItem from './category';



const HomeScreen = ({ navigation }) => {
  const categories = [
    { label: 'Workout', value: 'workout' },
    { label: 'Study', value: 'study' },
    { label: 'Break', value: 'break' },
  ];
  const [data, setData] = useState([])
  const [expandedCategory, setExpandedCategory] = useState(null);


  const loadTimersByCategory = async (category) => {
    try {
      const key = `timers_${category}`;
      const storedTimers = await AsyncStorage.getItem(key);
      if (storedTimers) {
        console.log(storedTimers, "storedTimers")
        const parsedTimers = JSON.parse(storedTimers);
        setData(parsedTimers);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error loading timers:", error);
    }
  };


  const toggleCategory = (value) => {
    const newCategory = expandedCategory === value ? null : value;
    setExpandedCategory(newCategory);
    if (newCategory) {
      loadTimersByCategory(newCategory);
    } else {
      setData([]);
    }
  };

  const deleteTimer = async () => {
    try {
      const categories = ["study", "workout", "break"];
      await Promise.all(categories.map(category => AsyncStorage.removeItem(`timers_${category}`)));
      setData([])
      console.log("All categories removed successfully.");
    } catch (error) {
      console.error("Error removing all categories:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header navigation={navigation} name={"Timers"} isBack />
      <View style={{ padding: 20 }}>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
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
              navigation={navigation}
            />
          )} />


      </View>
    </View>
  );
};

export default HomeScreen;
