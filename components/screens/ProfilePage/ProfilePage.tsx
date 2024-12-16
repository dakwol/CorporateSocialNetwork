import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import ProfileForm from '../../features/profile/ui/ProfileForm';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Импортируем AsyncStorage

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    avatar: 'https://example.com/default-avatar.jpg', 
    name: 'John Doe',
    status: 'Hello, world!',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await fetch('http://192.168.0.14:5000/api/auth/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileSave = (data: { avatar: string; name: string; status: string }) => {
    setProfileData(data);
    Alert.alert('Profile Updated', `Name: ${data.name}\nStatus: ${data.status}`);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <ProfileForm initialData={profileData} onSubmit={handleProfileSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#06151F',
    height: '100%'
  },
  errorText: {
    color: 'red',
  },
});

export default ProfilePage;
