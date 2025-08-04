import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Image, ImageStyle, StyleProp, StyleSheet, Text, View } from 'react-native';

interface ImageWithFallbackProps {
  source: { uri: string };
  style?: StyleProp<ImageStyle> | undefined;
  fallbackIcon?: string;
  fallbackSize?: number;
  fallbackColor?: string;
  showLoadingText?: boolean;
}

export default function ImageWithFallback({
  source,
  style,
  fallbackIcon = 'image-outline',
  fallbackSize = 48,
  fallbackColor = '#9ca3af',
  showLoadingText = false
}: ImageWithFallbackProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <View style={[styles.container, style]}>
      {!error && (
        <Image
          source={source}
          style={[styles.image, style]}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          resizeMode="cover"
        />
      )}
      
      {(loading || error) && (
        <View style={[styles.fallback, style]}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#be185d" />
              {showLoadingText && (
                <Text style={styles.loadingText}>Cargando imagen...</Text>
              )}
            </View>
          ) : (
            <View style={styles.errorContainer}>
              <Ionicons 
                name={fallbackIcon as any} 
                size={fallbackSize} 
                color={fallbackColor} 
              />
              <Text style={styles.errorText}>Imagen no disponible</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  loadingContainer: {
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    gap: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});