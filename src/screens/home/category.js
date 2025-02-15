import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import React from 'react'
import RenderHome from './renderHome';
import HistoryIcon from '../../images/historyIcon';

export default function CategoryItem({ item, expandedCategory, toggleCategory, data, setData, navigation }) {
     const filteredTimers = data.filter(timer => timer.category === expandedCategory);
     console.log(filteredTimers, "vasjhcjsg")

     return (
          <View style={{ marginBottom: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}>
               <TouchableOpacity
                    style={{ padding: 15, backgroundColor: '#f0f0f0', flexDirection: 'row', justifyContent: 'space-between' }}
                    onPress={() => toggleCategory(item.value)}
               >
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.label}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("History", { type: item.value })}>
                         <HistoryIcon />
                    </TouchableOpacity>
               </TouchableOpacity>
               {expandedCategory === item.value && (
                    <View>
                         {filteredTimers.map((item) => {
                              return (
                                   <RenderHome item={item} data={data} setData={setData} />
                              )
                         })}
                    </View>
               )}
          </View>

     )
}