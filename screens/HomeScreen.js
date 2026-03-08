import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,SafeAreaView,Image,ScrollView,} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [artist, setArtist] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [style, setStyle] = useState('');

  function Search() {
    navigation.navigate('Results', {
      query,
      artist,
      yearFrom,
      yearTo,
      style,
    });
  }

  return (
    <SafeAreaView style={styles.screen}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Museum Search</Text>
        </View>
         {/* Scrollable content */}
        <ScrollView contentContainerStyle={styles.container}>
          {/* Illustration banner */}
          <Image
            source={require('../assets/art_banner.png')}
            style={styles.bannerImage}
            resizeMode="contain"
          />
           {/* Search input */}
          <Text style={styles.label}>Search for artworks</Text>
          
          <View style={styles.inputWithIcon}>
            <Icon name="search" size={20} color="#999" style={styles.icon} />
            <TextInput
              style={styles.inputField}
              placeholder="e.g. Flower"
              value={query}
              onChangeText={setQuery}
              placeholderTextColor="#999"
            />
          </View>
            {/* Filter section */}
          <Text style={styles.label}>Filter</Text>

          <TextInput
            style={styles.input}
            placeholder="Artist (e.g. Van Gogh)"
            value={artist}
            onChangeText={setArtist}
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.half]}
              placeholder="Year from"
              keyboardType="numeric"
              value={yearFrom}
              onChangeText={setYearFrom}
            />
            <TextInput
              style={[styles.input, styles.half]}
              placeholder="Year to"
              keyboardType="numeric"
              value={yearTo}
              onChangeText={setYearTo}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Type (e.g. Painting)"
            value={style}
            onChangeText={setStyle}
          />
           {/* Search button */}
          <TouchableOpacity style={styles.button} onPress={Search}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fef6e5',
  },
  banner: {
    backgroundColor: '#fef6e5',
    paddingVertical: 20,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 40,
    color: '#083645',
    fontWeight: '700',
  },
  container: {
    padding: 24,
    backgroundColor: '#fef6e5',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 180,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#083645',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#0a1f33',
    borderWidth: 1,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    color: '#0a1f33',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0a1f33',
    paddingHorizontal: 12,
    marginBottom: 16,
    width: '100%',
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: '#0a1f33',
  },
  icon: {
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  half: {
    width: '48%',
  },
  button: {
    backgroundColor: '#d77312',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});
