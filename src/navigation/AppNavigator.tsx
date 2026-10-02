import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

// Importamos las pantallas que vamos a usar en la navegación
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddProductScreen from '../screens/AddProductScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }
// Renderizamos las pantallas según el estado de autenticación
  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
    
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Crear Cuenta' }} />
        </>
      ) : (
        // Si el usuario está autenticado, mostramos las pantallas de la aplicación
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Mis Compras' }} />
          <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Nuevo Producto' }} />
        </>
      )}
    </Stack.Navigator>
  );
};