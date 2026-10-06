import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { validateLoginInput } from '../utils/validators';
import { CustomButton } from '../components/CustomButton';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    const errors = validateLoginInput(email, password);
    if (errors.length > 0) {
      Alert.alert('Error', errors.join('\n'));
      return;
    }
    
    const success = await login(email, password);
    if (!success) {
      Alert.alert('Error', 'Credenciales incorrectas o usuario no encontrado');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.card}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>N</Text>
          </View>
          <Text style={styles.title}>NoMeOlvido</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

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
              placeholder="Contraseña"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={false}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <CustomButton title="Ingresar" onPress={handleLogin} />
          
          <View style={styles.spacer} />
          
          <CustomButton 
            title="Crear cuenta nueva" 
            onPress={() => navigation.navigate('Register')} 
            color="#9CA3AF" 
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F6F8' },
  container: { flex: 1, justifyContent: 'center', padding: 20 },
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
    width: '100%',
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF' },
  title: { fontSize: 28, fontWeight: '800', color: '#1F2937', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 30 },
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
  spacer: { height: 5 },
});