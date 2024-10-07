
import { Text, View, StyleSheet, FlatList, TextInput, Button} from "react-native";
import FoodListItem from "../src/components/foodListItem";
import { useState } from "react";

const foodItems = [
  {label: "Pizza", cal: 75, brand: 'Dominoes'}, 
  {label: "Apple", cal: 75, brand: 'generic'},
  {label: "Chocolate", cal: 75, brand: 'generic'},
  {label: "Candy", cal: 100, brand: 'generic'},
  {label: "Condoms", cal: 1, brand: 'generic'},

];
export default function Index() {
  const [search, setSearch] = useState('');
  const performSearch = () => {
    console.warn('Searching for: ', search)
    setSearch('');
  }
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

      <FlatList 
      data = {foodItems}
      renderItem={({item}) => <FoodListItem item = {item} />}
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
