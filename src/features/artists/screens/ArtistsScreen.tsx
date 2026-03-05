import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppScreen, AppText, AppSearchBar, Chip, ArtistCard } from '@/components';
import { LoadingState, ErrorState, EmptyState } from '@/components/composite/StateViews';
import { useArtists } from '@/hooks';
import { spacing } from '@/theme';
import type { ArtistsStackParamList } from '@/app/navigationTypes';
import type { Artist } from '@/types';

type Props = NativeStackScreenProps<ArtistsStackParamList, 'ArtistsList'>;

// Generate alphabet filter options
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const FILTER_OPTIONS = ['All', ...ALPHABET];

/**
 * Artists Browse Screen — displays artist grid with search and alphabet filter.
 *
 * Features:
 *  - Search bar for filtering artists by name
 *  - Alphabet quick-filter chips (All, A-Z)
 *  - Grid layout with ArtistCard components
 *  - Navigation to ArtistDetail screen
 */
export default function ArtistsScreen({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('All');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const { data: artists = [], isLoading, isError, refetch } = useArtists();

  // Filter artists based on search and selected letter
  const filteredArtists = useMemo(() => {
    let filtered = artists;

    // Apply letter filter
    if (selectedLetter !== 'All') {
      filtered = filtered.filter(
        (artist) => artist.name.charAt(0).toUpperCase() === selectedLetter
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((artist) =>
        artist.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [artists, selectedLetter, searchQuery]);

  const handleArtistPress = (artist: Artist) => {
    navigation.navigate('ArtistDetail', {
      artistId: artist.id,
      artistName: artist.name,
    });
  };

  const renderArtistCard = ({ item, index }: { item: Artist; index: number }) => {
    const initial = item.name.charAt(0).toUpperCase();
    return (
      <ArtistCard
        name={item.name}
        songCount={item.songCount}
        initial={initial}
        alternateGradient={index % 2 === 1}
        onPress={() => handleArtistPress(item)}
      />
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <AppScreen>
        <AppText variant="pageTitle">Artists</AppText>
        <LoadingState message="Loading artists..." />
      </AppScreen>
    );
  }

  // Error state
  if (isError) {
    return (
      <AppScreen>
        <AppText variant="pageTitle">Artists</AppText>
        <ErrorState
          message="Failed to load artists"
          onRetry={refetch}
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <AppText variant="pageTitle">Artists</AppText>
      <AppText variant="pageSubtitle" style={styles.subtitle}>
        Browse lyrics by artist
      </AppText>

      {/* Search Bar */}
      <AppSearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search artists..."
        active={isSearchActive}
        onFocus={() => setIsSearchActive(true)}
        onBlur={() => setIsSearchActive(false)}
      />

      {/* Alphabet Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
        contentContainerStyle={styles.filterContent}
      >
        {FILTER_OPTIONS.map((letter) => (
          <Chip
            key={letter}
            label={letter}
            active={selectedLetter === letter}
            onPress={() => setSelectedLetter(letter)}
          />
        ))}
      </ScrollView>

      {/* Artists Grid */}
      {filteredArtists.length === 0 ? (
        <EmptyState
          title="No artists found"
          subtitle={
            searchQuery || selectedLetter !== 'All'
              ? 'Try adjusting your filters'
              : undefined
          }
        />
      ) : (
        <View style={styles.listContainer}>
          <FlashList
            data={filteredArtists}
            renderItem={renderArtistCard}
            estimatedItemSize={180}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  filterRow: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    maxHeight: 50,
  },
  filterContent: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  listContainer: {
    flex: 1,
    marginTop: spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.md,
  },
});