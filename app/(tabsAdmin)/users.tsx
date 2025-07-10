import React from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UsersManagement() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: isDark ? '#FF6B6B' : '#DC3545' }]}>
          Gestión de Usuarios
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#ccc' : '#666' }]}>
          Administra los usuarios del sistema
        </Text>
        
        <View style={[styles.card, { backgroundColor: isDark ? '#1C1C1E' : '#F8F9FA' }]}>
          <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#000' }]}>
            Usuarios Activos
          </Text>
          <Text style={[styles.cardText, { color: isDark ? '#ccc' : '#666' }]}>
            • Usuario 1 - Activo
          </Text>
          <Text style={[styles.cardText, { color: isDark ? '#ccc' : '#666' }]}>
            • Usuario 2 - Activo
          </Text>
          <Text style={[styles.cardText, { color: isDark ? '#ccc' : '#666' }]}>
            • Usuario 3 - Inactivo
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 5,
  },
});
