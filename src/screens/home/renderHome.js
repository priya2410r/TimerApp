import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { color } from '../../../configs/constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressBar from "react-native-progress/Bar";
import { truncateText } from '../../helpers/helper';
import DownArrowIcon from '../../images/downArrowIcon';
import UpArrow from '../../images/upArrowIcon';



export default function RenderHome({ item, data, setData }) {
  const [expandedId, setExpandedId] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [remainingTime, setRemainingTime] = useState(item.duration);


  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  const saveToHistory = async (timer) => {
    try {
      const historyEntry = {
        name: timer.name,
        duration: timer.duration,
        completedAt: new Date().toLocaleString(),
        category:timer.category
      };

      const existingHistory = await AsyncStorage.getItem("history");
      const history = existingHistory ? JSON.parse(existingHistory) : [];

      history.push(historyEntry);

      await AsyncStorage.setItem("history", JSON.stringify(history));
    } catch (error) {
      console.error("Error saving to history:", error);
    }
  };
  const updateTimer = async (id, action) => {
    let updatedTimers = data.map((timer) => {
      if (timer.id === id) {
        if (action === "start") {
          if (!intervalId) {
            const interval = setInterval(() => {
              setRemainingTime((prev) => {
                if (prev - 1 <= 0) {
                  clearInterval(interval);
                  setIntervalId(null);
                  saveToHistory(timer);
                  Alert.alert(item.name + " Timer completed");
                  return 0;
                }
                return prev - 1; // Decrease remaining time
              });
            }, 1000);
            setIntervalId(interval);
          }
          return { ...timer, status: "Started" };
        }
        if (action === "pause") {
          if (intervalId) clearInterval(intervalId);
          setIntervalId(null);
          return { ...timer, status: "Paused" };
        }
        if (action === "reset") {
          if (intervalId) clearInterval(intervalId);
          setIntervalId(null);
          setRemainingTime(item.duration); // Reset countdown to duration
          return { ...timer, status: "Reset" };
        }
      }
      return timer;
    });

    await AsyncStorage.setItem("timers", JSON.stringify(updatedTimers));
    setData(updatedTimers);
  };
  const progress = remainingTime / item.duration;
  const getStatusColor = (status) => {
    switch (status) {
      case "Started":
        return "green"; // Green for running timers
      case "Paused":
        return "red"; // Orange for paused timers
      case "Reset":
        return "gray"; // Red for reset timers
      default:
        return "gray"; // Default color
    }
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.header} >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: "40%" }}>
            <Text style={{ ...styles.title }}>{truncateText(item.name, 5)}</Text>

            <Text style={styles.subtitile}>{item.category}</Text>

          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => updateTimer(item.id, "start")} style={{ ...styles.button, borderColor: 'green' }}>
              <Text style={{ color: 'green', fontWeight: 'bold' }}>S</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateTimer(item.id, "pause")} style={{ ...styles.button, borderColor: 'red' }}>
              <Text style={{ color: 'red', fontWeight: 'bold' }}>P</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateTimer(item.id, "reset")} style={{ ...styles.button }}>
              <Text style={{ color: 'gray', fontWeight: 'bold' }}>R</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <TouchableOpacity onPress={() => toggleExpand(item.id)} style={{ justifyContent: 'center' }}>
          {expandedId === item.id ? <UpArrow /> :
            <DownArrowIcon />
          }
        </TouchableOpacity> */}
      </View>

        <View style={styles.content}>
          <Text style={{ ...styles.details, color: getStatusColor(item.status) }}>{item.status}</Text>
          <View style={{ flexDirection: 'row', top: 10, alignItems: 'center' }}>
            <ProgressBar progress={progress} width={290} height={10} color={getStatusColor(item.status)} style={{ height: 10 }} />
            <Text style={{ color: color.primary, left: 5 }}>{remainingTime + '/' + item.duration}</Text>
          </View>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 2,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal:10
  },
  header: {
    paddingVertical: 10,
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: color.primary
  }, subtitile: {
    fontSize: moderateScale(12),
    fontWeight: "300",
    color: color.primary
  },
  content: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  details: {
    fontSize: 16,
    color: "#555",
  },
  header: { flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 18, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "gray" },
  content: { marginTop: 10 },
  buttonContainer: { flexDirection: "row", left: 30, },
  button: { padding: 5, borderColor: "lightgray", marginRight: 5, borderRadius: 50, justifyContent: 'center', alignItems: 'center', height: verticalScale(30), width: moderateScale(35), borderWidth: 1 }
});