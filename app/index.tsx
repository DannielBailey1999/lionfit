
import { Text, View, StyleSheet, FlatList} from "react-native";
import FoodListItem from "../src/components/foodListItem";



const foodItems = [
  {label: "Pizza", cal: 75, brand: 'Dominoes'}, 
  {label: "Apple", cal: 75, brand: 'generic'},
  {label: "Chocolate", cal: 75, brand: 'generic'},
  {label: "Candy", cal: 100, brand: 'generic'},
  {label: "Condoms", cal: 1, brand: 'generic'},

];
export default function Index() {
  return (
    <View
      style={styles.container}>
        {/* Food View Item  */}
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
    justifyContent: "center",
    padding: 10,
    gap: 5,
  },

})
