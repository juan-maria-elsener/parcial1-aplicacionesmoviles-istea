import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export interface Product {
  id: string;
  name: string;
  bought: boolean;
}

const STORAGE_KEY = '@shopping_list';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProducts(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error cargando productos", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  const addProduct = async (name: string) => {
    if (!name.trim()) return;
    
    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      bought: false,
    };
    
    const updated = [newProduct, ...products];
    setProducts(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Se ejecuta exactamente 2 segundos después de guardar el producto
    setTimeout(() => {
      Alert.alert(
        "🛒 NoMeOlvido",
        `¡Se agregó "${name}" a tu lista!`
      );
    }, 2000); 
  };

  const deleteProduct = async (id: string) => {
    const updated = products.filter(product => product.id !== id);
    setProducts(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { products, addProduct, deleteProduct };
};