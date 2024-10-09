
import { Text, View, StyleSheet, FlatList, TextInput, Button, ActivityIndicator} from "react-native";
import FoodListItem from "../src/components/foodListItem";
import { useState } from "react";
import {gql, useLazyQuery} from "@apollo/client";



const query = gql`query MyQuery($ingr: String = "") {
  search(ingr: $ingr) {
    hints {
      food {
        label
        foodId
        nutrients {
          ENERC_KCAL
        }
        brand
      }
    }
  }
}`;


export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [doSearch, { data, loading, error }] = useLazyQuery(query, { variables: { ingr: search } });

  const performSearch = () => {
    doSearch({ variables: { ingr: search } });
    setSearch('');
  }

  // if (loading){
  //   return <ActivityIndicator />;

  // }

  if (error) {
    console.error('Error fetching data:', error);
    return <Text>Failed tO SEARCH</Text>;
    
  }

  console.log(JSON.stringify(data, null, 2));

  const items = data?.search?.hints || [];
  
  const addToLog = (item: any) => {
    console.log(`Added ${item.food.label} to the log`); // Replace this with actual log functionality
  };


  return (
    <View
      style={styles.container}>
        {/* Food View Item  */}
        <TextInput 
        value = {search}
        onChangeText= {setSearch}
        placeholder="Search..." 
        style={styles.input}/>
        {search && <Button title="Search" onPress={performSearch}/>}

        {loading && <ActivityIndicator/>}
      <FlatList 
      data = {items}
      renderItem={({item}) => <FoodListItem item={item} onAdd={() => addToLog(item)} />}
      keyExtractor={(item) => item.food.foodId}
      ListEmptyComponent={() => <Text>Search a food</Text>}
      contentContainerStyle={{gap: 5}}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 5,
  },
  input: {
    backgroundColor: '#F2F2F2',
    padding: 10, 
    borderRadius: 10, 
  },

})
