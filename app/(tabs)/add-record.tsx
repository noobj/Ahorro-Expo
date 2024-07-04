import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Alert, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useContext, useEffect, useState } from 'react';
import { Category } from '@/types/Category.interface';
import CategoryList from '@/components/Category';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchOrRefreshAuthFirebase } from '@/helper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { CurrentLoginStatusContext } from '@/components/CurrentLoginStatusContext';
import { router } from 'expo-router';
import cookieManager from '@/components/CookieManager';
import { Picker } from '@react-native-picker/picker';
import CategorySelectList from '@/components/CategorySelectList';

export default function TabTwoScreen() {
  async function logout() {
    setCurrentLoginStatus(false);
    await AsyncStorage.removeItem('accessToken');
    await cookieManager.clearAll();
    router.navigate('/');
  }
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>('');
  const [amount, setAmount] = useState('0');
  const [desc, setDesc] = useState('');
  const [startDate, setStartDate] = useState(new Date('2020-06-01'));
  const [startDateOpen, setStartDateOpen] = useState(false);
  const { currentLoginStatus, setCurrentLoginStatus } = useContext(
    CurrentLoginStatusContext,
  );

  useEffect(() => {
    async function fetchEntries() {
      const res = await fetchOrRefreshAuthFirebase(
        '/ahorro-functions/us-central1/listCategories',
        { method: 'POST' },
      );
      console.log(res);

      if (res.ok === true) {
        const categories = await res.json();
        setCategories(categories);
      } else {
        if (res.status === 401) {
          Alert.alert('Please login again');
          setCurrentLoginStatus(false);
          router.navigate('/');
        }
      }
    }

    fetchEntries();
  }, [currentLoginStatus]);

  const onChangeStartDate = (_event: any, selectedDate: Date | undefined) => {
    setStartDateOpen(false);
    if (selectedDate !== undefined) setStartDate(selectedDate);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons
          size={310}
          name="add"
          style={styles.headerImage}
          color="white"
        />
      }>
      <Button onPress={() => setStartDateOpen(true)} mode="outlined">
        {moment(startDate.toISOString()).format('YYYY-MM-DD')}
      </Button>
      {startDateOpen && (
        <DateTimePicker
          value={startDate}
          mode="date"
          onChange={onChangeStartDate}
        />
      )}
      <TextInput
        label="Amount"
        value={amount.toString()}
        onChangeText={text => setAmount(text)}
      />
      <TextInput
        label="Desc"
        value={desc}
        onChangeText={text => setDesc(text)}
      />
      <CategorySelectList
        selectValue={category}
        categories={categories}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
      />
      <Button onPress={logout} mode="contained">
        Save
      </Button>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
