import EventCarousel from '@/components/EventCarousel';
import { Colors } from '@/constants/Colors';
import { useAuthStore } from '@/src/stores/auth/auth.store';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';

const pastEvents = [
  {
    id: 1,
    title: "Noche de Karaoke",
    date: "2024-12-15",
    description: "Una noche increíble cantando nuestras canciones favoritas",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    participants: 25
  },
  {
    id: 2,
    title: "Torneo de Bowling",
    date: "2024-12-08",
    description: "Competencia amistosa con premios y mucha diversión",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    participants: 18
  },
  {
    id: 3,
    title: "Cena Temática Italiana",
    date: "2024-11-30",
    description: "Deliciosa comida italiana en un ambiente acogedor",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    participants: 32
  }
];

export default function HomeScreen() {
  const { user } = useAuthStore();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const handleEventPress = () => {
    if (!user) {
      router.push('/(auth)/login');
    } else {
      // Navegar a la pantalla de eventos por ahora
      router.push('/(tabs)/events');
    }
  };

  const handleRegisterPress = () => {
    router.push('/(auth)/register');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header con gradiente */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={['#fdf2f8', '#fce7f3', '#fbcfe8']}
            style={styles.gradientHeader}
          >
            <View style={styles.headerContent}>
              <Image
                source={{uri:'adaptive-icon'}} 
                style={styles.logo}
                resizeMode="contain"
              />

              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeTitle}>
                  Bienvenido{user ? `, ${user.firstName}` : ''} a PlanZ
                </Text>
                <Text style={styles.welcomeSubtitle}>
                  Conecta, participa y disfruta eventos únicos
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Sección Acerca de */}
        <View style={styles.aboutSection}>
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>¿Quiénes Somos?</Text>
            <Text style={styles.aboutText}>
              PlanZ es la plataforma que conecta adultos apasionados por vivir nuevas experiencias.
              Organizamos eventos únicos donde puedes conocer personas con intereses similares,
              crear vínculos auténticos y disfrutar de actividades emocionantes en un ambiente
              seguro y divertido.
            </Text>

            <Text style={styles.subsectionTitle}>¿Qué Hacemos?</Text>
            <Text style={styles.aboutText}>
              Desde noches de karaoke hasta cenas temáticas, torneos deportivos y actividades
              al aire libre. Cada evento está diseñado para fomentar la conexión humana y
              crear momentos memorables que trascienden lo digital.
            </Text>
          </View>
        </View>

        {/* Carrusel de Eventos Pasados */}
        <View style={styles.eventsSection}>
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Eventos Pasados</Text>

            <EventCarousel
              events={pastEvents}
              onEventPress={handleEventPress}
              formatDate={formatDate}
            />
          </View>
        </View>

        {/* Call to Action para usuarios no registrados */}
        {!user && (
          <View style={styles.ctaSection}>
            <View style={styles.contentContainer}>
              <View style={styles.ctaCard}>
                <LinearGradient
                  colors={['#fdf2f8', '#fce7f3', '#fbcfe8']}
                  style={styles.ctaGradient}
                >
                  <Text style={styles.ctaTitle}>¡Únete a PlanZ!</Text>
                  <Text style={styles.ctaSubtitle}>
                    Regístrate ahora y comienza a vivir experiencias increíbles
                  </Text>
                  <TouchableOpacity
                    style={styles.ctaButton}
                    onPress={handleRegisterPress}
                  >
                    <Text style={styles.ctaButtonText}>Crear Cuenta</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    height: 320,
  },
  gradientHeader: {
    flex: 1,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 192,
    height: 128,
    marginBottom: 16,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#881337',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#be185d',
    textAlign: 'center',
  },
  aboutSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  contentContainer: {
    maxWidth: 896,
    alignSelf: 'center',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
    marginTop: 8,
  },
  eventsSection: {
    backgroundColor: '#f9fafb',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventImageContainer: {
    position: 'relative',
    height: 192,
  },
  eventImage: {
    width: '100%',
    height: 192,
  },
  participantsBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fce7f3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  participantsText: {
    fontSize: 12,
    color: '#881337',
    fontWeight: '500',
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f9a8d4',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 4,
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#be185d',
    fontWeight: '500',
  },
  ctaSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  ctaCard: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ctaGradient: {
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#881337',
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#be185d',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    color: '#be185d',
    fontWeight: '500',
  },
});