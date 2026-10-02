import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../hooks/useProducts';
import { ProductItem } from '../components/ProductItem';
import { CustomButton } from '../components/CustomButton';

type RootStackParamList = {
  Home: undefined;
  AddProduct: undefined;
};
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const { logout, userEmail } = useAuth();
  const { products, deleteProduct } = useProducts();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bienvenido,</Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.logoutText}>Salir</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>NoMeOlvido</Text>
          
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <ProductItem 
                name={item.name} 
                onDelete={() => deleteProduct(item.id)} 
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <View style={styles.emptyPlaceholder} />
                <Text style={styles.emptyText}>Tu lista está vacía</Text>
                <Text style={styles.emptySubText}>Comienza agregando productos</Text>
              </View>
            }
          />
        </View>

        <View style={styles.footer}>
          <CustomButton 
            title="+ Agregar Producto" 
            onPress={() => navigation.navigate('AddProduct')} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F6F8' },
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: { fontSize: 14, color: '#6B7280' },
  userEmail: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  logoutBtn: { 
    backgroundColor: '#E5E7EB', 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: 8 
  },
  logoutText: { fontSize: 12, color: '#4B5563', fontWeight: 'bold' },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  title: { fontSize: 24, fontWeight: '800', color: '#111827', marginBottom: 20 },
  listContainer: { paddingBottom: 20 },
  emptyContainer: { alignItems: 'center', marginTop: 80 },
  emptyPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E5E7EB', marginBottom: 15 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#374151' },
  emptySubText: { fontSize: 14, color: '#9CA3AF', marginTop: 5 },
  footer: { 
    padding: 20,
    paddingBottom: 40, 
    backgroundColor: '#FFFFFF', 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  }
});