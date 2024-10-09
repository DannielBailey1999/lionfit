import FoodListItem from "@/src/components/foodListItem";
import { gql, useQuery} from "@apollo/client";
import dayjs from "dayjs";
import { Link } from "expo-router"
import { useState } from "react";
import { View, Text, FlatList, Button, Pressable, StyleSheet, ActivityIndicator } from "react-native"
import FoodLogListItem from "@/src/components/foodLogListItem";
const query = gql`
query foodLogsForDate($date: Date!, $user_id: String!) {
  foodLogsForDate(date: $date, user_id: $user_id) {
    created_at
    food_id
    user_id
    label
    id
    kcal
  }
}
`;


  
  


  export default function HomeScreen() {
    const user_id = 'danniel'

    
    const {data, loading, error} = useQuery(query, {variables: 
        {date: dayjs().format('YYYY-MM-DD'), user_id,
        },
    });

    if (loading) {
        return <ActivityIndicator/>;
    }

    if (error) {
        return<Text>Failed to fetch data</Text>
    }

    console.log(data);

    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.subTitle}>Calories</Text>
          <Text>1770 - 360 = 1692</Text>
        </View>
        <View style={styles.headerRow}>
        <Text style={styles.headerRow}>Todays food log</Text>
        <Pressable>
            <Link href="/search">
              <Text style={{ color: 'blue' }}>Add Food</Text>
            </Link>
          </Pressable>
        </View>
        
  
  
        {/* Display the food list from the search */}
        <FlatList
          data={data.foodLogsForDate}
          keyExtractor={(item) => item.label}
          renderItem={({ item }) => <FoodLogListItem item={item} />}
          contentContainerStyle={{ gap: 5 }}
        />
      </View>
    );
  };


const styles = StyleSheet.create({
    container: { backgroundColor: 'white', flex: 1, padding: 10, gap: 10 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between' },
    subTitle: { fontSize: 16, fontWeight: 'bold', flex: 1, color: 'dimgray' }

})