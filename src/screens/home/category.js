import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import React from 'react'
import RenderHome from './renderHome';

export default function CategoryItem({item,expandedCategory,toggleCategory,data,setData}) {
     const filteredTimers = data.filter(timer => timer.category === expandedCategory);
     console.log(filteredTimers,"vasjhcjsg")

  return (
          <View style={{ marginBottom: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}>
            <TouchableOpacity
              style={{ padding: 15, backgroundColor: '#f0f0f0' }}
              onPress={() => toggleCategory(item.value)}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.label}</Text>
            </TouchableOpacity>
            {expandedCategory === item.value && (
             <View>
               {filteredTimers.map((item)=>{
                    return(
                         <RenderHome item={item} data={data} setData={setData} />
                    )
               })}
               </View>
            )}
          </View>
        
  )
}