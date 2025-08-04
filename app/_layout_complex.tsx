import "@/global.css";
import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type UserRole = 'admin' | 'customer';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const router = useRouter();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  // Constante de rol - cambiar según tu lógica de autenticación
  const role: UserRole = 'customer'; // Cambiar entre 'admin' y 'customer'

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (!loaded || isNavigationReady) return;

    // Timeout para evitar problemas de hidratación
    const timer = setTimeout(() => {
      try {
        console.log('Navigating with role:', role);
        switch (role) {
          case 'admin':
            router.replace('/(tabsAdmin)');
            break;
          case 'customer':
            router.replace('/(tabs)');
            break;
          default:
            router.replace('/(tabs)');
        }
        setIsNavigationReady(true);
      } catch (error) {
        console.log('Navigation error:', error);
      }
    }, 500); // Aumentar el timeout

    return () => clearTimeout(timer);
  }, [loaded, isNavigationReady, router, role]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode={colorScheme === 'dark' ? 'dark' : 'light'}>
        <ThemeProvider value={theme}>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Slot />
        </ThemeProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}