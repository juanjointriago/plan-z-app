import { Avatar, AvatarFallbackText, AvatarImage } from '@/src/components/ui/avatar';
import { Button, ButtonText } from '@/src/components/ui/button';
import { FormControl, FormControlError, FormControlErrorText, FormControlLabel, FormControlLabelText } from '@/src/components/ui/form-control';
import { Input, InputField } from '@/src/components/ui/input';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useAuthStore } from '../../src/stores/auth/auth.store';

interface RegisterFormData {
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  cedula: string;
  gender: string;
  profilePhoto?: any;
}

export default function RegisterScreen() {
  const { register, isLoading } = useAuthStore();
  const [error, setError] = useState<string>('');
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');

  const { 
    control, 
    handleSubmit, 
    setValue,
    formState: { errors, isValid } 
  } = useForm<RegisterFormData>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      cedula: '',
      gender: '',
      profilePhoto: undefined,
    }
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError('');
      await register({
        ...data,
        profilePhoto: profilePhoto || undefined,
      });
      router.replace('/(tabs)');
    } catch (error) {
      setError('Error al crear la cuenta. Por favor intenta nuevamente.');
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleLoginPress = () => {
    router.push('/(auth)/login');
  };

  const handlePhotoUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Se requiere permiso para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const handleGenderChange = (value: string) => {
    setSelectedGender(value);
    setValue('gender', value, { shouldValidate: true });
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
            Crear Cuenta
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
            <Text style={{ 
              fontSize: 20, 
              fontWeight: '600', 
              color: '#9f1239', 
              textAlign: 'center',
              marginBottom: 8
            }}>
              ¡Únete a PlanZ!
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: '#e11d48', 
              textAlign: 'center' 
            }}>
              Crea tu cuenta y descubre eventos increíbles cerca de ti
            </Text>
          </View>

          {/* Register Form */}
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

            {/* Profile Photo */}
            <View style={{ alignItems: 'center', marginBottom: 24 }}>
              <Text style={{ 
                fontSize: 14, 
                color: '#374151', 
                fontWeight: '500', 
                marginBottom: 12 
              }}>
                Foto de Perfil
              </Text>
              <Pressable onPress={handlePhotoUpload}>
                <Avatar size="xl" style={{ backgroundColor: '#e5e7eb' }}>
                  {profilePhoto ? (
                    <AvatarImage source={{ uri: profilePhoto }} alt="Profile" />
                  ) : (
                    <AvatarFallbackText>
                      <Ionicons name="camera" size={32} color="#6b7280" />
                    </AvatarFallbackText>
                  )}
                </Avatar>
              </Pressable>
              <Pressable onPress={handlePhotoUpload} style={{ marginTop: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Ionicons name="cloud-upload" size={16} color="#be185d" />
                  <Text style={{ fontSize: 14, color: '#e11d48' }}>
                    {profilePhoto ? 'Cambiar foto' : 'Subir foto'}
                  </Text>
                </View>
              </Pressable>
            </View>

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

            {/* First Name Field */}
            <FormControl isInvalid={!!errors.firstName} style={{ marginBottom: 16 }}>
              <FormControlLabel>
                <FormControlLabelText>Nombres</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                rules={{
                  required: 'Los nombres son requeridos',
                  minLength: {
                    value: 2,
                    message: 'Los nombres deben tener al menos 2 caracteres'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      placeholder="Ingresa tus nombres"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      autoCapitalize="words"
                    />
                  </Input>
                )}
                name="firstName"
              />
              <FormControlError>
                <FormControlErrorText>
                  {errors.firstName?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* Last Name Field */}
            <FormControl isInvalid={!!errors.lastName} style={{ marginBottom: 16 }}>
              <FormControlLabel>
                <FormControlLabelText>Apellidos</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                rules={{
                  required: 'Los apellidos son requeridos',
                  minLength: {
                    value: 2,
                    message: 'Los apellidos deben tener al menos 2 caracteres'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      placeholder="Ingresa tus apellidos"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      autoCapitalize="words"
                    />
                  </Input>
                )}
                name="lastName"
              />
              <FormControlError>
                <FormControlErrorText>
                  {errors.lastName?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* Birth Date Field */}
            <FormControl isInvalid={!!errors.birthDate} style={{ marginBottom: 16 }}>
              <FormControlLabel>
                <FormControlLabelText>Fecha de Nacimiento</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                rules={{
                  required: 'La fecha de nacimiento es requerida'
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      placeholder="DD/MM/AAAA"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                    />
                  </Input>
                )}
                name="birthDate"
              />
              <FormControlError>
                <FormControlErrorText>
                  {errors.birthDate?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* Cedula Field */}
            <FormControl isInvalid={!!errors.cedula} style={{ marginBottom: 16 }}>
              <FormControlLabel>
                <FormControlLabelText>Cédula</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                rules={{
                  required: 'La cédula es requerida',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'La cédula debe tener 10 dígitos'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      placeholder="Ingresa tu cédula"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      keyboardType="numeric"
                    />
                  </Input>
                )}
                name="cedula"
              />
              <FormControlError>
                <FormControlErrorText>
                  {errors.cedula?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* Gender Field - Using a simple picker approach */}
            <FormControl isInvalid={!!errors.gender} style={{ marginBottom: 24 }}>
              <FormControlLabel>
                <FormControlLabelText>Género</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                rules={{
                  required: 'El género es requerido'
                }}
                render={({ field: { onChange } }) => (
                  <View style={{ gap: 8 }}>
                    {[
                      { label: 'Masculino', value: 'masculino' },
                      { label: 'Femenino', value: 'femenino' },
                      { label: 'Otro', value: 'otro' },
                      { label: 'Prefiero no decir', value: 'no_especifica' }
                    ].map((option) => (
                      <Pressable
                        key={option.value}
                        onPress={() => handleGenderChange(option.value)}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 12,
                          borderWidth: 1,
                          borderColor: selectedGender === option.value ? '#fda4af' : '#d1d5db',
                          borderRadius: 8,
                          backgroundColor: selectedGender === option.value ? '#fdf2f8' : 'white'
                        }}
                      >
                        <View style={{ 
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          borderWidth: 2,
                          borderColor: selectedGender === option.value ? '#e11d48' : '#d1d5db',
                          backgroundColor: selectedGender === option.value ? '#e11d48' : 'transparent',
                          marginRight: 12,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                          {selectedGender === option.value && (
                            <View style={{ 
                              width: 8,
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: 'white'
                            }} />
                          )}
                        </View>
                        <Text style={{
                          fontSize: 16,
                          color: selectedGender === option.value ? '#e11d48' : '#374151'
                        }}>
                          {option.label}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                )}
                name="gender"
              />
              <FormControlError>
                <FormControlErrorText>
                  {errors.gender?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* Register Button */}
            <Button
              onPress={handleSubmit(onSubmit)}
              isDisabled={!isValid || isLoading}
              style={{ 
                backgroundColor: '#fda4af', 
                marginBottom: 24,
                borderRadius: 8
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                {isLoading ? (
                  <ButtonText style={{ color: '#9f1239' }}>Creando cuenta...</ButtonText>
                ) : (
                  <>
                    <Ionicons name="person-add" size={20} color="#9f1239" />
                    <ButtonText style={{ color: '#9f1239' }}>Crear Cuenta</ButtonText>
                  </>
                )}
              </View>
            </Button>

            {/* Login Link */}
            <View style={{ alignItems: 'center' }}>
              <Text style={{ 
                fontSize: 14, 
                color: '#6b7280', 
                marginBottom: 12 
              }}>
                ¿Ya tienes una cuenta?
              </Text>
              <Button
                variant="outline"
                onPress={handleLoginPress}
                style={{ 
                  borderColor: '#fda4af', 
                  backgroundColor: 'transparent',
                  borderRadius: 8
                }}
              >
                <ButtonText style={{ color: '#e11d48' }}>Iniciar Sesión</ButtonText>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}