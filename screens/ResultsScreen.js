import React, { useEffect, useState } from 'react';
import {View,Text,Image,StyleSheet,ActivityIndicator,SafeAreaView,FlatList, TouchableOpacity} from 'react-native';
import { Search, getImageUrl } from '../Api';

export default function ResultsScreen({ route, navigation }) {
  // Get parameters passed from HomeScreen
  const { query, artist, style, yearFrom, yearTo } = route.params;
  // State to hold fetched artworks and loading state
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArtworks() {
      try {
        // Fetch artworks based on the search query
        const results = await Search({ query });
        // Filter results by year, title, artist, and style
        const filtered = results.filter((item) => {
          const date = parseInt(item.date_start);
          const from = parseInt(yearFrom || '0');
          const to = parseInt(yearTo || '2025');

          const dateMatch = !isNaN(date) && date >= from && date <= to;
          const titleMatch = query
            ? item.title?.toLowerCase().includes(query.toLowerCase())
            : true;
          const artistMatch = artist
            ? item.artist_title?.toLowerCase().includes(artist.toLowerCase())
            : true;
          const styleMatch = style
            ? item.style_title?.toLowerCase().includes(style.toLowerCase())
            : true;

          return dateMatch && titleMatch && artistMatch && styleMatch;
        });

        setArtworks(filtered);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchArtworks();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fef6e5' }}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#d77312" />
        </View>
      ) : (
        <FlatList
          data={artworks}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}

          // Show fallback if no artworks match the filters
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
            <Image
              source={require('../assets/no-results.png')} 
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.noResultsText}>Ops... Try adjusting your filters or search again.</Text>
        
          </View>
          }
            // Render each artwork in the list
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item.id })}>
              <View style={styles.card}>
                <Image
                  source={{ uri: getImageUrl(item.image_id) }}
                  style={styles.image}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.year}>
                    {item.date_start ? `Year: ${item.date_start}` : 'Year unknown'}
                  </Text>
                  <Text style={styles.artist}>
                    {item.artist_title || 'Unknown artist'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fef6e5',
  },
  list: {
    padding: 16,
    backgroundColor: '#fef6e5',
  },
  noResultsText: {
    fontSize: 30,
    color: '#083645',
    textAlign: 'center',
    marginTop: 30,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
  },
  textContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#083645',
    marginBottom: 4,
  },
  year: {
    fontSize: 14,
    color: '#083645',
  },
  artist: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fef6e5',
  },
  emptyImage: {
    width: 300,
    height: 400,
    marginBottom: 24,
  },
});
