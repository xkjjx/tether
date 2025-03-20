import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SQLiteProvider } from 'expo-sqlite';

import { initDatabase } from '../database';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SQLiteProvider databaseName="myDatabase.db" onInit={initDatabase}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen name="people" options={{
          title: 'People',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />
        }}
        />
        <Tabs.Screen name="index" options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen name="meetings" options={{
          title: 'Past Meetings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
        }}
        />
      </Tabs>
    </SQLiteProvider>
  );
}
