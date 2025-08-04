import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Spinner } from './ui/spinner';

export interface EventItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  participants: number;
}

interface EventCarouselItemProps {
  event: EventItem;
  onPress: () => void;
  formatDate: (dateString: string) => string;
}

export default function EventCarouselItem({ event, onPress, formatDate }: EventCarouselItemProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <View style={styles.eventCard}>
      {/* Imagen del evento */}
      <View style={styles.eventImageContainer}>
        {isLoading && (
          <View style={styles.spinnerContainer}>
            <Spinner size="large" color="#be185d" />
          </View>
        )}
        {hasError ? (
          <View style={styles.errorContainer}>
            <Ionicons name="image-outline" size={40} color="#9ca3af" />
            <Text style={styles.errorText}>Error al cargar imagen</Text>
          </View>
        ) : (
          <Image
            source={{ uri: event.image }}
            style={styles.eventImage}
            resizeMode="cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        <View style={styles.participantsBadge}>
          <Text style={styles.participantsText}>
            {event.participants} participantes
          </Text>
        </View>
      </View>
      
      {/* Contenido del evento */}
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>
          {event.title}
        </Text>
        <Text style={styles.eventDate}>
          {formatDate(event.date)}
        </Text>
        <Text style={styles.eventDescription}>
          {event.description}
        </Text>
        
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text style={styles.detailsButtonText}>Ver detalles</Text>
          <Ionicons name="arrow-forward" size={16} color="#be185d" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  eventImageContainer: {
    height: 200,
    position: 'relative',
    backgroundColor: '#f3f4f6',
  },
  spinnerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    zIndex: 2,
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    zIndex: 1,
  },
  errorText: {
    marginTop: 8,
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  participantsBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 3,
  },
  participantsText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  eventContent: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  eventDescription: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 16,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fce7f3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  detailsButtonText: {
    color: '#be185d',
    fontSize: 16,
    fontWeight: '600',
  },
});