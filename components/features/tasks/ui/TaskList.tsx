import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const MOCK_TASKS = [
  { id: '1', title: 'Сдать отчет до пятницы', status: 'В процессе' },
  { id: '2', title: 'Обновить данные в CRM', status: 'Не начато' },
  { id: '3', title: 'Провести встречу с клиентами', status: 'Завершено' },
];

const TaskList = () => {
  return (
    <FlatList
      data={MOCK_TASKS}
      keyExtractor={(item) => item.id}
      style={{backgroundColor: '#06151F', padding: 12}}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.status}>Статус: {item.status}</Text>
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
    color: '#fff',
  },
  status: {
    fontSize: 14,
    color: '#fff',
  },
});

export default TaskList;
