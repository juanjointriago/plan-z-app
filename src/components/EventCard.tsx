import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Badge, BadgeText } from './ui/badge';
import { Button, ButtonText } from './ui/button';

interface EventCardProps {
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
  onPress: () => void;
  onJoinRequest: () => void;
  formatDate: (dateString: string) => string;
}

export default function EventCard({ 
  event, 
  onPress, 
  onJoinRequest, 
  formatDate 
}: EventCardProps) {
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

  const categoryColors = getCategoryBadgeColor(event.category);
  const progressPercentage = (event.currentParticipants / event.maxParticipants) * 100;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.eventRow}>
          <Image 
            source={{ uri: event.image }}
            style={styles.eventImage}
            resizeMode="cover"
          />
          
          <View style={styles.eventInfo}>
            <View style={styles.eventHeader}>
              <Text style={styles.eventTitle} numberOfLines={2}>
                {event.title}
              </Text>
              <Text style={styles.eventPrice}>
                {event.price}
              </Text>
            </View>

            <Badge style={[styles.categoryBadge, { backgroundColor: categoryColors.bg }]}>
              <BadgeText style={[styles.categoryBadgeText, { color: categoryColors.text }]}>
                {getCategoryLabel(event.category)}
              </BadgeText>
            </Badge>

            <View style={styles.eventDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="time-outline" size={14} color="#6b7280" />
                <Text style={styles.detailText}>
                  {formatDate(event.date)} • {event.time}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="location-outline" size={14} color="#6b7280" />
                <Text style={styles.detailText} numberOfLines={1}>
                  {event.location}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="people-outline" size={14} color="#6b7280" />
                <Text style={styles.detailText}>
                  {event.currentParticipants}/{event.maxParticipants}
                </Text>
              </View>
            </View>

            <View style={styles.eventFooter}>
              <Button
                size="sm"
                style={styles.joinButton}
                onPress={onJoinRequest}
              >
                <ButtonText style={styles.joinButtonText}>
                  Unirme
                </ButtonText>
              </Button>
            </View>
          </View>
        </View>
        
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progress}>
            <View 
              style={[
                styles.progressFilled, 
                { width: `${Math.min(progressPercentage, 100)}%` }
              ]} 
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  cardContent: {
    overflow: 'hidden',
    borderRadius: 12,
  },
  eventRow: {
    flexDirection: 'row',
    padding: 12,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
    gap: 6,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 8,
    lineHeight: 20,
  },
  eventPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#be185d',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 4,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  eventDetails: {
    gap: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#6b7280',
    flex: 1,
  },
  eventFooter: {
    marginTop: 4,
    alignItems: 'flex-end',
  },
  joinButton: {
    backgroundColor: '#be185d',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    minHeight: 32,
  },
  joinButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  progress: {
    height: 4,
    backgroundColor: '#f3f4f6',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFilled: {
    height: '100%',
    backgroundColor: '#be185d',
    borderRadius: 2,
  },
});