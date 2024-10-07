import { Text, View, StyleSheet} from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';

// Define the type for the item
interface FoodItem {
  label: string;
  cal: number;
  brand: string;
  // Add other properties based on your use case
}


const FoodListItem = ({ item }: { item: FoodItem })=> {
  return (
    <View 
      style={{backgroundColor: 'gainsboro', 
        padding: 10, 
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        }}>
          <View style={{flex: 1, gap: 5}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.label}</Text>
          <Text style={{color: 'dimgray'}}>{item.cal} cal, {item.brand}</Text>
          </View>
        <EvilIcons name="plus" size={28} color="royalblue" />
        </View>
      
  );
};

export default FoodListItem;