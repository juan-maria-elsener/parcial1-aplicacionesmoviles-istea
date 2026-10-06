import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { validateLoginInput } from '../utils/validators';
import { CustomButton } from '../components/CustomButton';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();
  const navigation = useNavigation();

  const handleRegister = async () => {
    const errors = validateLoginInput(email, password);
    if (password !== confirmPassword) {
      errors.push('Las contraseñas no coinciden');
    }

    if (errors.length > 0) {
      Alert.alert('Error', errors.join('\n'));
      return;
    }
    
    await register(email, password);
    Alert.alert('¡Éxito!', 'Cuenta creada correctamente', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.title}>Nueva Cuenta ✨</Text>
          <Text style={styles.subtitle}>Completa tus datos para empezar</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña (mín. 8 caracteres)"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={false}
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Repetir Contraseña"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={false}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <CustomButton title="Registrarme" onPress={handleRegister} color="#10B981" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F6F8' },
  container: { flex: 1, padding: 20, justifyContent: 'center' },
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
  },
  title: { fontSize: 28, fontWeight: '800', color: '#1F2937', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#6B7280', marginBottom: 30 },
  inputContainer: { width: '100%', marginBottom: 10 },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    fontSize: 16,
    color: '#1F2937',
  },
});