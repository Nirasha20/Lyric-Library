import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppScreen, AppText } from '@/components';

/**
 * Artists Browse Screen — stub.
 *
 * Sprint 2 Tasks:
 *  - S2-01: Render artist grid using FlashList + ArtistCard
 *  - S2-02: Add alphabetical section headers
 *  - S2-03: Wire navigation to ArtistDetailScreen
 */
export default function ArtistsScreen() {
  return (
    <AppScreen>
      <AppText variant="pageTitle">Artists</AppText>
      <View style={styles.placeholder}>
        <AppText variant="pageSubtitle">
          🎤  Artist grid will be implemented here (Sprint 2)
        </AppText>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});