import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';

interface News {
  id: string;
  title: string;
  description: string;
}

const AdminNews = ({ navigation }: any) => {
  const [news, setNews] = useState<News[]>([]); 
   const [loading, setLoading] = useState<boolean>(false); 
   const [error, setError] = useState<string | null>(null); 
 
   useEffect(() => {
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
   }, []); 
 
   if (loading) {
     return <ActivityIndicator size="large" color="#0000ff" />; 
   }
 
   if (error) {
     return <Text style={styles.error}>{error}</Text>; 
   }
 

  const handleHide = (newsId) => {
    setNews((prevNews) =>
      prevNews.map((item) =>
        item.id === newsId ? { ...item, isHidden: true } : item
      )
    );
    Alert.alert('Новость скрыта!');
  };

  const handleDelete = (newsId) => {
    setNews((prevNews) => prevNews.filter((item) => item.id !== newsId));
    Alert.alert('Новость удалена!');
  };

  const renderNewsItem = ({ item }) => (
    <View style={styles.newsContainer}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <TouchableOpacity
        style={styles.hideButton}
        onPress={() => handleHide(item.id)}
      >
        <Text style={styles.hideButtonText}>
          {item.isHidden ? 'Скрыто' : 'Скрыть'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Удалить</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={renderNewsItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#06151F',
    paddingTop: 60
  },
  newsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#4CAFA1',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    color: '#0F232C'
  },
  hideButton: {
    backgroundColor: '#0F232C',
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  hideButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AdminNews;
