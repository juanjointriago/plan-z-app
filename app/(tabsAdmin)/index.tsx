import React from 'react';
import { ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Note: No change to AdminDashboard function signature or internals.

export default function AdminDashboard() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: isDark ? '#FF6B6B' : '#DC3545' }]}>
          Dashboard Administrativo
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#ccc' : '#666' }]}>
          Panel de control para administradores
        </Text>
        
        <View style={[styles.statsContainer]}>
          <View style={[styles.statCard, { backgroundColor: isDark ? '#1C1C1E' : '#F8F9FA' }]}>
            <Text style={[styles.statNumber, { color: isDark ? '#FF6B6B' : '#DC3545' }]}>150</Text>
            <Text style={[styles.statLabel, { color: isDark ? '#ccc' : '#666' }]}>Usuarios Totales</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: isDark ? '#1C1C1E' : '#F8F9FA' }]}>
            <Text style={[styles.statNumber, { color: isDark ? '#32D74B' : '#28A745' }]}>95%</Text>
            <Text style={[styles.statLabel, { color: isDark ? '#ccc' : '#666' }]}>Disponibilidad</Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? '#1C1C1E' : '#F8F9FA' }]}>
          <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#000' }]}>
            Acciones Rápidas
          </Text>
          <Text style={[styles.cardText, { color: isDark ? '#ccc' : '#666' }]}>
            • Gestionar usuarios
          </Text>
          <Text style={[styles.cardText, { color: isDark ? '#ccc' : '#666' }]}>
            • Ver analíticas en tiempo real
          </Text>
          <Text style={[styles.cardText, { color: isDark ? '#ccc' : '#666' }]}>
            • Configurar sistema
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
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
