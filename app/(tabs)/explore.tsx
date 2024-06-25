import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Alert, View } from 'react-native';
import { Button } from 'react-native-paper';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useContext, useEffect, useState } from 'react';
import { Category } from '@/types/Category.interface';
import CategoryList from '@/components/Category';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatToCurrency, fetchOrRefreshAuth } from '@/helper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { CurrentLoginStatusContext } from '@/components/CurrentLoginStatusContext';
import CookieManager from '@react-native-cookies/cookies';
import { router } from 'expo-router';

export default function TabTwoScreen() {
  async function logout() {
    setCurrentLoginStatus(false);
    await AsyncStorage.removeItem('accessToken');
    await CookieManager.clearAll();
    router.navigate('/');
  }
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState<number | 'Loading'>('Loading');
  const [startDate, setStartDate] = useState(new Date('2020-06-01'));
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDate, setEndDate] = useState(new Date('2020-06-30'));
  const [endDateOpen, setEndDateOpen] = useState(false);
  const { currentLoginStatus, setCurrentLoginStatus } = useContext(
    CurrentLoginStatusContext,
  );

  useEffect(() => {
    async function fetchEntries() {
      const token = await AsyncStorage.getItem('accessToken');
      const params = new URLSearchParams();
      params.set(
        'timeStart',
        `${moment(startDate.toISOString()).format('YYYY-MM-DD')}`,
      );
      params.set(
        'timeEnd',
        `${moment(endDate.toISOString()).format('YYYY-MM-DD')}`,
      );
      const header = new Headers();
      header.set('Cookie', token || '');
      header.set('Content-Type', 'application/json');
      setTotal('Loading');

      const res = await fetchOrRefreshAuth(`/entries?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json', // other headers if needed
        },
      });
      console.log(res);

      if (res.ok === true) {
        const { categories, total } = await res.json();
        setTotal(total);
        setCategories(categories);
      } else {
        if (res.status === 401) {
          Alert.alert('Please login again');
          setCurrentLoginStatus(false);
          await AsyncStorage.removeItem('accessToken');
          router.navigate('/');
        }
      }
    }

    fetchEntries();
  }, [startDate, endDate]);

  const onChangeStartDate = (_event: any, selectedDate: Date | undefined) => {
    setStartDateOpen(false);
    if (selectedDate !== undefined) setStartDate(selectedDate);
  };

  const onChangeEndDate = (_event: any, selectedDate: Date | undefined) => {
    setEndDateOpen(false);
    if (selectedDate !== undefined) setEndDate(selectedDate);
  };

  let categoryLists: any[] = [];
  if (categories !== null) {
    categoryLists = categories.map(category => {
      return <CategoryList key={category._id} category={category} />;
    });
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{formatToCurrency(total)}</ThemedText>
      </ThemedView>
      <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
        <Button
          style={{ width: '50%' }}
          onPress={() => setStartDateOpen(true)}
          mode="outlined">
          {moment(startDate.toISOString()).format('YYYY-MM-DD')}
        </Button>
        {startDateOpen && (
          <DateTimePicker
            value={startDate}
            mode="date"
            onChange={onChangeStartDate}
          />
        )}
        <Button
          style={{ width: '50%' }}
          onPress={() => setEndDateOpen(true)}
          mode="outlined">
          {moment(endDate.toISOString()).format('YYYY-MM-DD')}
        </Button>
        {endDateOpen && (
          <DateTimePicker
            value={endDate}
            mode="date"
            onChange={onChangeEndDate}
          />
        )}
      </View>
      <Button onPress={logout} mode="contained">
        Logout
      </Button>
      {categoryLists}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
