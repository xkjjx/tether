import { StyleSheet, Image, Platform } from 'react-native';
import { useEffect, useState } from 'react';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';

interface Meeting {
  name: string,
  time: Date,
  person_id: number
}

export default function TabTwoScreen() {
  const db: SQLiteDatabase = useSQLiteContext();
  const [meetings, setMeetings] = useState<Meeting[]>([])

  useEffect(() => {
    async function getData() {
      const result = await db.getAllAsync<Meeting>('SELECT * FROM meeting');
      setMeetings(result);
    }
    getData();
  }, [])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      <Collapsible title="File-based routing">
        {meetings.map((item, index) => (
          <ThemedText key={index}>
            {item.name}
          </ThemedText>
        ))}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
