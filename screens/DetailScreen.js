import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { getImageUrl } from '../Api';

export default function DetailScreen({ route }) {
  const { id } = route.params;
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArtwork() {
      try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
        const json = await response.json();
        setArtwork(json.data);
      } catch (error) {
        console.error('Error loading artwork details:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArtwork();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ec9918" />
      </View>
    );
  }

  if (!artwork) {
    return (
      <View style={styles.center}>
        <Text>Artwork not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fef6e5' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: getImageUrl(artwork.image_id) }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>{artwork.title}</Text>
        <Text style={styles.field}><Text style={styles.fieldLabel}>Artist:</Text> {artwork.artist_title || 'Unknown'}</Text>
        <Text style={styles.field}><Text style={styles.fieldLabel}>Year:</Text> {artwork.date_display || 'Unknown'}</Text>
        <Text style={styles.field}><Text style={styles.fieldLabel}>Medium:</Text> {artwork.medium_display || 'Unknown'}</Text>
        <Text style={styles.field}><Text style={styles.fieldLabel}>Dimensions:</Text> {artwork.dimensions || 'Unknown'}</Text>
        <Text style={styles.field}><Text style={styles.fieldLabel}>Place of Origin:</Text> {artwork.place_of_origin || 'Unknown'}</Text>
        <Text style={styles.field}><Text style={styles.fieldLabel}>Classification:</Text> {artwork.classification_title || 'Unknown'}</Text>
        <Text style={styles.field}><Text style={styles.fieldLabel}>Style:</Text> {artwork.style_title || 'Unknown'}</Text>
        <Text style={styles.description}>{artwork.thumbnail?.alt_text || 'No description available.'}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fef6e5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fef6e5',
  },
  imageWrapper: {
    width: '100%',
    height: 400,
    marginBottom: 20,
  },
  fullImage: {
    width: '100%',
    height: 400,
    backgroundColor: '#ccc',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    color: '#083645',
    textAlign: 'center',
  },
  field: {
    fontSize: 16,
    color: '#083645',
    marginVertical: 6,
    lineHeight: 22,
    paddingLeft: 10,
  },
  fieldLabel: {
    fontWeight: '700',
    color: '#083645',
  },
  description: {
    marginTop: 12,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#083645',
    textAlign: 'center',
    padding: 8,
  },
});

