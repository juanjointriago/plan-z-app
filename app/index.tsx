import { Redirect } from 'expo-router';

export default function Index() {
  // Función para obtener el rol del usuario - cambiar según tu lógica de autenticación
  const getUserRole = (): 'admin' | 'customer' => {
    // Aquí puedes implementar tu lógica de autenticación
    // Por ejemplo, leer de AsyncStorage, Context, etc.
    return 'customer'; // Por defecto customer
  };
  
  const role = getUserRole();
  
  // Redirigir basado en el rol
  if (role === 'admin') {
    return <Redirect href="/(tabsAdmin)" />;
  }
  
  return <Redirect href="/(tabs)" />;
}