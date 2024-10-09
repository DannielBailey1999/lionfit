import { Text, View, StyleSheet} from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "expo-router";

// Define the type for the item
interface FoodItem {
    food: {
      label: string;
      nutrients: {
        ENERC_KCAL: number; // Calories in kilocalories
      };
      brand: string; // Add the brand field here
      foodId: string;
    };
  }


  const mutation = gql`mutation MyMutation($food_id: String!, $kcal: Int!, $label: String!, $user_id: String!) {
  insertFood_log(food_id: $food_id, kcal: $kcal, label: $label, user_id: $user_id) {
    created_at
    food_id
    id
    kcal
    label
    user_id
  }
}`;

const FoodListItem = ({ item }: { item: FoodItem })=> {
  const [logFood, {data, loading, error}] = useMutation(mutation, {
    refetchQueries: ['foodLogsForDate']
  });
  const router = useRouter()
  const onPlusPress = async () => {
    await logFood({
      variables: {
        "food_id": item.food.foodId,
        "kcal": item.food.nutrients.ENERC_KCAL, 
        "label": item.food.label,
        "user_id": "danniel",
      },
    });
    router.back();
  };
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
        <EvilIcons 
        onPress={onPlusPress}
        name="plus" size={28} color="royalblue" />
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