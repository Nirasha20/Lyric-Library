import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet, Platform } from 'react-native';

import { colors } from '@/theme';
import type {
  RootTabParamList,
  ArtistsStackParamList,
  SongsStackParamList,
  SearchStackParamList,
  SavedStackParamList,
} from './navigationTypes';

// ─── Screen Imports ──────────────────────────────────────────────
// Stub screens — interns will flesh these out in Sprint 2 & 3
import ArtistsScreen from '@/features/artists/screens/ArtistsScreen';
import ArtistDetailScreen from '@/features/artists/screens/ArtistDetailScreen';
import AlbumDetailScreen from '@/features/artists/screens/AlbumDetailScreen';
import SongsScreen from '@/features/songs/screens/SongsScreen';
import LyricsScreen from '@/features/songs/screens/LyricsScreen';
import SearchScreen from '@/features/search/screens/SearchScreen';
import SavedScreen from '@/features/saved/screens/SavedScreen';

// ─── Stack Navigators ────────────────────────────────────────────

const ArtistsStack = createNativeStackNavigator<ArtistsStackParamList>();
const SongsStack = createNativeStackNavigator<SongsStackParamList>();
const SearchStack = createNativeStackNavigator<SearchStackParamList>();
const SavedStack = createNativeStackNavigator<SavedStackParamList>();

function ArtistsStackNavigator() {
  return (
    <ArtistsStack.Navigator screenOptions={{ headerShown: false }}>
      <ArtistsStack.Screen name="ArtistsList" component={ArtistsScreen} />
      <ArtistsStack.Screen name="ArtistDetail" component={ArtistDetailScreen} />
      <ArtistsStack.Screen name="AlbumDetail" component={AlbumDetailScreen} />
      <ArtistsStack.Screen name="Lyrics" component={LyricsScreen} />
    </ArtistsStack.Navigator>
  );
}

function SongsStackNavigator() {
  return (
    <SongsStack.Navigator screenOptions={{ headerShown: false }}>
      <SongsStack.Screen name="SongsList" component={SongsScreen} />
      <SongsStack.Screen name="Lyrics" component={LyricsScreen} />
    </SongsStack.Navigator>
  );
}

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="SearchMain" component={SearchScreen} />
      <SearchStack.Screen name="ArtistDetail" component={ArtistDetailScreen} />
      <SearchStack.Screen name="Lyrics" component={LyricsScreen} />
    </SearchStack.Navigator>
  );
}

function SavedStackNavigator() {
  return (
    <SavedStack.Navigator screenOptions={{ headerShown: false }}>
      <SavedStack.Screen name="SavedList" component={SavedScreen} />
      <SavedStack.Screen name="Lyrics" component={LyricsScreen} />
    </SavedStack.Navigator>
  );
}

// ─── Tab Icon Component ──────────────────────────────────────────

interface TabIconProps {
  focused: boolean;
}

function TabIcon({ focused }: Readonly<TabIconProps>) {
  return (
    <View
      style={[
        styles.tabIcon,
        focused ? styles.tabIconActive : styles.tabIconInactive,
      ]}
    />
  );
}

function renderTabIcon({ focused }: Readonly<{ focused: boolean }>) {
  return <TabIcon focused={focused} />;
}

// ─── Root Tab Navigator ──────────────────────────────────────────

const Tab = createBottomTabNavigator<RootTabParamList>();

export function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: renderTabIcon,
      }}
    >
      <Tab.Screen
        name="ArtistsTab"
        component={ArtistsStackNavigator}
        options={{
          tabBarLabel: 'Artists',
        }}
      />
      <Tab.Screen
        name="SongsTab"
        component={SongsStackNavigator}
        options={{
          tabBarLabel: 'Songs',
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStackNavigator}
        options={{
          tabBarLabel: 'Search',
        }}
      />
      <Tab.Screen
        name="SavedTab"
        component={SavedStackNavigator}
        options={{
          tabBarLabel: 'Saved',
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.bgElevated,
    borderTopWidth: 2,
    borderTopColor: colors.border,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 12 : 8,
    height: Platform.OS === 'ios' ? 88 : 74,
  },
  tabBarItem: {
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  tabIcon: {
    width: 28,
    height: 28,
    borderRadius: 10,
  },
  tabIconActive: {
    backgroundColor: colors.primary,
    opacity: 1,
  },
  tabIconInactive: {
    backgroundColor: colors.textTertiary,
    opacity: 0.2,
  },
});
