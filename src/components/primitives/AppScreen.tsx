import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme';

interface AppScreenProps {
  children: ReactNode;
  /** Override background color (default: bgPrimary) */
  backgroundColor?: string;
  /** Add horizontal padding (default: true) */
  padded?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

/**
 * Base screen wrapper — handles safe area insets and consistent background.
 *
 * Usage:
 *   <AppScreen>
 *     <AppText variant="pageTitle">Artists</AppText>
 *   </AppScreen>
 */
export function AppScreen({
  children,
  backgroundColor = colors.bgPrimary,
  padded = true,
  style,
}: Readonly<AppScreenProps>) {
  const insets = useSafeAreaInsets();
  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor,
      paddingTop: insets.top + spacing.sm,
      paddingBottom: insets.bottom,
    },
  });

  return (
    <View
      style={[
        styles.container,
        padded ? styles.padded : styles.unpadded,
        dynamicStyles.container,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: spacing.xxl,
  },
  unpadded: {
    paddingHorizontal: 0,
  },
});
