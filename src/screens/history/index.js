import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/header";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { color } from "../../../configs/constants";

const HistoryScreen = ({ navigation,route }) => {
  const [history, setHistory] = useState([]);
const {type}=route?.params
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem("history");
      if (storedHistory) {
        console.log(storedHistory, "storedHistory");
        
        const parsedHistory = JSON.parse(storedHistory);
        
        const filteredHistory = parsedHistory.filter((item) => item.category === type);
        
        console.log(filteredHistory, "histories");
        setHistory(filteredHistory);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem("history");
      setHistory([]); // Clear local state as well
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header name='Timer History' navigation={navigation} />

      {history.length > 0 ? (
        <>
          <FlatList
            data={history}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ padding: 10, borderBottomWidth: 1 }}>
                <Text>Timer Name: {item.name}</Text>
                <Text>Total Duration: {item.duration}s</Text>
                <Text>Completed At: {item.completedAt}</Text>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={clearHistory}
            style={{
              marginTop: 20,
              backgroundColor: "red",
              padding: 10,
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white" }}>Clear History</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://static.vecteezy.com/system/resources/thumbnails/009/300/790/small_2x/3d-rendering-of-time-management-illustration-png.png'
            }}
          />
          <Text style={{ color: color.primary, fontSize: moderateScale(15), fontWeight: '800', top: 100 }}>No history available</Text>
        </View>
      )}
    </View>
  );
};

export default HistoryScreen;


const styles = StyleSheet.create({
  logo: {
    width: verticalScale(300),
    height: verticalScale(300),
    top: 50
  },
})