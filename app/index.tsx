import { Link } from "expo-router";
import { Text, View, StyleSheet} from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FoodListItem from "../src/components/foodListItem";

export default function Index() {
  return (
    <View
      style={styles.container}>
        {/* Food View Item  */}
      <FoodListItem item={{label: "Pizza", cal: 75, brand: 'Dominoes'}}/>
      <FoodListItem item={{label: "Apple", cal: 75, brand: 'generic'}}/>
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
