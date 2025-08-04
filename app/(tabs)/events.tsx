import EventCard from '@/src/components/EventCard';
import EventFilters from '@/src/components/EventFilters';
import EventDetailScreen from '@/src/components/screens/EventDetailScreen';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Ionicons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
 

const upcomingEvents = [
  {
    id: 4,
    title: "Taller de Cocina Asiática",
    date: "July 15, 2024",
    time: "19:00",
    location: "Centro Culinario downtown",
    zone: "centro",
    category: "gastronomia",
    description: "Aprende a preparar platos auténticos de la cocina asiática con un chef profesional",
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=200&fit=crop",
    maxParticipants: 20,
    currentParticipants: 12,
    price: "$45"
  },
  {
    id: 5,
    title: "Escape Room: Misterio en la Mansión",
    date: "July 18, 2024",
    time: "20:30",
    location: "Escape Adventures",
    zone: "norte",
    category: "entretenimiento",
    description: "Resuelve enigmas y escapa de la mansión embrujada en equipos de 4-6 personas",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop",
    maxParticipants: 24,
    currentParticipants: 18,
    price: "$35"
  },
  {
    id: 6,
    title: "Noche de Juegos de Mesa",
    date: "July 22, 2024",
    time: "19:30",
    location: "Café Lúdico",
    zone: "sur",
    category: "entretenimiento",
    description: "Disfruta de una noche divertida jugando juegos de mesa clásicos y modernos",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=200&fit=crop",
    maxParticipants: 16,
    currentParticipants: 8,
    price: "Gratis"
  },
  {
    id: 7,
    title: "Clase de Yoga al Amanecer",
    date: "July 25, 2024",
    time: "06:30",
    location: "Parque Central",
    zone: "centro",
    category: "bienestar",
    description: "Comienza tu día con una sesión de yoga relajante al aire libre",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop",
    maxParticipants: 30,
    currentParticipants: 22,
    price: "$20"
  },
  {
    id: 8,
    title: "Torneo de Fútbol 5",
    date: "July 28, 2024",
    time: "16:00",
    location: "Complejo Deportivo Norte",
    zone: "norte",
    category: "deportes",
    description: "Participa en nuestro torneo mensual de fútbol 5. Premios para los ganadores",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=200&fit=crop",
    maxParticipants: 40,
    currentParticipants: 35,
    price: "$30"
  },
  {
    id: 9,
    title: "Exposición de Arte Local",
    date: "August 2, 2024",
    time: "18:00",
    location: "Galería Municipal",
    zone: "centro",
    category: "arte-cultura",
    description: "Descubre el talento local en nuestra exposición mensual de artistas emergentes",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=200&fit=crop",
    maxParticipants: 50,
    currentParticipants: 15,
    price: "Gratis"
  },
  {
    id: 10,
    title: "Senderismo en la Montaña",
    date: "August 5, 2024",
    time: "07:00",
    location: "Cerro de la Cruz",
    zone: "este",
    category: "outdoor",
    description: "Aventura de senderismo para todos los niveles. Incluye guía y refrigerio",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=200&fit=crop",
    maxParticipants: 25,
    currentParticipants: 18,
    price: "$25"
  },
  {
    id: 11,
    title: "Cata de Vinos",
    date: "August 8, 2024",
    time: "20:00",
    location: "Vinoteca El Barril",
    zone: "oeste",
    category: "gastronomia",
    description: "Degusta una selección de vinos locales e internacionales con maridajes",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=200&fit=crop",
    maxParticipants: 15,
    currentParticipants: 12,
    price: "$60"
  },
  {
    id: 12,
    title: "Concierto de Jazz",
    date: "August 12, 2024",
    time: "21:00",
    location: "Club de Jazz Blue Note",
    zone: "centro",
    category: "entretenimiento",
    description: "Noche de jazz en vivo con músicos locales e invitados especiales",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop",
    maxParticipants: 80,
    currentParticipants: 45,
    price: "$40"
  },
  {
    id: 13,
    title: "Taller de Fotografía",
    date: "August 15, 2024",
    time: "14:00",
    location: "Estudio Creativo",
    zone: "sur",
    category: "arte-cultura",
    description: "Aprende técnicas básicas de fotografía digital y composición",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=200&fit=crop",
    maxParticipants: 12,
    currentParticipants: 7,
    price: "$50"
  }
];

export default function EventsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    location: 'all',
    dateRange: 'all',
    priceRange: 'all'
  });
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showEventDetail, setShowEventDetail] = useState(false);

  const handleEventPress = (event: any) => {
    setSelectedEvent(event);
    setShowEventDetail(true);
  };

  const handleBackFromDetail = () => {
    setShowEventDetail(false);
    setSelectedEvent(null);
  };

  const handleJoinEventFromDetail = () => {
    if (selectedEvent) {
      console.log('Join request for event:', selectedEvent.id);
      alert('¡Solicitud enviada! Te notificaremos pronto.');
    }
  };

  const handleJoinRequest = (event: any) => {
    // Check if user is authenticated - you can implement auth check later
    console.log('Join request for event:', event.id);
    // For now, just show an alert
    alert('Solicitud enviada. Te notificaremos pronto!');
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      location: 'all',
      dateRange: 'all',
      priceRange: 'all'
    });
    setSearchQuery('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Mañana';
    if (diffDays < 7) return `En ${diffDays} días`;
    
    return date.toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getPrice = (priceString: string) => {
    if (priceString === 'Gratis') return 0;
    return parseInt(priceString.replace('$', ''));
  };

  const filteredEvents = useMemo(() => {
    return upcomingEvents.filter(event => {
      // Search filter
      if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !event.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category && filters.category !== 'all' && event.category !== filters.category) {
        return false;
      }

      // Location filter
      if (filters.location && filters.location !== 'all' && event.zone !== filters.location) {
        return false;
      }

      // Date range filter
      if (filters.dateRange && filters.dateRange !== 'all') {
        const eventDate = new Date(event.date);
        const today = new Date();
        const diffDays = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        switch (filters.dateRange) {
          case 'today':
            if (diffDays !== 0) return false;
            break;
          case 'tomorrow':
            if (diffDays !== 1) return false;
            break;
          case 'week':
            if (diffDays < 0 || diffDays > 7) return false;
            break;
          case 'month':
            if (diffDays < 0 || diffDays > 30) return false;
            break;
          case 'future':
            if (diffDays < 0) return false;
            break;
        }
      }

      // Price range filter
      if (filters.priceRange && filters.priceRange !== 'all') {
        const price = getPrice(event.price);

        switch (filters.priceRange) {
          case 'free':
            if (price !== 0) return false;
            break;
          case 'low':
            if (price < 1 || price > 25) return false;
            break;
          case 'medium':
            if (price < 26 || price > 50) return false;
            break;
          case 'high':
            if (price < 51) return false;
            break;
        }
      }

      return true;
    });
  }, [searchQuery, filters]);

  // Show event detail screen if an event is selected
  if (showEventDetail && selectedEvent) {
    return (
      <EventDetailScreen
        event={selectedEvent}
        onBack={handleBackFromDetail}
        onJoinEvent={handleJoinEventFromDetail}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#fdf2f8', '#fce7f3', '#fbcfe8']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <Ionicons name="calendar-outline" size={28} color="#881337" />
            <Text style={styles.title}>Próximos Eventos</Text>
          </View>
          <Text style={styles.subtitle}>
            Descubre actividades emocionantes y conecta con nuevas personas
          </Text>
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color="#6b7280" style={styles.searchIcon} />
              <TextInput
                placeholder="Buscar eventos..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Filters */}
      <EventFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isOpen={filtersOpen}
        onToggle={() => setFiltersOpen(!filtersOpen)}
      />

      {/* Results Count */}
      <View style={styles.resultsCount}>
        <Text style={styles.resultsText}>
          {filteredEvents.length} evento{filteredEvents.length !== 1 ? 's' : ''} encontrado{filteredEvents.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Events List */}
      <ScrollView style={styles.eventsList} showsVerticalScrollIndicator={false}>
        <View style={styles.eventsContainer}>
          {filteredEvents.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={48} color="#9ca3af" />
              <Text style={styles.emptyTitle}>No se encontraron eventos</Text>
              <Text style={styles.emptySubtitle}>
                Intenta ajustar tus filtros de búsqueda
              </Text>
              <Button
                onPress={handleClearFilters}
                style={styles.clearFiltersButton}
              >
                <ButtonText style={styles.clearFiltersButtonText}>
                  Limpiar Filtros
                </ButtonText>
              </Button>
            </View>
          ) : (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onPress={() => handleEventPress(event)}
                onJoinRequest={() => handleJoinRequest(event)}
                formatDate={formatDate}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerContent: {
    gap: 16,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#881337',
  },
  subtitle: {
    fontSize: 16,
    color: '#be185d',
    lineHeight: 22,
  },
  searchContainer: {
    marginTop: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  resultsCount: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  resultsText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  eventsList: {
    flex: 1,
  },
  eventsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
    gap: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  clearFiltersButton: {
    backgroundColor: '#be185d',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 8,
  },
  clearFiltersButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});