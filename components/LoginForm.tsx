import { Alert, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordValidate from 'react-native-password-validate-checklist';

export default function LoginForm() {
  const baseUrl = 'https://v2u4uuu6j5.execute-api.ap-southeast-1.amazonaws.com';
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
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
      <PasswordValidate
        newPassword={password}
        confirmPassword={password}
        validationRules={[
          {
            key: 'MIN_LENGTH',
            ruleValue: 9,
            label: 'Should contain more than 9 characters',
          },
          {
            key: 'MAX_LENGTH',
            ruleValue: 15,
            label: 'Should contain less than 15 characters',
          },
          { key: 'LOWERCASE_LETTER' },
          { key: 'UPPERCASE_LETTER' },
          { key: 'NUMERIC' },
          { key: 'PASSWORDS_MATCH' },
          { key: 'SPECIAL_CHARS' },
        ]}
        onPasswordValidateChange={validatedBoolean =>
          setValidated(validatedBoolean)
        }
      />
      <Button disabled={validated} mode="contained" onPress={loginHandler}>
        Login
      </Button>
    </View>
  );
}
