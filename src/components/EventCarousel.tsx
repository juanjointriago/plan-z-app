import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import EventCarouselItem, { EventItem } from './EventCarouselItem';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.85;

interface EventCarouselProps {
  events: EventItem[];
  onEventPress: () => void;
  formatDate: (dateString: string) => string;
}

export default function EventCarousel({ events, onEventPress, formatDate }: EventCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);

  // Removed animateToIndex to avoid useEffect dependency warning

  // Sincronizar la animación cuando cambia el índice
  useEffect(() => {
    if (isAnimating.current) return;

    isAnimating.current = true;
    const toValue = -currentIndex * CARD_WIDTH;

    Animated.spring(translateX, {
      toValue,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start(() => {
      isAnimating.current = false;
    });
  }, [currentIndex, translateX]);

  const nextEvent = () => {
    if (isAnimating.current) return;
    const newIndex = (currentIndex + 1) % events.length;
    setCurrentIndex(newIndex);
  };

  const prevEvent = () => {
    if (isAnimating.current) return;
    const newIndex = (currentIndex - 1 + events.length) % events.length;
    setCurrentIndex(newIndex);
  };

  const goToIndex = (index: number) => {
    if (index === currentIndex || isAnimating.current) return;
    setCurrentIndex(index);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Solo activar si es un movimiento horizontal significativo
        return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderGrant: () => {
        if (isAnimating.current) return false;
        translateX.stopAnimation((value) => {
          translateX.setOffset(value);
          translateX.setValue(0);
        });
      },
      onPanResponderMove: (_, gestureState) => {
        if (isAnimating.current) return;
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (isAnimating.current) return;
        
        translateX.flattenOffset();
        
        const threshold = CARD_WIDTH * 0.25;
        let newIndex = currentIndex;

        if (gestureState.dx > threshold || gestureState.vx > 0.5) {
          // Swipe right - go to previous
          newIndex = (currentIndex - 1 + events.length) % events.length;
        } else if (gestureState.dx < -threshold || gestureState.vx < -0.5) {
          // Swipe left - go to next
          newIndex = (currentIndex + 1) % events.length;
        }

        setCurrentIndex(newIndex);
      },
    })
  ).current;

  return (
    <View style={styles.carouselContainer}>
      <View style={styles.carouselWrapper}>
        <Animated.View
          style={[
            styles.carouselContent,
            {
              transform: [{ translateX }],
              width: events.length * CARD_WIDTH,
            },
          ]}
          {...panResponder.panHandlers}
        >
          {events.map((event) => (
            <View key={event.id} style={styles.carouselItem}>
              <EventCarouselItem
                event={event}
                onPress={onEventPress}
                formatDate={formatDate}
              />
            </View>
          ))}
        </Animated.View>
      </View>

      {/* Controles del carrusel */}
      <TouchableOpacity
        style={[styles.carouselButton, styles.prevButton]}
        onPress={prevEvent}
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={20} color="#6b7280" />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.carouselButton, styles.nextButton]}
        onPress={nextEvent}
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-forward" size={20} color="#6b7280" />
      </TouchableOpacity>

      {/* Indicadores de puntos */}
      <View style={styles.dotsContainer}>
        {events.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => goToIndex(index)}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? "#f9a8d4" : "#d1d5db" }
            ]}
            activeOpacity={0.7}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    position: 'relative',
    height: 420,
    marginVertical: 10,
  },
  carouselWrapper: {
    flex: 1,
    overflow: 'hidden',
  },
  carouselContent: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  carouselItem: {
    width: CARD_WIDTH,
    paddingHorizontal: 10,
  },
  carouselButton: {
    position: 'absolute',
    top: '45%',
    transform: [{ translateY: -20 }],
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 100,
  },
  prevButton: {
    left: 15,
  },
  nextButton: {
    right: 15,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    zIndex: 50,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});