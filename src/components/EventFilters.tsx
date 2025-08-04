import { Ionicons } from '@expo/vector-icons';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface EventFiltersProps {
  filters: {
    category: string;
    location: string;
    dateRange: string;
    priceRange: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const categories = [
  { value: 'all', label: 'Todas las categorías' },
  { value: 'gastronomia', label: 'Gastronomía' },
  { value: 'deportes', label: 'Deportes' },
  { value: 'entretenimiento', label: 'Entretenimiento' },
  { value: 'arte-cultura', label: 'Arte & Cultura' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'bienestar', label: 'Bienestar' }
];

const locations = [
  { value: 'all', label: 'Todas las ubicaciones' },
  { value: 'centro', label: 'Centro' },
  { value: 'norte', label: 'Zona Norte' },
  { value: 'sur', label: 'Zona Sur' },
  { value: 'este', label: 'Zona Este' },
  { value: 'oeste', label: 'Zona Oeste' }
];

const dateRanges = [
  { value: 'all', label: 'Todas las fechas' },
  { value: 'today', label: 'Hoy' },
  { value: 'tomorrow', label: 'Mañana' },
  { value: 'week', label: 'Esta semana' },
  { value: 'month', label: 'Este mes' }
];

const priceRanges = [
  { value: 'all', label: 'Todos los precios' },
  { value: 'free', label: 'Gratis' },
  { value: 'low', label: '$1 - $25' },
  { value: 'medium', label: '$26 - $50' },
  { value: 'high', label: '$51+' }
];

export default function EventFilters({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isOpen, 
  onToggle 
}: EventFiltersProps) {
  const hasActiveFilters = Object.values(filters).some(value => value !== 'all');

  const toggleFilters = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggle();
  };

  const renderFilterOptions = (options: any[], currentValue: string, filterType: string) => {
    return options.map((option) => (
      <TouchableOpacity
        key={option.value}
        style={[
          styles.optionItem,
          currentValue === option.value && styles.optionItemActive
        ]}
        onPress={() => onFilterChange(filterType, option.value)}
      >
        <Text style={[
          styles.optionText,
          currentValue === option.value && styles.optionTextActive
        ]}>
          {option.label}
        </Text>
        {currentValue === option.value && (
          <Ionicons name="checkmark" size={16} color="#be185d" />
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header}
        onPress={toggleFilters}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Ionicons name="filter" size={20} color="#6b7280" />
          <Text style={styles.headerTitle}>Filtros</Text>
          {hasActiveFilters && (
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>Activos</Text>
            </View>
          )}
        </View>
        <View style={styles.headerRight}>
          {hasActiveFilters && (
            <TouchableOpacity onPress={onClearFilters} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Limpiar</Text>
            </TouchableOpacity>
          )}
          <Ionicons 
            name="chevron-down" 
            size={20} 
            color="#6b7280"
            style={[
              styles.chevron,
              { transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }
            ]}
          />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.content}>
          {/* Category Filter */}
          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Categoría</Text>
            <View style={styles.optionsContainer}>
              {renderFilterOptions(categories, filters.category, 'category')}
            </View>
          </View>

          {/* Location Filter */}
          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Ubicación</Text>
            <View style={styles.optionsContainer}>
              {renderFilterOptions(locations, filters.location, 'location')}
            </View>
          </View>

          {/* Date Range Filter */}
          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Fecha</Text>
            <View style={styles.optionsContainer}>
              {renderFilterOptions(dateRanges, filters.dateRange, 'dateRange')}
            </View>
          </View>

          {/* Price Range Filter */}
          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Precio</Text>
            <View style={styles.optionsContainer}>
              {renderFilterOptions(priceRanges, filters.priceRange, 'priceRange')}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  activeBadge: {
    backgroundColor: '#fce7f3',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  activeBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#be185d',
  },
  clearButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#be185d',
    fontWeight: '500',
  },
  chevron: {
    marginLeft: 4,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  filterGroup: {
    gap: 8,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  optionsContainer: {
    gap: 4,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
  },
  optionItemActive: {
    backgroundColor: '#fce7f3',
    borderWidth: 1,
    borderColor: '#be185d',
  },
  optionText: {
    fontSize: 14,
    color: '#6b7280',
  },
  optionTextActive: {
    color: '#be185d',
    fontWeight: '500',
  },
});