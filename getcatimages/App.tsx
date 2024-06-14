import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Image, Text, Pressable, ActivityIndicator, Platform } from 'react-native';
import axios from 'axios';
 
const App = () => {
  const [catImages, setCatImages] = useState<string[]>([]);
 
  const fetchCatImages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/cats');
      const images = response.data.map((cat: any) => cat.url);
      setCatImages([...catImages, ...images]);
    } catch (error) {
      console.error("Error fetching cat images: ", error);
    }
  };
 
  return (
    <View style={styles.container}>
      <Pressable onPress={fetchCatImages} style={styles.button}>
        <Text style={styles.buttonText}>Get Cat Images</Text>
      </Pressable>
      <ScrollView style={styles.scrollView}>
        {catImages.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  scrollView: {
    marginTop: 20,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
 
export default App;
 