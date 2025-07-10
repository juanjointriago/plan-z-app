import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Button, ButtonText } from '../../components/ui/button';
import { FormControl, FormControlError, FormControlErrorText, FormControlLabel, FormControlLabelText } from '../../components/ui/form-control';
import { Input, InputField } from '../../components/ui/input';
import { useAuthStore } from '../../stores/auth/auth.store';

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginScreen() {
  const { login, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');

  const { 
    control, 
    handleSubmit, 
    formState: { errors, isValid } 
  } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      await login(data.username, data.password);
      router.replace('/(tabs)');
    } catch (error) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleRegisterPress = () => {
    router.push('/(auth)/register');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fdf2f8' }}>
      <View style={{ flex: 1, minHeight: '100%' }}>
        {/* Header */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: 16, 
          paddingTop: 48 
        }}>
          <Pressable onPress={handleBackPress}>
            <View style={{ padding: 8, borderRadius: 6 }}>
              <Ionicons name="arrow-back" size={24} color="#be185d" />
            </View>
          </Pressable>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#9f1239' }}>
            Iniciar Sesión
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={{ 
          flex: 1, 
          paddingHorizontal: 16, 
          maxWidth: 384, 
          alignSelf: 'center', 
          width: '100%' 
        }}>
          {/* Logo */}
          <View style={{ alignItems: 'center', marginTop: 16, marginBottom: 32 }}>
            <View style={{ 
              width: 128, 
              height: 96, 
              backgroundColor: '#f3f4f6', 
              borderRadius: 8, 
              marginBottom: 16,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{ color: '#6b7280', fontSize: 12 }}>Logo</Text>
            </View>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: '600', 
              color: '#9f1239', 
              textAlign: 'center',
              marginBottom: 8
            }}>
              ¡Bienvenido de vuelta!
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: '#e11d48', 
              textAlign: 'center' 
            }}>
              Inicia sesión para continuar disfrutando de increíbles eventos
            </Text>
          </View>

          {/* Login Form */}
          <View style={{ 
            backgroundColor: 'white', 
            padding: 24, 
            borderRadius: 12, 
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}>
            {/* Error Alert */}
            {error && (
              <View style={{ 
                backgroundColor: '#fef2f2', 
                borderColor: '#fecaca', 
                borderWidth: 1, 
                padding: 12, 
                borderRadius: 8, 
                marginBottom: 16 
              }}>
                <Text style={{ color: '#dc2626', fontSize: 14 }}>{error}</Text>
              </View>
            )}

            {/* Username Field */}
            <FormControl isInvalid={!!errors.username} style={{ marginBottom: 16 }}>
              <FormControlLabel>
                <FormControlLabelText>Usuario</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                rules={{
                  required: 'El usuario es requerido',
                  minLength: {
                    value: 3,
                    message: 'El usuario debe tener al menos 3 caracteres'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      placeholder="Ingresa tu usuario"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </Input>
                )}
                name="username"
              />
              <FormControlError>
                <FormControlErrorText>
                  {errors.username?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* Password Field */}
            <FormControl isInvalid={!!errors.password} style={{ marginBottom: 16 }}>
              <FormControlLabel>
                <FormControlLabelText>Contraseña</FormControlLabelText>
              </FormControlLabel>
              <View style={{ position: 'relative' }}>
                <Controller
                  control={control}
                  rules={{
                    required: 'La contraseña es requerida',
                    minLength: {
                      value: 6,
                      message: 'La contraseña debe tener al menos 6 caracteres'
                    }
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input>
                      <InputField
                        placeholder="Ingresa tu contraseña"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={!showPassword}
                      />
                    </Input>
                  )}
                  name="password"
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: 12,
                    zIndex: 1
                  }}
                >
                  <Ionicons 
                    name={showPassword ? "eye-off" : "eye"} 
                    size={20} 
                    color="#6b7280" 
                  />
                </Pressable>
              </View>
              <FormControlError>
                <FormControlErrorText>
                  {errors.password?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* Forgot Password */}
            <View style={{ alignItems: 'flex-end', marginBottom: 16 }}>
              <Pressable>
                <Text style={{ fontSize: 14, color: '#e11d48' }}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </Pressable>
            </View>

            {/* Login Button */}
            <Button
              onPress={handleSubmit(onSubmit)}
              isDisabled={!isValid || isLoading}
              className="bg-pink-300 mb-6 rounded-lg"
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                {isLoading ? (
                  <ButtonText className="text-pink-800">Iniciando...</ButtonText>
                ) : (
                  <>
                    <Ionicons name="log-in" size={20} color="#9f1239" />
                    <ButtonText className="text-pink-800">Iniciar Sesión</ButtonText>
                  </>
                )}
              </View>
            </Button>

            {/* Divider */}
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              marginBottom: 24 
            }}>
              <View style={{ flex: 1, height: 1, backgroundColor: '#d1d5db' }} />
              <Text style={{ 
                fontSize: 14, 
                color: '#6b7280', 
                marginHorizontal: 16 
              }}>
                o
              </Text>
              <View style={{ flex: 1, height: 1, backgroundColor: '#d1d5db' }} />
            </View>

            {/* Register Link */}
            <View style={{ alignItems: 'center' }}>
              <Text style={{ 
                fontSize: 14, 
                color: '#6b7280', 
                marginBottom: 12 
              }}>
                ¿No tienes una cuenta?
              </Text>
              <Button
                variant="outline"
                onPress={handleRegisterPress}
                className="border-pink-300 bg-transparent rounded-lg"
              >
                <ButtonText className="text-pink-600">Crear Cuenta Nueva</ButtonText>
              </Button>
            </View>
          </View>

          {/* Demo Info */}
          <View style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
            padding: 16, 
            borderRadius: 8, 
            marginTop: 24, 
            marginBottom: 16 
          }}>
            <Text style={{ 
              fontSize: 12, 
              color: '#be185d', 
              textAlign: 'center' 
            }}>
              Demo: Usa cualquier usuario y contraseña para probar la app
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}