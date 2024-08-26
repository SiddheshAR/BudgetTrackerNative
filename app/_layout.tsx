import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Suspense, useEffect,useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import {SQLiteProvider} from 'expo-sqlite/next'
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { Text, View } from 'react-native';

const loadDatabase = async()=>{
  const dbName = "mySQLiteDB.db";
  const dbAsset = require("../assets/mySQLiteDB.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if(!fileInfo.exists){
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}/SQLite`,
      {intermediates:true}
    );
  await FileSystem.downloadAsync(dbUri,dbFilePath);
  }
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [dbLoaded,setDbLoaded]=useState<boolean>(false);

  useEffect(()=>{
    loadDatabase().then(()=>setDbLoaded(true)).catch((e)=>console.error(e));
  },[])
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  if(!dbLoaded){
    return(
      <View>
        <Text>Unable to Load DB</Text>
      </View>)
  }

  return (
    <Suspense fallback={<View>
      <Text>Loading Database...</Text>
    </View>}>
      <SQLiteProvider databaseName='mySQLiteDB.db' useSuspense>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
