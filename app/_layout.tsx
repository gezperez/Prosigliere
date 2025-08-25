import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import { Colors } from '@/app/ds/components/Text/enums/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { store } from '@/store';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Caudex-Regular': require('../assets/fonts/Caudex-Regular.ttf'),
    'Caudex-Bold': require('../assets/fonts/Caudex-Bold.ttf'),
    'Caudex-Italic': require('../assets/fonts/Caudex-Italic.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.WHITE,
            },
            headerTintColor: Colors.DARK_BROWN,
            headerTitleStyle: {
              fontFamily: 'Caudex-Bold',
              fontSize: 22,
            },
            headerShadowVisible: false,
            headerBackTitle: 'Back',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="house-selection"
            options={{ title: 'House Selection' }}
          />
          <Stack.Screen name="settings" />
          <Stack.Screen
            name="character/[id]"
            options={({ route }) => ({
              title: 'Character Details',
              headerStyle: {
                backgroundColor: Colors.WHITE,
                borderBottomWidth: 2,
                borderBottomColor: Colors.DARK_BROWN,
              },
              headerTintColor: Colors.DARK_BROWN,
              headerTitleStyle: {
                fontFamily: 'Caudex-Bold',
                fontSize: 18,
              },
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerBackTitle: 'Back',
            })}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
