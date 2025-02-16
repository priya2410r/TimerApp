import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useContext } from 'react'
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDropdown from '../../components/customDropDown';
import { TimerContext } from '../../components/timerContext';
import Header from '../../components/header';




export default function AddTimerScreen({ navigation }) {
  const [timerName, setTimerName] = useState("")
  const [duration, setDuration] = useState(5)
  const [selectedValue, setSelectedValue] = useState(null);


  const categories = [
    { label: 'Workout', value: 'workout' },
    { label: 'Study', value: 'study' },
    { label: 'Break', value: 'break' },
  ];



  const menus = [{
    name: "Timer Name",
    placeholder: "Enter timer name",
    value: timerName,
    onchangeValue: setTimerName,
    isInput: true
  }, {
    name: "Duration",
    placeholder: "Enter Duration in seconds",
    value: duration,
    onchangeValue: setDuration,
    isInput: true,
    type: 'numeric'
  }, {
    name: "Select Category",
    placeholder: "Enter timer name",
    value: "",
    onchangeValue: "",
    isInput: false
  }]


  
  const saveTimer = async () => {
    console.log("Updated Timers Call");

    if (!timerName || !duration || !selectedValue) {
      return alert("Please fill all fields");
    }

    const newTimer = {
      id: Date.now().toString(),
      name: timerName,
      duration: parseInt(duration),
      category: selectedValue,
      remainingTime: parseInt(duration),
      status: "Paused",
    };


    try {
      const key = `timers_${selectedValue}`;
      const storedTimers = await AsyncStorage.getItem(key);
      const existingTimers = storedTimers ? JSON.parse(storedTimers) : [];

      const updatedTimers = [...existingTimers, newTimer];

      await AsyncStorage.setItem(key, JSON.stringify(updatedTimers));


      setTimerName("");
      setDuration("");
      setSelectedValue(null);

      navigation.goBack();
    } catch (error) {
      console.error("Error saving timer:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header navigation={navigation} name={"Add Timer"} />

      {
        menus.map((item) => {
          return (
            <View style={{ padding: 10 }} key={item.name}>
              {item.isInput ?
                <CustomInput type={item.type} label={item.name} placeholder={item.placeholder} value={item.value} onChangeText={item.onchangeValue} />
                :
                <CustomDropdown
                  data={categories}
                  selectedValue={selectedValue}
                  onChange={setSelectedValue}
                  label={item.name}

                />
              }

            </View>
          )
        })
      }
      <View style={{ position: 'absolute', bottom: 30, paddingHorizontal: 10, width: '100%' }}>
        <CustomButton name="Create Timer" onPress={saveTimer} />
      </View>
    </View>
  )
}