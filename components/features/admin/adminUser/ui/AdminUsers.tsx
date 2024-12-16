import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const AdminUsers = () => {
  const [users, setUsers] = useState([
    { id: '1', name: 'Иван Иванов', status: 'active' },
    { id: '2', name: 'Мария Петрова', status: 'active' },
    { id: '3', name: 'Алексей Смирнов', status: 'blocked' },
  ]);

  const handleBlock = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: 'blocked' } : user
      )
    );
    Alert.alert('Пользователь заблокирован!');
  };

  const handleUnblock = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: 'active' } : user
      )
    );
    Alert.alert('Пользователь разблокирован!');
  };

  const renderUser = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userStatus}>
        {item.status === 'active' ? 'Активен' : 'Заблокирован'}
      </Text>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() =>
          item.status === 'active' ? handleBlock(item.id) : handleUnblock(item.id)
        }
      >
        <Text style={styles.actionButtonText}>
          {item.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
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
  userContainer: {
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
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  userStatus: {
    fontSize: 14,
    color: '#0F232C',
  },
  actionButton: {
    backgroundColor: '#4CAFA1',
    padding: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#06151F',
    fontWeight: 'bold',
  },
});

export default AdminUsers;
