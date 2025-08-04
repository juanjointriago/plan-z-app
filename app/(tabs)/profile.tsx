import { Avatar, AvatarFallbackText, AvatarImage } from '@/src/components/ui/avatar';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useAuthStore } from '../../src/stores/auth/auth.store';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  const handleLoginPress = () => {
    router.push('/(auth)/login');
  };

  const handleLogoutPress = () => {
    logout();
  };

  if (!user) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
        {/* Header */}
        <View style={{ 
          backgroundColor: '#fdf2f8', 
          paddingTop: 64, 
          paddingBottom: 24, 
          paddingHorizontal: 24 
        }}>
          <View style={{ 
            maxWidth: '100%', 
            marginHorizontal: 'auto', 
            flexDirection: 'row', 
            alignItems: 'center', 
            gap: 12 
          }}>
            <Ionicons name="person" size={28} color="#be185d" />
            <Text style={{ fontSize: 24, fontWeight: '600', color: '#9f1239' }}>
              Perfil
            </Text>
          </View>
        </View>

        <View style={{ 
          flex: 1, 
          paddingHorizontal: 24, 
          maxWidth: 384, 
          marginHorizontal: 'auto', 
          width: '100%' 
        }}>
          <View style={{ 
            marginTop: 24, 
            padding: 48, 
            backgroundColor: 'white', 
            alignItems: 'center',
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}>
            <Avatar size="xl" className="bg-gray-200 mb-4">
              <AvatarFallbackText>
                <Ionicons name="person" size={40} color="#6b7280" />
              </AvatarFallbackText>
            </Avatar>
            <Text style={{ 
              fontSize: 24, 
              fontWeight: '600', 
              color: '#111827', 
              marginBottom: 8 
            }}>
              Inicia Sesión
            </Text>
            <Text style={{ 
              fontSize: 16, 
              color: '#6b7280', 
              textAlign: 'center', 
              lineHeight: 24, 
              marginBottom: 24 
            }}>
              Accede a tu cuenta para ver tu perfil y gestionar tus eventos
            </Text>
            <Button
              onPress={handleLoginPress}
              className="bg-pink-300 w-full rounded-lg"
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Ionicons name="log-in" size={20} color="#9f1239" />
                <ButtonText className="text-rose-700">Iniciar Sesión</ButtonText>
              </View>
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <View style={{ 
        backgroundColor: '#fdf2f8', 
        paddingTop: 64, 
        paddingBottom: 24, 
        paddingHorizontal: 24 
      }}>
        <View style={{ 
          maxWidth: '100%', 
          marginHorizontal: 'auto', 
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: 12 
        }}>
          <Ionicons name="person" size={28} color="#be185d" />
          <Text style={{ fontSize: 24, fontWeight: '600', color: '#9f1239' }}>
            Perfil
          </Text>
        </View>
      </View>

      <View style={{ 
        flex: 1, 
        paddingHorizontal: 24, 
        maxWidth: 384, 
        marginHorizontal: 'auto', 
        width: '100%' 
      }}>
        {/* User Profile Card */}
        <View style={{ 
          marginTop: 24, 
          padding: 24, 
          backgroundColor: 'white',
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          <View style={{ alignItems: 'center' }}>
            <Avatar size="xl" className="bg-pink-100 mb-4">
              {user.profilePhoto ? (
                <AvatarImage source={{ uri: user.profilePhoto }} alt="Profile" />
              ) : (
                <AvatarFallbackText className="text-rose-700">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </AvatarFallbackText>
              )}
            </Avatar>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: '600', 
              color: '#111827', 
              marginBottom: 4 
            }}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={{ fontSize: 16, color: '#6b7280' }}>
              @{user.username}
            </Text>
          </View>
        </View>

        {/* Menu Options */}
        <View style={{ marginTop: 16, gap: 12 }}>
          {/* Mis Eventos */}
          <Pressable>
            <View style={{ 
              padding: 16, 
              backgroundColor: 'white',
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 1
            }}>
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ 
                    padding: 8, 
                    backgroundColor: '#fce7f3', 
                    borderRadius: 6 
                  }}>
                    <Ionicons name="calendar" size={20} color="#be185d" />
                  </View>
                  <Text style={{ 
                    fontSize: 16, 
                    color: '#111827', 
                    fontWeight: '500' 
                  }}>
                    Mis Eventos
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
              </View>
            </View>
          </Pressable>

          {/* Configuración */}
          <Pressable>
            <View style={{ 
              padding: 16, 
              backgroundColor: 'white',
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 1
            }}>
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ 
                    padding: 8, 
                    backgroundColor: '#fce7f3', 
                    borderRadius: 6 
                  }}>
                    <Ionicons name="settings" size={20} color="#be185d" />
                  </View>
                  <Text style={{ 
                    fontSize: 16, 
                    color: '#111827', 
                    fontWeight: '500' 
                  }}>
                    Configuración
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
              </View>
            </View>
          </Pressable>

          {/* Ayuda */}
          <Pressable>
            <View style={{ 
              padding: 16, 
              backgroundColor: 'white',
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 1
            }}>
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ 
                    padding: 8, 
                    backgroundColor: '#fce7f3', 
                    borderRadius: 6 
                  }}>
                    <Ionicons name="help-circle" size={20} color="#be185d" />
                  </View>
                  <Text style={{ 
                    fontSize: 16, 
                    color: '#111827', 
                    fontWeight: '500' 
                  }}>
                    Ayuda
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
              </View>
            </View>
          </Pressable>

          {/* Cerrar Sesión */}
          <Pressable onPress={handleLogoutPress}>
            <View style={{ 
              padding: 16, 
              backgroundColor: 'white',
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 1
            }}>
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ 
                    padding: 8, 
                    backgroundColor: '#fee2e2', 
                    borderRadius: 6 
                  }}>
                    <Ionicons name="log-out" size={20} color="#dc2626" />
                  </View>
                  <Text style={{ 
                    fontSize: 16, 
                    color: '#dc2626', 
                    fontWeight: '500' 
                  }}>
                    Cerrar Sesión
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
              </View>
            </View>
          </Pressable>
        </View>

        {/* Version Info */}
        <View style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          padding: 16, 
          borderRadius: 8, 
          marginTop: 16, 
          marginBottom: 24 
        }}>
          <Text style={{ 
            fontSize: 12, 
            color: '#6b7280', 
            textAlign: 'center' 
          }}>
            PlanZ v1.0.0 - Descubre eventos increíbles
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}