import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { formatToCurrency } from '@/helper';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export function Collapsible({
  children,
  title,
  percentage,
  sum,
  color,
}: PropsWithChildren & {
  title: string;
  color?: string;
  percentage: string;
  sum: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen(value => !value)}>
        <ThemedText style={{ flex: 2, color: color }} type="defaultSemiBold">
          {title}
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={{ flex: 2, color: color }}>
          {+percentage * 100}%
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={{ flex: 2, color: color }}>
          {formatToCurrency(sum)}
        </ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
