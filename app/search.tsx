
import { Text, View, StyleSheet, FlatList, TextInput, Button, ActivityIndicator,} from "react-native";
import FoodListItem from "../src/components/foodListItem";
import { useState } from "react";
import {gql, useLazyQuery} from "@apollo/client";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



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

const foodItems = [
  {label: "Pizza", cal: 75, brand: 'Dominoes'}, 
  {label: "Apple", cal: 75, brand: 'generic'},
  {label: "Chocolate", cal: 75, brand: 'generic'},
  {label: "Candy", cal: 100, brand: 'generic'},
  {label: "Condoms", cal: 1, brand: 'generic'},

];
export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [scannerEnabled, setScannerEnabled] = useState(false);

  const [doSearch, { data, loading, error }] = useLazyQuery(query, { variables: { ingr: search } });

  const performSearch = () => {
    doSearch({ variables: { ingr: search } });
    setSearch('');
  }

  //request only if permission isnt granted then we can ask again 
  // if (loading){
  //   return <ActivityIndicator />;

  // }

  if (error) {
    console.error('Error fetching data:', error);
    return <Text>Failed tO SEARCH</Text>;
    
  }



  const items = data?.search?.hints || [];


  
  return (
    <View
      style={styles.container}>
        {/* search/input view */}
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <TextInput 
        value = {search}
        onChangeText= {setSearch}
        placeholder="Search..." 
        style={styles.input}/>
        
        </View>
        
        {search && <Button title="Search" onPress={performSearch}/>}

        {loading && <ActivityIndicator/>}
      <FlatList 
      data = {items}
      renderItem={({item}) => <FoodListItem item = {item} />}
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
    backgroundColor: 'white', 
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 20,
    flex: 1,
  },

})