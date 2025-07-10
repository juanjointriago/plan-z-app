import { Ionicons } from '@expo/vector-icons';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageWithFallback from '../ImageWithFallback';
import { Badge, BadgeText } from '../ui/badge';
import { Button, ButtonText } from '../ui/button';

interface EventDetailScreenProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    zone: string;
    category: string;
    description: string;
    image: string;
    maxParticipants: number;
    currentParticipants: number;
    price: string;
  };
  onBack: () => void;
  onJoinEvent: () => void;
}

export default function EventDetailScreen({ 
  event, 
  onBack, 
  onJoinEvent 
}: EventDetailScreenProps) {
  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
          <Text style={styles.errorText}>No se encontró el evento</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getCategoryBadgeColor = (category: string) => {
    const colors = {
      'gastronomia': { bg: '#fed7aa', text: '#ea580c' },
      'deportes': { bg: '#bfdbfe', text: '#2563eb' },
      'entretenimiento': { bg: '#e9d5ff', text: '#9333ea' },
      'arte-cultura': { bg: '#fce7f3', text: '#be185d' },
      'outdoor': { bg: '#bbf7d0', text: '#059669' },
      'bienestar': { bg: '#a7f3d0', text: '#0d9488' }
    };
    return colors[category as keyof typeof colors] || { bg: '#f3f4f6', text: '#6b7280' };
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      'gastronomia': 'Gastronomía',
      'deportes': 'Deportes',
      'entretenimiento': 'Entretenimiento',
      'arte-cultura': 'Arte y Cultura',
      'outdoor': 'Outdoor',
      'bienestar': 'Bienestar'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const progressPercentage = (event.currentParticipants / event.maxParticipants) * 100;
  const categoryColors = getCategoryBadgeColor(event.category);
  const isPastEvent = new Date(event.date) < new Date();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <ImageWithFallback
            source={{ uri: event.image }}
            style={styles.eventImage}
          />
          
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>

          {/* Price Badge */}
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{event.price}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title and Category */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{event.title}</Text>
            <Badge style={[styles.categoryBadge, { backgroundColor: categoryColors.bg }]}>
              <BadgeText style={[styles.categoryBadgeText, { color: categoryColors.text }]}>
                {getCategoryLabel(event.category)}
              </BadgeText>
            </Badge>
          </View>

          {/* Event Details */}
          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="calendar-outline" size={20} color="#be185d" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Fecha</Text>
                <Text style={styles.detailValue}>{formatDate(event.date)}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="time-outline" size={20} color="#be185d" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Hora</Text>
                <Text style={styles.detailValue}>{event.time}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="location-outline" size={20} color="#be185d" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Ubicación</Text>
                <Text style={styles.detailValue}>{event.location}</Text>
                <Text style={styles.detailSubValue}>Zona {event.zone}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="people-outline" size={20} color="#be185d" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Participantes</Text>
                <Text style={styles.detailValue}>
                  {event.currentParticipants} de {event.maxParticipants} personas
                </Text>
                
                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${Math.min(progressPercentage, 100)}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {Math.round(progressPercentage)}% completo
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsSection}>
            <Button
              style={[
                styles.joinButton,
                isPastEvent && styles.disabledButton
              ]}
              onPress={onJoinEvent}
              disabled={isPastEvent}
            >
              <ButtonText style={[
                styles.joinButtonText,
                isPastEvent && styles.disabledButtonText
              ]}>
                {isPastEvent ? 'Evento Finalizado' : 'Unirme al Evento'}
              </ButtonText>
            </Button>

            <View style={styles.secondaryActions}>
              <TouchableOpacity style={styles.secondaryButton}>
                <Ionicons name="heart-outline" size={20} color="#6b7280" />
                <Text style={styles.secondaryButtonText}>Guardar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton}>
                <Ionicons name="share-outline" size={20} color="#6b7280" />
                <Text style={styles.secondaryButtonText}>Compartir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
    height: 280,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceBadge: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: '#be185d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priceText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  titleSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 34,
    marginBottom: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoryBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  detailsSection: {
    marginBottom: 32,
    gap: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fce7f3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 22,
  },
  detailSubValue: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#be185d',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
  },
  descriptionSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
  actionsSection: {
    gap: 16,
    paddingBottom: 32,
  },
  joinButton: {
    backgroundColor: '#be185d',
    borderRadius: 12,
    paddingVertical: 16,
  },
  joinButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  disabledButtonText: {
    color: '#6b7280',
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
});