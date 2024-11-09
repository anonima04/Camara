
import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import tinycolor from 'tinycolor2';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [pickedColor, setPickedColor] = useState(null);

  // Función para abrir la galería
  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Función para abrir la cámara
  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Selección de color (ejemplo: selecciona un color fijo, podría mejorarse con color en áreas)
  const pickColor = () => {
    // Color de ejemplo: azul
    const exampleColor = tinycolor("#4A90E2");
    setPickedColor(exampleColor);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Identificador de Color</Text>
      <View style={styles.buttonContainer}>
        <Button title="Abrir Cámara" onPress={openCamera} />
        <Button title="Abrir Galería" onPress={pickImageFromGallery} />
      </View>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
      {selectedImage && (
        <TouchableOpacity style={styles.colorButton} onPress={pickColor}>
          <Text style={styles.colorButtonText}>Seleccionar Color</Text>
        </TouchableOpacity>
      )}
      {pickedColor && (
        <View style={styles.colorDisplay}>
          <Text style={styles.colorText}>Color seleccionado:</Text>
          <View
            style={{
              backgroundColor: pickedColor.toHexString(),
              width: 100,
              height: 100,
              marginTop: 10,
            }}
          />
          <Text style={styles.colorDetails}>
            RGB: {pickedColor.toRgbString()}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  colorButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 5,
  },
  colorButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  colorDisplay: {
    marginTop: 20,
    alignItems: 'center',
  },
  colorText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  colorDetails: {
    fontSize: 16,
    marginTop: 10,
  },
});
