import { Alert, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginForm() {
  const baseUrl = 'https://v2u4uuu6j5.execute-api.ap-southeast-1.amazonaws.com';
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  async function loginHandler() {
    const url = '/auth/login';

    const formData = new FormData();
    formData.append('account', account);
    formData.append('password', password);
    const res = await fetch(`${baseUrl}${url}`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    if (res.ok === true) {
      const accessToken = res.headers
        .get('set-cookie')
        ?.split(';')[0]
        .split('=')[1];

      if (accessToken !== undefined)
        await AsyncStorage.setItem('accessToken', accessToken);
      router.navigate('/explore');
    } else {
      Alert.alert('login failed');
    }
  }

  return (
    <View>
      <Link href="/about">About</Link>
      <TextInput
        label="account"
        value={account}
        onChangeText={text => setAccount(text)}
      />
      <TextInput
        label="password"
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button mode="contained" onPress={loginHandler}>
        Login
      </Button>
    </View>
  );
}
