import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {Image} from 'react-native';

interface News {
  id: string;
  title: string;
  description: string;
}

const NewsList = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchNews = async () => {
        setLoading(true);
        try {
          const response = await fetch('http://192.168.0.14:5000/api/news');
          if (!response.ok) {
            throw new Error('Failed to fetch news');
          }
          const data = await response.json();
          setNews(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchNews(); 

      const intervalId = setInterval(fetchNews, 1000);

      return () => clearInterval(intervalId);

    }, []) 
  );

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <FlatList
      data={news}
      keyExtractor={(item) => item.id}
      style={{backgroundColor: '#06151F', padding: 12}}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
        style={{width: '100%', height: 150, borderRadius: 10, marginBottom: 10}}
        source={require('../../../../assets/news.jpg')}
      />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>  
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#4CAFA1',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: "#fff"
  },
  description: {
    fontSize: 14,
    color: '#fff',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default NewsList;
