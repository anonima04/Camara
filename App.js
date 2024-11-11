import React, { useState } from 'react';
import { View, Button, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

const ColorPickerApp = () => {
  const [imageUri, setImageUri] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);

  const pickImage = async (source) => {
    let result;
    if (source === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
    }

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setCurrentColor(null); // Reiniciar el color seleccionado
    }
  };

  const handlePress = async (event) => {
    const { locationX, locationY } = event.nativeEvent;

    try {
      // Tamaño del área de selección
      const cropSize = 5; // 5x5 píxeles para mejorar la precisión

      // Extraer el color exacto en el área seleccionada
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ crop: { originX: locationX - cropSize / 2, originY: locationY - cropSize / 2, width: cropSize, height: cropSize } }],
        { format: ImageManipulator.SaveFormat.PNG }
      );
      
      setCurrentColor(manipulatedImage.uri); // Mostrar solo el último color
    } catch (error) {
      console.log('Error al identificar el color:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Seleccionar desde Galería" onPress={() => pickImage('gallery')} />
        <Button title="Capturar con Cámara" onPress={() => pickImage('camera')} />
      </View>

      {imageUri && (
        <TouchableOpacity onPress={handlePress}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </TouchableOpacity>
      )}

      {currentColor && (
        <View style={styles.colorContainer}>
          <Text style={styles.colorText}>Color Seleccionado:</Text>
          <Image source={{ uri: currentColor }} style={styles.colorPreview} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F4F8',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'column', // Cambiar de fila a columna para separarlos
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  buttonSpacer: {
    marginVertical: 10, // Separar los botones con un margen
  },
  imageContainer: {
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  colorContainer: {
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  colorText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  hexColorText: {
    fontSize: 16,
    marginTop: 10,
    color: '#555',
  },
  colorNameText: {
    fontSize: 16,
    marginTop: 5,
    color: '#555',
  },
  colorToneText: {
    fontSize: 16,
    marginTop: 5,
    color: '#555',
  },
  colorPreview: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginVertical: 10,
  },
});
export default ColorPickerApp;
