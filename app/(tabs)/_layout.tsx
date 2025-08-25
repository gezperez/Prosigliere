import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { Colors } from '@/app/ds/components/Text/enums/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor={Colors.WHITE} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.HUFFLEPUFF,
          tabBarInactiveTintColor: Colors.DARK_BROWN,
          tabBarStyle: {
            backgroundColor: Colors.WHITE,
            borderTopWidth: 1,
            borderTopColor: Colors.DARK_BROWN,
            paddingBottom: 8,
            paddingTop: 8,
            shadowColor: Colors.BLACK,
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 8,
          },
          tabBarLabelStyle: {
            fontFamily: 'Caudex-Regular',
            fontSize: 12,
            fontWeight: '600',
          },
          headerTintColor: Colors.DARK_BROWN,
          headerStyle: {
            backgroundColor: Colors.WHITE,
          },
          headerTitleStyle: {
            fontFamily: 'Caudex-Regular',
            fontWeight: '600',
            fontSize: 24,
          },
        }}
      >
        <Tabs.Screen
          name="characters"
          options={{
            title: 'Characters',
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol
                size={focused ? 32 : 28}
                name="person.3.fill"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="spells"
          options={{
            title: 'Spells',
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol
                size={focused ? 32 : 28}
                name="sparkles"
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
