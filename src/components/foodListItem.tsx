import { Text, View, StyleSheet} from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';

// Define the type for the item
// Define the type for the item
interface FoodItem {
    food: {
      label: string;
      nutrients: {
        ENERC_KCAL: number; // Calories in kilocalories
      };
      brand: string; // Add the brand field here
    };
  }


const FoodListItem = ({ item }: { item: FoodItem })=> {
  return (
    <View 
      style={styles.container}>
          <View style={{flex: 1, gap: 5}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {item.food.label}
            </Text>
          <Text style={{color: 'dimgray'}}>
            {item.food.nutrients.ENERC_KCAL} cal, {item.food.brand || 'Unknown brand'}
            </Text>
          </View>
        <EvilIcons name="plus" size={28} color="royalblue" />
        </View>
      
  );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gainsboro', 
        padding: 10, 
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

})

export default FoodListItem;