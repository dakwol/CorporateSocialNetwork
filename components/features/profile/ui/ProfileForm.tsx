import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native'; // Импортируем навигацию
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../app/routes/AppRoutes';

interface ProfileFormValues {
  avatar: string;
  name: string;
  status: string;
}

type ProfilePageNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileForm = ({
  initialData,
  onSubmit,
}: {
  initialData: ProfileFormValues;
  onSubmit: (data: ProfileFormValues) => void;
}) => {
  const { control, handleSubmit, setValue } = useForm<ProfileFormValues>({
    defaultValues: initialData,
  });

  const navigation = useNavigation<ProfilePageNavigationProp>(); 

  const handleSelectAvatar = () => {
    setValue('avatar', 'https://example.com/new-avatar.jpg');
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSelectAvatar}>
        <Image
          style={styles.avatar}
          source={require('../../../../assets/news.jpg')}
        />
      </TouchableOpacity>

      <Text style={styles.label}>Почта</Text>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Почта не заполнена' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              placeholder="Введите почту"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

      <Text style={styles.label}>Статус</Text>
      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your status"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.saveButton}>
        <Text style={styles.logoutButtonText}>Сохранение</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Выход</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 150
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  changeAvatarText: {
    textAlign: 'center',
    color: '#4CAFA1',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#4CAFA1',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    color: '#0F232C',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
    backgroundColor: '#4CAFA1',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#0F232C',
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileForm;
