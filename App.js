
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import CoursesScreen from './src/screens/CoursesScreen';
import CoursesInformation from './src/screens/CoursesInformation';
import desinger from './src/screens/desinger';
import { FontAwesome } from '@expo/vector-icons'; // İkonlar için Expo'dan FontAwesome'u içeri aktarın
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Ana Sayfa">
        <Stack.Screen 
          name="Ana Sayfa" 
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome name="home" size={24} color="black" />
                <Text style={{ marginLeft: 10, fontSize: 20 }}>Ana Sayfa</Text>
              </View>
            ),
            headerTitleAlign: 'center', // Başlığı ortalamak için
          }} 
        />
        
        <Stack.Screen name="Notlar" component={CoursesScreen}/>
        <Stack.Screen name="Emeltek Biyomedikal" component={CoursesInformation}/>
        <Stack.Screen name="Üye Kaydı" component={desinger}/>
      </Stack.Navigator>


    </NavigationContainer>
  );
}


