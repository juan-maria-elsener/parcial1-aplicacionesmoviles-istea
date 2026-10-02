import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProducts } from '../hooks/useProducts';
import { CustomButton } from '../components/CustomButton';

export default function AddProductScreen() {
  const [name, setName] = useState('');
  const { addProduct } = useProducts();
  const navigation = useNavigation();

  const handleAdd = async () => {
    if (name.trim().length === 0) {
      Alert.alert('Error', 'El nombre del producto no puede estar vacío');
      return;
    }
    
    await addProduct(name);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.emoji}>📦</Text>
          <Text style={styles.title}>Nuevo Producto</Text>
          <Text style={styles.subtitle}>¿Qué necesitas comprar?</Text>

          <TextInput
            style={styles.input}
            placeholder="Ej: Purina Excellent, Leche..."
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
            autoFocus
          />

          <View style={styles.buttonContainer}>
            <CustomButton title="Guardar Producto" onPress={handleAdd} color="#4F46E5" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F6F8' },
  container: { flex: 1, padding: 20, justifyContent: 'flex-start', paddingTop: 40 },
  backButton: { marginBottom: 20, alignSelf: 'flex-start' },
  backText: { fontSize: 16, color: '#4F46E5', fontWeight: 'bold' },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
    alignItems: 'center',
  },
  emoji: { fontSize: 50, marginBottom: 10 },
  title: { fontSize: 26, fontWeight: '800', color: '#1F2937', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#6B7280', marginBottom: 30 },
  input: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    fontSize: 16,
    color: '#1F2937',
  },
  buttonContainer: { width: '100%' }
});