import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, radii } from '@/theme';
import { AppText } from './AppText';

interface ChipProps {
  /** Chip label */
  label: string;
  /** Whether this chip is selected */
  active?: boolean;
  /** Press handler */
  onPress: () => void;
  /** Additional styles */
  style?: ViewStyle;
}

/**
 * Filter chip / pill button — matches wireframe filter-tab styling.
 * Active state: purple bg + white text. Inactive: white bg + gray border.
 *
 * Usage:
 *   <Chip label="A-Z" active={sort === 'a-z'} onPress={() => setSort('a-z')} />
 */
export function Chip({ label, active = false, onPress, style }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        active ? styles.active : styles.inactive,
        pressed && styles.pressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={label}
    >
      <AppText
        variant="chipLabel"
        color={active ? colors.white : colors.textSecondary}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm + 2,
    borderRadius: radii.md,
    borderWidth: 2,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  inactive: {
    backgroundColor: colors.bgElevated,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.85,
  },
});
