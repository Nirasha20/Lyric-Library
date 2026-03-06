import React, { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, radii, shadows, gradients } from '@/theme';
import { AppText } from '../primitives/AppText';

interface ArtistCardProps {
  /** Artist display name */
  name: string;
  /** Number of songs */
  songCount: number;
  /** First letter for avatar */
  initial: string;
  /** Use alternate gradient (gradient2 vs gradient1) */
  alternateGradient?: boolean;
  /** Press handler (navigate to detail) */
  onPress: () => void;
}

/**
 * Artist grid card — avatar circle + name + song count.
 * Matches wireframe .artist-card layout.
 */
export const ArtistCard = memo(function ArtistCard({
  name,
  songCount,
  initial,
  alternateGradient = false,
  onPress,
}: Readonly<ArtistCardProps>) {
  const selectedGradient = alternateGradient
    ? gradients.gradient2
    : gradients.gradient1;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${songCount} songs`}
    >
      <LinearGradient
        colors={[...selectedGradient.colors]}
        start={selectedGradient.start}
        end={selectedGradient.end}
        style={styles.avatar}
      >
        <AppText variant="avatarLetterSmall" color={colors.white}>
          {initial}
        </AppText>
      </LinearGradient>
      <AppText variant="cardTitle" center numberOfLines={1}>
        {name}
      </AppText>
      <AppText variant="cardCaption" center numberOfLines={1}>
        {songCount} songs
      </AppText>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    aspectRatio: 0.85,
    backgroundColor: colors.bgElevated,
    borderRadius: radii.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    margin: spacing.xs,
    ...shadows.card,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm + 2,
  },
});
