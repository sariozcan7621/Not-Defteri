import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React from 'react';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image 
        style={styles.image}
        source={require('../../assets/abc.jpg')} 
        resizeMode="cover"
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}> Emeltek
           Biyomedikal</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button 
            title="Notlar" 
            onPress={() => navigation.navigate('Notlar')} 
            color="blue" 
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button 
            title="Emeltek Biyomedikal" 
            onPress={() => navigation.navigate('Emeltek Biyomedikal')} 
            color="#2196F3"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button 
            title="Üye Kaydı" 
            onPress={() => navigation.navigate('Üye Kaydı')} 
            color="blue"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    backgroundColor:'tomato',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  headerContainer: {
    flexDirection: 'row', // Simge ve metni yan yana yerleştirir
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
   textAlign:'center',
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    margin:'auto',
    //fontStyle: 'italic',
     fontFamily: 'serif',
    
  },
  buttonContainer: {
    height:250,
    marginTop: 100,
    alignItems: 'center',
    
  },
  buttonWrapper: {
    marginBottom: 25,
    width: 280,
  
    borderRadius: 20,
    overflow: 'hidden',
     fontFamily: 'serif',
  },
});
